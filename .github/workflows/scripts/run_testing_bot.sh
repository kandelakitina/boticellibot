#!/bin/bash

# Set the variables
TELEGRAM_TESTING_API_KEY="${{ secrets.TELEGRAM_TESTING_API_KEY }}"
OPENAI_API_KEY="${{ secrets.OPENAI_API_KEY }}"

# Check if the variables exist in the .env file
if grep -q "^TELEGRAM_TESTING_API_KEY=" .env; then
  # Update the existing variable in the .env file
  sed -i "s/^TELEGRAM_TESTING_API_KEY=.*/TELEGRAM_TESTING_API_KEY=${TELEGRAM_TESTING_API_KEY}/" .env
else
  # Add the new variable to the .env file
  echo "TELEGRAM_TESTING_API_KEY=${TELEGRAM_TESTING_API_KEY}" >> .env
fi

if grep -q "^OPENAI_API_KEY=" .env; then
  # Update the existing variable in the .env file
  sed -i "s/^OPENAI_API_KEY=.*/OPENAI_API_KEY=${OPENAI_API_KEY}/" .env
else
  # Add the new variable to the .env file
  echo "OPENAI_API_KEY=${OPENAI_API_KEY}" >> .env
fi

# Remove current instance
docker stop boticellibot_testing_bot
docker rm boticellibot_testing_bot
docker rmi boticelli/boticellibot:testing
docker pull boticelli/boticellibot:testing

# Run updated instance
docker run -t -d --env-file ~/.env --name boticelli_testing_bot boticelli/boticellibot:testing
