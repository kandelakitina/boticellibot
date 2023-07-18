// Import all required modules
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require("node-telegram-bot-api");
const getMessageTemplate = require("./messageTemplate");

// Set up OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });

// Global history storage
const globalHistory = {};

// Error handling function
function handleError(chatId, error) {
  console.error(error);
  bot.sendMessage(chatId, "Something went wrong. Please try again later.");
}

// Message handling function
async function handleMessage(chatId, msgText) {
  const localHistory = globalHistory[chatId] || [];
  localHistory.push(msgText);
  globalHistory[chatId] = localHistory;

  console.log(`History -5:${localHistory[localHistory.length - 5]}`);
  console.log(`History -4:${localHistory[localHistory.length - 4]}`);
  console.log(`History -3:${localHistory[localHistory.length - 3]}`);
  console.log(`History -2:${localHistory[localHistory.length - 2]}`);
  console.log(`Current: ${msgText}\n`);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: getMessageTemplate(localHistory, msgText),
  });

  // Send the generated text back to the user
  bot.sendMessage(chatId, response.data.choices[0].message.content);
}

// On /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Я тут!");
});

// On new message
bot.on("message", async (msg) => {
  try {
    handleMessage(msg.chat.id, msg.text);
  } catch (error) {
    handleError(msg.chat.id, error);
  }
});
