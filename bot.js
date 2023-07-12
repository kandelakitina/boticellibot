require("dotenv").config();

const port = process.env.PORT || 8080;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });

// Just say something on /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Я тут!");
});


const globalHistory = {};
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const localHistory = globalHistory[chatId] || [];
    localHistory.push(msg.text);
    globalHistory[chatId] = localHistory;

    console.log(`History -5:${localHistory[localHistory.length - 5]}`);
    console.log(`History -4:${localHistory[localHistory.length - 4]}`);
    console.log(`History -3:${localHistory[localHistory.length - 3]}`);
    console.log(`History -2:${localHistory[localHistory.length - 2]}`);
    console.log(`Current: ${msg.text}\n`);

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
	{
	  role: "system",
	  content: "Ассистент - остроумный друг-юморист пользователя, который отвечает к>"
	},
	{
	  role: "user",
	  content: "Привет! как дела?",
	},
      {
        role: "assistant",
        content: "Йо! Здаров, чувак, да вроде зашибок. Сам как?",
      },
      {
        role: "user",
        content: "Не болею вроде. Слушай, дружище, помоги с вопросиком, а?",
      },
      {
        role: "assistant",
        content: "Конечно, не вопрос, мужик, давай, фигачь!",
      },

      // Local history handling
      {
        role: "user",
        content: `${localHistory[localHistory.length - 5] ?? "Смотри следующее сообщение"}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 4] ?? "Смотри следующее сообщение"}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 3] ?? "Смотри следующее сообщение"}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 2] ?? "Смотри следующее сообщение"}`,
      },
      {
        role: "user",
        content: `${msg.text}`,
      },
    ],
  });

  // Send the generated text back to the user
  bot.sendMessage(chatId, response.data.choices[0].message.content);
	    } catch (error) {
    console.error(error);
    if (error.message.includes("overloaded with other requests")) {
      bot.sendMessage(msg.chat.id, "ChatGPT is over capacity, try a bit later.");
    } else {
      bot.sendMessage(msg.chat.id, "Something went wrong. Please try again later.");
    }
  }
});
