const { Log, User } = require('../../models');
exports.list = async (req, res, next) => {
  try {
    const { userId, action } = req.query;
    const where = {};
    if (userId) where.userId = +userId;
    if (action) where.action = action;
    const rows = await Log.findAll({ where, include: [{ model: User, attributes:['id','email'] }], order:[['id','DESC']] });
    res.json(rows);
  } catch (e) { next(e); }
};
