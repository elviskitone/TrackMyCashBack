"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logout = exports.changePassword = exports.updateUsername = exports.getUserByEmail = exports.authenticate = exports.createUser = void 0;
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blacklist_1 = require("../blacklist");
const { User } = models_1.default;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.create(req.body);
        if (user) {
            return res.status(201).json({ user });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User does not exist." });
        }
        if (user.password == null) {
            return res.status(401).json({
                message: "Include password",
            });
        }
        const passwordMatch = bcrypt_1.default.compareSync(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        let token;
        do {
            token = jsonwebtoken_1.default.sign({ id: user.id }, `${req.app.get("secretKey")}`, {
                expiresIn: "1d",
                algorithm: "HS256",
            });
        } while ((0, blacklist_1.isTokenBlacklisted)(token));
        res.set("email", ` ${req.body.email}`);
        res.status(200).json({
            message: "Authentication successful",
            userdata: { user: user, token: token },
        });
    }
    catch (error) {
        res.redirect("/api/");
        res.status(500).json({ message: error.message });
    }
});
exports.authenticate = authenticate;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email: email },
        });
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            res.status(404).send("User with specified Email does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const existingUsername = yield User.findOne({
            where: {
                username: req.body.username,
            },
        });
        const user = yield User.findOne({
            where: { email },
        });
        if (existingUsername) {
            return res.status(409).json({ error: "Username already exists" });
        }
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const [updated] = yield User.update({
            username: req.body.username,
        }, {
            where: {
                email,
            },
        });
        if (updated) {
            const updateUser = yield User.findOne({
                where: {
                    id,
                    email,
                },
            });
            return res.status(200).json({ profile: updateUser });
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateUsername = updateUsername;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        let encryptedPassword;
        if (user) {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            encryptedPassword = hashedPassword;
        }
        const [updated] = yield User.update({
            password: encryptedPassword,
        }, {
            where: {
                email,
            },
        });
        if (updated) {
            const updateUser = yield User.findOne({
                where: {
                    id,
                    email,
                },
            });
            return res.status(200).json({ profile: updateUser });
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.changePassword = changePassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
        }
        let strippedToken;
        const token = req.headers.authorization;
        if (token) {
            let decoded;
            let disableToken;
            strippedToken = token.replace(/^Bearer\s+|\s$/g, "");
            decoded = jsonwebtoken_1.default.verify(strippedToken, req.app.get("secretKey"));
            if (decoded) {
                disableToken = (0, blacklist_1.blacklistToken)(strippedToken);
            }
            if (disableToken) {
                res.status(200).json({ message: "Logout successful" });
            }
        }
        else {
            res.json({ message: "Token does not exist " });
            console.log("Token does not exist ");
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.logout = logout;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const deleted = yield User.destroy({
            where: { email: email },
        });
        if (deleted) {
            res.json({ message: "User has been deleted" });
        }
        else {
            throw new Error("User account not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.deleteUser = deleteUser;
