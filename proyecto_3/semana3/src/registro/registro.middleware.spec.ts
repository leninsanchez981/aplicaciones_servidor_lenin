import { RegistroMiddleware } from './registro.middleware.js';

describe('RegistroMiddleware', () => {
  it('should be defined', () => {
    expect(new RegistroMiddleware()).toBeDefined();
  });
});
