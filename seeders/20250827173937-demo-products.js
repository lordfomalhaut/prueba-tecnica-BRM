"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        batchNumber: "L001",
        name: "Laptop Lenovo Thinkpad",
        price: 3500.00,
        stock: 10,
        dateEntry: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        batchNumber: "L002",
        name: "Monitor Samsung 24''",
        price: 900.00,
        stock: 15,
        dateEntry: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        batchNumber: "L003",
        name: "Teclado Mecánico Redragon",
        price: 250.00,
        stock: 25,
        dateEntry: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        batchNumber: "L004",
        name: "Mouse Logitech G Pro",
        price: 180.00,
        stock: 30,
        dateEntry: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
