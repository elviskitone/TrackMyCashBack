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
        yield queryInterface.bulkInsert("Incomes", [
            {
                name: "Sold tomatoes",
                value: 350000,
                user_email: "amos127@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sold PS5s",
                value: 12000000,
                user_email: "amos127@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Received impending payment for cornflakes",
                value: 1000000,
                user_email: "klausy@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Received full loan payment",
                value: 6000000000,
                user_email: "klausy@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
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
        yield queryInterface.bulkDelete("Incomes", {}, {});
    });
}
exports.down = down;
