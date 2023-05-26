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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
function up(queryInterface, Sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const users = [
            {
                username: "amos",
                email: "amos127@gmail.com",
                password: "amos@43&*R$",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "klaus",
                email: "klausy@gmail.com",
                password: "k1@U5$$!!",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        for (let user of users) {
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(user.password, salt);
            user.password = hash;
        }
        yield queryInterface.bulkInsert("Users", users);
    });
}
exports.up = up;
function down(queryInterface, Sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        yield queryInterface.bulkDelete("Projects", {}, {});
    });
}
exports.down = down;
