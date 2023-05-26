"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blacklist_1 = require("../blacklist");
const authMiddleware = (req, res, next) => {
    let strippedToken;
    const token = req.headers.authorization;
    try {
        strippedToken = token.replace(/^Bearer\s+|\s+$/g, "");
    }
    catch (error) {
        console.log("There is an issue with the token.");
    }
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authentication failed. Missing Auth Token." });
    }
    try {
        let decoded;
        decoded = jsonwebtoken_1.default.verify(strippedToken, req.app.get("secretKey"), {
            algorithms: ["HS256"],
        });
        const expirationDate = new Date(decoded.exp * 1000);
        if (expirationDate <= new Date()) {
            (0, blacklist_1.blacklistToken)(strippedToken);
            return res.status(401).json({ message: "Token expired" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};
exports.default = authMiddleware;
