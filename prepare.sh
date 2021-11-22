#!/bin/bash

# export LAMBDA_TASK_ROOT=/var/task

npm version $1 --no-git-tag-version
docker build --no-cache -t lambda-container-service .