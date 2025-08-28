/**
 * @api {post} /purchases Crear compra
 * @apiName CreatePurchase
 * @apiGroup Purchases
 * @apiUse AuthHeader
 * @apiUse ClientOrAdmin
 *
 * @apiBody {Object[]} items
 * @apiBody {Number}   items.productId
 * @apiBody {Number}   items.quantity  mayor o igual a 1
 *
 * @apiSuccess (201) {Number} id
 * @apiSuccess (201) {String} date
 * @apiSuccess (201) {Object} customer  {id,name,email}
 * @apiSuccess (201) {Object[]} items   [{productId,name,price,quantity,subtotal}]
 * @apiSuccess (201) {Number} total
 *
 * @apiError (409) OutOfStock Stock insuficiente.
 * @apiError (400) InvalidPayload Validación de datos.
 *
 * @apiExample {json} Request:
 *    { "items":[ {"productId":1,"quantity":2}, {"productId":2,"quantity":1} ] }
 */

/**
 * @api {get} /purchases Listar compras
 * @apiName ListPurchases
 * @apiGroup Purchases
 * @apiUse AuthHeader
 * @apiDescription
 *  - Administrador: ve todas.
 *  - Cliente: ve solo las propias.
 */

/**
 * @api {get} /purchases/:id Ver factura
 * @apiName GetPurchase
 * @apiGroup Purchases
 * @apiUse AuthHeader
 * @apiParam {Number} id
 * @apiDescription
 *  - Administrador: puede ver cualquiera.
 *  - Cliente: solo si es dueño -> si no 403.
 */



const router = require('express').Router();
const ctrl = require('../controllers/purchase.controller');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const validate = require('../middlewares/validate');
const v = require('../validators/purchase.validators');

router.post('/', auth, requireRole('Cliente','Administrador'), v.createPurchase, validate, ctrl.create);

router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.get);

module.exports = router;
