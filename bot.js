require("dotenv").config();

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
const localHistory = [];

bot.on("message", async (msg) => {
  localHistory.push(msg.text);

  console.log(`History -5:${localHistory[localHistory.length - 5]}`);
  console.log(`History -4:${localHistory[localHistory.length - 4]}`);
  console.log(`History -3:${localHistory[localHistory.length - 3]}`);
  console.log(`History -2:${localHistory[localHistory.length - 2]}`);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Ассистент - остроумный друг-юморист пользователя, который отвечает коротко и хлестко. Максимум одно-два предложения.",
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
        content: `${localHistory[localHistory.length - 5]}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 4]}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 3]}`,
      },
      {
        role: "user",
        content: `${localHistory[localHistory.length - 2]}`,
      },
      {
        role: "user",
        content: `${msg.text}`,
      },
    ],
  });

  // Send the generated text back to the user
  bot.sendMessage(msg.chat.id, response.data.choices[0].message.content);
});
