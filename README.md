# Lambda Container Service
> Service template using container based lambda function

## Developing

Runs a custom dev webserver which hosts the lambda function which can be hosted on  
```shell
$ npm start
```

## Test

### Unit Tests

```shell
$ npm run test
```

### Integration Tests

#### Automated Integration Tests (WIP)
Runs service using `dev-server` and tests using Newman test collection.

```shell
$ npm run test:newman
```
#### Manual Test
Start the environment
```shell
$ npm run build
$ docker-compose build
$ docker-compose up
```
In another temrinal, run:

```shell
$ curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

## Package @todo
- Check if container repository exists (Creates if not exists) - Should be in pipeline helpers
- npm run build
- npm run package
- create a release tag on Github Repo
- publish image based on version specified by semantic release.

## Deploy @todo

- Deploy a version to service's lambda by updating the image to release build version.
- And verify health check.