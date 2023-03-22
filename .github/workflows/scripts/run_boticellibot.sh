#!/bin/bash
# Remove current instance
docker stop boticellibot
docker rm boticellibot
docker rmi boticelli/boticellibot:master
docker pull boticelli/boticellibot:master

# Run updated instance
docker run -t -d --name boticellibot boticelli/boticellibot:master
