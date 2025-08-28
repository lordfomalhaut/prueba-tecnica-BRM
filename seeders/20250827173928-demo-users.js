"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        roleId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cliente",
        email: "cliente@example.com",
        password: await bcrypt.hash("cliente123", 10),
        roleId: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
