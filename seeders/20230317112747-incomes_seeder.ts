"use strict";
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface, Sequelize: any) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */

  await queryInterface.bulkInsert("Incomes", [
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
}

export async function down(queryInterface: QueryInterface, Sequelize: any) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  await queryInterface.bulkDelete("Incomes", {}, {});
}
