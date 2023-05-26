"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const crypto = __importStar(require("crypto"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
dotenv_1.default.config();
const TEST_PORT = 3400;
const DEVELOPMENT_PORT = 3500;
const PRODUCTION_PORT = process.env.PORT || 3600;
const app = (0, express_1.default)();
app.use((0, cookie_session_1.default)(process.env.NODE_ENV == "production" ?
    {
        name: "google-auth-session",
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        keys: ["key1", "key2"],
    }
    :
        {
            name: "google-auth-session",
            maxAge: 24 * 60 * 60 * 1000,
            keys: ["key1", "key2"],
        }));
// generating a secret key
const secretKey = crypto.randomBytes(64).toString("hex");
// setting the secret key in the app configuration
app.set("secretKey", process.env.SECRET_KEY || secretKey);
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['POST', 'OPTIONS', 'GET', 'DELETE', 'PUT'],
}));
app.use("/api", routes_1.default);
switch (process.env.NODE_ENV) {
    case "test":
        app.listen(TEST_PORT, () => console.log(`TEST PORT: ${TEST_PORT}`));
        break;
    case "production":
        app.listen(PRODUCTION_PORT, () => console.log(`PRODUCTION PORT: ${PRODUCTION_PORT}`));
        break;
    default:
        app.listen(DEVELOPMENT_PORT, () => console.log(`DEVELOPMENT PORT: ${DEVELOPMENT_PORT}`));
}
exports.default = app;
