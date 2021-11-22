import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import Logger from './lib/logger';
import pkg from '../package.json';

export const handler = async (
  event: APIGatewayProxyEventV2,
  _context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResultV2> => {
  if (event.rawPath === '__health') {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/json',
      },
      body: JSON.stringify({
        version: pkg.version,
        name: pkg.name,
      }),
    };
  }

  Logger.debug('This is a log message from handler', event);
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/json',
    },
    body: JSON.stringify({
      version: pkg.version,
      name: pkg.name,
      event,
      context: _context,
    }),
  };
};
