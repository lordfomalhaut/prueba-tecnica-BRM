module.exports = {
  async up(queryInterface) {
    const [rows] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Purchases'
        AND COLUMN_NAME = 'userId'
        AND REFERENCED_TABLE_NAME = 'Users'
      LIMIT 1
    `);
    if (rows && rows.length && rows[0].CONSTRAINT_NAME) {
      const cname = rows[0].CONSTRAINT_NAME;
      await queryInterface.sequelize.query(`
        ALTER TABLE \`Purchases\`
        DROP FOREIGN KEY \`${cname}\`
      `);
    }
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Purchases\`
      ADD CONSTRAINT \`fk_purchases_user_restrict\`
      FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
    `);
    try {
      await queryInterface.sequelize.query(`
        CREATE INDEX \`idx_purchases_userId\` ON \`Purchases\` (\`userId\`)
      `);
    } catch (_) {}
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Purchases\`
      DROP FOREIGN KEY \`fk_purchases_user_restrict\`
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Purchases\`
      ADD CONSTRAINT \`fk_purchases_user_cascade\`
      FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    `);
  }
};