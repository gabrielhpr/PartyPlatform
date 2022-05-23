#!/usr/bin/env bash

# Remove Old Image
sudo docker rm -f festafy_api

# No Cache Build
sudo docker build --no-cache -t festafy_api -f docker/loopback/Dockerfile .

# Cache Build
#docker build -t cursoaws_api -f docker/loopback/Dockerfile .


# LOOPBACK HIDE EXPLORER
# // "loopback-component-explorer" : null,
