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

  await queryInterface.bulkInsert("Expenses", [
    {
      name: "Bought battery cells",
      value: 980000,
      user_email: "amos127@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bought flower seedlings",
      value: 876000000,
      user_email: "amos127@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bought land",
      value: 1000000564000,
      user_email: "klausy@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bought maize",
      value: 4700000,
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

  await queryInterface.bulkDelete("Expenses", {}, {});
}
