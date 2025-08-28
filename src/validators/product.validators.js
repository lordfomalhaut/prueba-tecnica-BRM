const { body, param } = require('express-validator');
exports.createProduct = [
  body('batchNumber').isString().notEmpty(),
  body('name').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('stock').isInt({ min: 0 }),
  body('dateEntry').optional().isISO8601(),
];

exports.updateProduct = [
  param('id').isInt(),
  body('batchNumber').optional().isString().notEmpty(),
  body('name').optional().isString().notEmpty(),
  body('price').optional().isFloat({ gt: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('dateEntry').optional().isISO8601(),
];
