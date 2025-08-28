const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const purchaseRoutes = require('./routes/purchase.routes');
const logRoutes = require('./routes/log.routes');

const path = require('path');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/logs', logRoutes);

app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use(errorHandler);

module.exports = app;
