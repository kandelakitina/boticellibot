# Intro

This is BoticelliBot - boticelli's first Open AI powered Telegram bot made with node.js.

APIs used:

- Open AI
- node-telegram-bot-api

Dependencies:

- "dotenv"
- "node-telegram-bot-api"
- "openai"

# Install

1. Clone
2. CD into cloned folder
3. Initiate node project and install dependencies

```bash
npm init
npm i dotenv
npm i openai
npm i node-telegram-bot-api
```

4. Create `.env` file and add API tokens

```bash
touch .env
echo "OPENAI_API_KEY='<your token>'" >> .env
echo "TELEGRAM_API_KEY='<your token>'" >> .env
```
5. Run your app:
```bash
node src/bot.js
```

# Getting tokens

## Telegram

Get Telegram API token by messaging @BotFather bot in Telegram

## openai

Get OpenAI API token on their web site

# License

Licended under ISC

Have fun!
