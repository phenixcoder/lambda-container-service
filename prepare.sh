#!/bin/bash

npm version $1 --no-git-tag-version
docker build -t lambda-container-service .