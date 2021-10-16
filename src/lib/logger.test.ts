import { level } from './logger';

describe('Logger', () => {
  it('level', () => {
    const testEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = '';
    expect(level()).toBe('debug');
    process.env.NODE_ENV = 'production';
    expect(level()).toBe('warn');
    process.env.NODE_ENV = 'development';
    expect(level()).toBe('debug');
    process.env.NODE_ENV = testEnv;
  });
});
