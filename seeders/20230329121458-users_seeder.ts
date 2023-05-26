"use strict";
import { QueryInterface, DataTypes } from "sequelize";

const bcrypt = require("bcrypt");

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  await queryInterface.bulkInsert("Users", users);
}

export async function down(queryInterface: QueryInterface, Sequelize: any) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  await queryInterface.bulkDelete("Projects", {}, {});
}
