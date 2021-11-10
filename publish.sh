#!/bin/bash

REPO=045615149555.dkr.ecr.ap-southeast-2.amazonaws.com/lambda-container-service

npm version $1 --no-git-tag-version
docker build -t lambda-container-service .
docker tag lambda-container-service:latest $REPO:$1
docker push $REPO:$1
docker tag lambda-container-service:latest $REPO:latest
docker push $REPO:latest