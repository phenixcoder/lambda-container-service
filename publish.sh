#!/bin/bash

SERVICE_NAME=$REPO_NAME
REPO=$REPO_URI

docker tag $SERVICE_NAME:latest $REPO:$1
docker push $REPO:$1
docker tag $SERVICE_NAME:latest $REPO:latest
docker push $REPO:latest