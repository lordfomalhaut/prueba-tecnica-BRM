const { Product, Log } = require('../../models');
const { Op } = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const { q, page = 1, size = 10 } = req.query;
    const where = q ? {
      [Op.or]: [
        { name: { [Op.like]: `%${q}%` } },
        { batchNumber: { [Op.like]: `%${q}%` } }
      ]
    } : {};
    const rows = await Product.findAndCountAll({
      where, limit: +size, offset: (+page - 1) * +size, order: [['id', 'DESC']]
    });
    res.json({ total: rows.count, items: rows.rows });
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const row = await Product.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'No existe' });
    res.json(row);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const row = await Product.create(req.body);
    await Log.create({ userId: req.user.id, action: 'PRODUCT_CREATE', description: `#${row.id}` });
    res.status(201).json(row);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const row = await Product.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'No existe' });
    await row.update(req.body);
    await Log.create({ userId: req.user.id, action: 'PRODUCT_UPDATE', description: `#${row.id}` });
    res.json(row);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const row = await Product.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'No existe' });
    await row.destroy();
    await Log.create({ userId: req.user.id, action: 'PRODUCT_DELETE', description: `#${row.id}` });
    res.status(204).end();
  } catch (e) { next(e); }
};
