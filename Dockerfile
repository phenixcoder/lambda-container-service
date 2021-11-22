FROM public.ecr.aws/lambda/nodejs:14

COPY ./build  ${LAMBDA_TASK_ROOT}
WORKDIR ${LAMBDA_TASK_ROOT}
RUN pwd && ls -la
RUN npm ci --only=production

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app/index.handler" ]  