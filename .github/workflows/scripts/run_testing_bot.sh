#!/bin/bash
# Remove current instance
docker stop testing_bot
docker rm testing_bot
docker rmi boticelli/boticellibot:testing
docker pull boticelli/boticellibot:testing

# Run updated instance
docker run -t -d --name testing_bot boticelli/boticellibot:testing
