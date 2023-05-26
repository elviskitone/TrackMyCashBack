import { isTokenBlacklisted, blacklistToken, unblacklistToken } from '../blacklist';

describe('Token Blacklist', () => {
    test('isTokenBlacklisted should return true for a blacklisted token', () => {
      const token = 'blacklistedToken';
      blacklistToken(token);
  
      expect(isTokenBlacklisted(token)).toBe(true);
    });
  
    test('isTokenBlacklisted should return false for a non-blacklisted token', () => {
      const token = 'validToken';
  
      expect(isTokenBlacklisted(token)).toBe(false);
    });
  
    test('blacklistToken should add the token to the blacklisted tokens', () => {
      const token = 'newToken';
  
      blacklistToken(token);
  
      expect(isTokenBlacklisted(token)).toBe(true);
    });
  
    test('blacklistToken should return true when the token is successfully blacklisted', () => {
      const token = 'successfulToken';
  
      expect(blacklistToken(token)).toBe(true);
      expect(isTokenBlacklisted(token)).toBe(true);
    });
  
    test('unblacklistToken should remove the token from the blacklisted tokens', () => {
      const token = 'tokenToRemove';
      blacklistToken(token);
  
      unblacklistToken(token);
  
      expect(isTokenBlacklisted(token)).toBe(false);
    });
  
    test('unblacklistToken should not throw an error for a non-blacklisted token', () => {
      const token = 'nonExistingToken';
  
      expect(() => unblacklistToken(token)).not.toThrow();
    });
  });