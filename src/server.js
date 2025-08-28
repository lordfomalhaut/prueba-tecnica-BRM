require('dotenv').config();
const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 3000;
(async () => {
  await sequelize.authenticate();
  app.listen(PORT, () => console.log(`API ready on :${PORT}`));
})();
