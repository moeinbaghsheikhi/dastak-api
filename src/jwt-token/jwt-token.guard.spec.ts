import { JwtTokenGuard } from './jwt-token.guard';

describe('JwtTokenGuard', () => {
  it('should be defined', () => {
    expect(new JwtTokenGuard()).toBeDefined();
  });
});
