FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV TELEGRAM_API_KEY=$TELEGRAM_TESTING_API_KEY

EXPOSE 8080

CMD ["node", "bot.js"]
