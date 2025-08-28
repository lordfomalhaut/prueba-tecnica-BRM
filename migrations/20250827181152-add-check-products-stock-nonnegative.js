module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Products\`
      ADD CONSTRAINT \`products_stock_nonnegative\`
      CHECK (\`stock\` >= 0)
    `);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Products\`
      DROP CHECK \`products_stock_nonnegative\`
    `);
  }
};