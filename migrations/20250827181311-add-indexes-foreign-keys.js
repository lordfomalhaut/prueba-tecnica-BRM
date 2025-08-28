module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE INDEX \`idx_purchases_userId\` ON \`Purchases\` (\`userId\`)
    `).catch(()=>{});

    await queryInterface.sequelize.query(`
      CREATE INDEX \`idx_details_purchaseId\` ON \`PurchaseDetails\` (\`purchaseId\`)
    `).catch(()=>{});

    await queryInterface.sequelize.query(`
      CREATE INDEX \`idx_details_productId\` ON \`PurchaseDetails\` (\`productId\`)
    `).catch(()=>{});
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX \`idx_purchases_userId\` ON \`Purchases\`
    `).catch(()=>{});

    await queryInterface.sequelize.query(`
      DROP INDEX \`idx_details_purchaseId\` ON \`PurchaseDetails\`
    `).catch(()=>{});

    await queryInterface.sequelize.query(`
      DROP INDEX \`idx_details_productId\` ON \`PurchaseDetails\`
    `).catch(()=>{});
  }
};