const { sequelize, Purchase, PurchaseDetail, Product, User, Log } = require('../../models');

exports.create = async (req, res, next) => {
  const { items } = req.body;
  const userId = req.user.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      let total = 0;
      const prepared = [];

      for (const { productId, quantity } of items) {
        const product = await Product.findByPk(productId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!product) throw { status: 404, message: `Producto ${productId} no existe` };
        if (quantity <= 0) throw { status: 400, message: `Cantidad inválida` };
        if (product.stock < quantity) throw { status: 409, message: `Stock insuficiente de ${product.name}` };

        const price = Number(product.price);
        const subtotal = price * quantity;
        total += subtotal;

        prepared.push({ productId, quantity, price, subtotal });

        product.stock -= quantity;
        await product.save({ transaction: t });
      }

      const purchase = await Purchase.create({ userId, total }, { transaction: t });

      for (const d of prepared) {
        await PurchaseDetail.create({ ...d, purchaseId: purchase.id }, { transaction: t });
      }

      await Log.create({
        userId,
        action: 'PURCHASE_CREATE',
        description: `Compra #${purchase.id} total $${total.toFixed(2)}`
      }, { transaction: t });

      const full = await Purchase.findByPk(purchase.id, {
        include: [
          { model: PurchaseDetail, include: [Product] },
          { model: User, attributes: ['id','name','email'] }
        ],
        transaction: t
      });

      return {
        id: full.id,
        date: full.created_at,
        customer: full.User,
        items: full.PurchaseDetails.map(d => ({
          productId: d.productId,
          name: d.Product.name,
          price: +d.price,
          quantity: d.quantity,
          subtotal: +d.subtotal
        })),
        total: +full.total
      };
    });

    res.status(201).json(result);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const where = req.user.role === 'Administrador' ? {} : { userId: req.user.id };
    const rows = await Purchase.findAll({
      where,
      include: [{ model: User, attributes: ['id','name','email'] }],
      order: [['id','DESC']]
    });
    res.json(rows);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const full = await Purchase.findByPk(req.params.id, {
      include: [
        { model: PurchaseDetail, include: [Product] },
        { model: User, attributes: ['id','name','email'] }
      ]
    });
    if (!full) return res.status(404).json({ message: 'No existe' });
    if (req.user.role !== 'Administrador' && full.userId !== req.user.id)
      return res.status(403).json({ message: 'Sin permiso' });

    res.json({
      id: full.id,
      date: full.createdAt,
      customer: full.User,
      items: full.PurchaseDetails.map(d => ({
        productId: d.productId, name: d.Product.name, price: +d.price,
        quantity: d.quantity, subtotal: +d.subtotal
      })),
      total: +full.total
    });
  } catch (e) { next(e); }
};
