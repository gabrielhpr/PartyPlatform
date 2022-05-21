#!/usr/bin/env bash

# Remove Old Image
docker rm -f festafy_api

# No Cache Build
docker build --no-cache -t festafy_api -f docker/loopback/Dockerfile .

# Cache Build
#docker build -t cursoaws_api -f docker/loopback/Dockerfile .