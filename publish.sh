#!/bin/bash
docker build -t lambda-container-service .
docker tag lambda-container-service:latest public.ecr.aws/m0q0z2r6/lambda-container-service:$1
docker push public.ecr.aws/m0q0z2r6/lambda-container-service:$1
docker tag lambda-container-service:latest public.ecr.aws/m0q0z2r6/lambda-container-service:latest
docker push public.ecr.aws/m0q0z2r6/lambda-container-service:latest