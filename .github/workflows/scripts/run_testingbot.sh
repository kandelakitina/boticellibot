#!/bin/bash
# Remove current instance
docker stop testingbot
docker rm testingbot
docker rmi boticelli/boticellibot:testing
docker pull boticelli/boticellibot:testing

# Run updated instance
docker run -t -d --name testingbot boticelli/boticellibot:testing
