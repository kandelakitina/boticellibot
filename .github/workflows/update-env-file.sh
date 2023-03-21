#!/bin/bash

# Set the variables
TELEGRAM_API_KEY="${{ secrets.TELEGRAM_TESTING_API_KEY }}"
OPENAI_API_KEY="${{ secrets.OPENAI_API_KEY }}"

# Check if the variables exist in the .env file
if grep -q "^TELEGRAM_API_KEY=" .env; then
  # Update the existing variable in the .env file
  sed -i "s/^TELEGRAM_API_KEY=.*/TELEGRAM_API_KEY=${TELEGRAM_API_KEY}/" .env
else
  # Add the new variable to the .env file
  echo "TELEGRAM_API_KEY=${TELEGRAM_API_KEY}" >> .env
fi

if grep -q "^OPENAI_API_KEY=" .env; then
  # Update the existing variable in the .env file
  sed -i "s/^OPENAI_API_KEY=.*/OPENAI_API_KEY=${OPENAI_API_KEY}/" .env
else
  # Add the new variable to the .env file
  echo "OPENAI_API_KEY=${OPENAI_API_KEY}" >> .env
fi

