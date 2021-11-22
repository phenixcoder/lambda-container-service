const express = require('express')
const { existsSync } = require('fs')
const { handler } = require('./build/src/index')
const newman = require('newman')

const app = express();
const port = 9000;

let server = null;

app.post('/2015-03-31/functions/function/invocations', async (req, res) => {
  try {
    const body = req.body ? JSON.parse(req.body) : ExpressToAWSAPIGatewayProxyEventV2(req);
    handler(body, {}).then(result => {
      res.send(result);
    }).catch(error => console.error(error));
  } catch(error) {
    console.error(error);
  }
})

app.all('/api', async (req, res) => {
  handler(ExpressToAWSAPIGatewayProxyEventV2(req), {}).then(result => {
    res.send(result);
  }).catch(error => console.error(error));
});
app.all('/__health', async (req, res) => {
  handler(ExpressToAWSAPIGatewayProxyEventV2(req), {}).then(result => {
    res.send(result);
  }).catch(error => console.error(error));
});

server = app.listen(port, () => {
  console.log(`
  Example app listening at: 
    POST http://localhost:${port}/2015-03-31/functions/function/invocations
  `);

  if (process.argv[2]) {
    const testFilename = process.argv[3] || 'service-collection.postman_collection.json'

    if (!existsSync(`./${testFilename}`)) {
    console.log('Running Newman tests');
      console.error(`Error: test collection not found
        ./${testFilename}
      
        Skipping tests. Running dev server only.
      `);

      return;
    }
    console.log('Test collection:', testFilename);

    newman.run({
      collection: require(`./${testFilename}`),
      reporters: 'cli',
    }, 
    (err, summary) => {
      if (err) {
        console.log(err);
        process.exit(1)
      }
      process.exit();
    })
  }
})

function ExpressToAWSAPIGatewayProxyEventV2(request) {
  return {
    "resource": request.path,
    "path": request.path,
    "httpMethod": request.method,
    "headers": {
      "header1": "value1",
      "header2": "value2"
    },
    "multiValueHeaders": {
      "header1": [
        "value1"
      ],
      "header2": [
        "value1",
        "value2"
      ]
    },
    "queryStringParameters": {
      "parameter1": "value1",
      "parameter2": "value"
    },
    "multiValueQueryStringParameters": {
      "parameter1": [
        "value1",
        "value2"
      ],
      "parameter2": [
        "value"
      ]
    },
    "requestContext": {
      "accountId": "123456789012",
      "apiId": "id",
      "authorizer": {
        "claims": null,
        "scopes": null
      },
      "domainName": "id.execute-api.us-east-1.amazonaws.com",
      "domainPrefix": "id",
      "extendedRequestId": "request-id",
      "httpMethod": "GET",
      "identity": {
        "accessKey": null,
        "accountId": null,
        "caller": null,
        "cognitoAuthenticationProvider": null,
        "cognitoAuthenticationType": null,
        "cognitoIdentityId": null,
        "cognitoIdentityPoolId": null,
        "principalOrgId": null,
        "sourceIp": "IP",
        "user": null,
        "userAgent": "user-agent",
        "userArn": null,
        "clientCert": {
          "clientCertPem": "CERT_CONTENT",
          "subjectDN": "www.example.com",
          "issuerDN": "Example issuer",
          "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
          "validity": {
            "notBefore": "May 28 12:30:02 2019 GMT",
            "notAfter": "Aug  5 09:36:04 2021 GMT"
          }
        }
      },
      "path": "/my/path",
      "protocol": "HTTP/1.1",
      "requestId": "id=",
      "requestTime": "04/Mar/2020:19:15:17 +0000",
      "requestTimeEpoch": 1583349317135,
      "resourceId": null,
      "resourcePath": "/my/path",
      "stage": "$default"
    },
    "pathParameters": null,
    "stageVariables": null,
    "body": "Hello from Lambda!",
    "isBase64Encoded": false
  }
}