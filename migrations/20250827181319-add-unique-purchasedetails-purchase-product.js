module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE \`PurchaseDetails\`
      ADD CONSTRAINT \`uniq_details_purchase_product\`
      UNIQUE (\`purchaseId\`, \`productId\`)
    `);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE \`PurchaseDetails\`
      DROP INDEX \`uniq_details_purchase_product\`
    `);
  }
};