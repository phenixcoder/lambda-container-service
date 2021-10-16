import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import Logger from './lib/logger';

export const handler = async (
  event: APIGatewayProxyEventV2,
  _context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResultV2> => {
  Logger.debug('This is a log message from handler', event);
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/json',
    },
    body: JSON.stringify({
      hello: 'world',
      foo: 'bar',
    }),
  };
};
