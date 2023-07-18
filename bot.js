require("dotenv").config();

const port = process.env.PORT || 8080;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });

// Import message templates
const getMessageTemplate = require("./messageTemplate");

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
      model: "gpt-3.5-turbo",
      messages: getMessageTemplate(localHistory, msg.text),
    });

    // Send the generated text back to the user
    bot.sendMessage(chatId, response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    bot.sendMessage(
      msg.chat.id,
      "Something went wrong. Please try again later.",
    );
  }
});
