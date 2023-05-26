"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblacklistToken = exports.blacklistToken = exports.isTokenBlacklisted = void 0;
const blacklistedTokens = [];
function isTokenBlacklisted(token) {
    return blacklistedTokens.includes(token);
}
exports.isTokenBlacklisted = isTokenBlacklisted;
function blacklistToken(token) {
    try {
        blacklistedTokens.push(token);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.blacklistToken = blacklistToken;
function unblacklistToken(token) {
    const index = blacklistedTokens.indexOf(token);
    if (index !== -1) {
        blacklistedTokens.splice(index, 1);
    }
}
exports.unblacklistToken = unblacklistToken;
