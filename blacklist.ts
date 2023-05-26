const blacklistedTokens: string[] = [];

function isTokenBlacklisted(token: string) {
  return blacklistedTokens.includes(token);
}

function blacklistToken(token: string) {
  try {
    blacklistedTokens.push(token);
    return true;
    
  } catch (error: any) {
    console.error(error);
    return false;
  }
}

function unblacklistToken(token: string) {
  const index = blacklistedTokens.indexOf(token);
  if (index !== -1) {
    blacklistedTokens.splice(index, 1);
  }
}

export { isTokenBlacklisted, blacklistToken, unblacklistToken };
