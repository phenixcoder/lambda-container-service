import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEventV2,
} from 'aws-lambda';
import { handler } from '.';
const mockContext: APIGatewayEventRequestContext = {
  accountId: 'string',
  apiId: 'string',
  authorizer: {
    jwt: {
      claims: {
        foo: 'string',
      },
      scopes: [],
    },
  },
  protocol: '',
  domainName: '',
  domainPrefix: 'string',
  requestId: '',
  routeKey: '',
  stage: '',
  httpMethod: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: '',
    clientCert: null,
    cognitoAuthenticationProvider: '',
    cognitoAuthenticationType: '',
    cognitoIdentityId: '',
    cognitoIdentityPoolId: '',
    principalOrgId: '',
    sourceIp: '0.0.0.0',
    user: '',
    userAgent: '',
    userArn: '',
  },
  path: '',
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: '',
};
const mockRequest: APIGatewayProxyEventV2 = {
  version: '',
  routeKey: '',
  rawPath: '',
  rawQueryString: '',
  headers: {},
  requestContext: {
    accountId: 'string',
    apiId: 'string',
    authorizer: {
      jwt: {
        claims: {
          foo: 'string',
        },
        scopes: [],
      },
    },
    domainName: '',
    domainPrefix: 'string',
    timeEpoch: 0,
    http: {
      method: 'string',
      path: 'string',
      protocol: 'string',
      sourceIp: 'string',
      userAgent: 'string',
    },
    requestId: '',
    routeKey: '',
    stage: '',
    time: '',
  },
  isBase64Encoded: false,
};

describe('Index Handler', () => {
  it('Should return success response', async () => {
    const response = await handler(mockRequest, mockContext);
    expect(response).toStrictEqual({
      body: JSON.stringify({
        hello: 'world',
        foo: 'bar',
      }),
      headers: {
        'content-type': 'text/json',
      },
      statusCode: 200,
    });
  });
});
