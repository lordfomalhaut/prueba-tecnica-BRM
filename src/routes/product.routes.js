/**
 * @api {get} /products Listar productos
 * @apiName ListProducts
 * @apiGroup Products
 * @apiUse AuthHeader
 *
 * @apiQuery {String} [q] Búsqueda por nombre o batchNumber.
 * @apiQuery {Number} [page=1]
 * @apiQuery {Number} [size=10]
 *
 * @apiSuccess {Number} total
 * @apiSuccess {Object[]} items
 */

/**
 * @api {get} /products/:id Ver producto
 * @apiName GetProduct
 * @apiGroup Products
 * @apiUse AuthHeader
 *
 * @apiParam {Number} id ID del producto a consultar en detalle
 */

/**
 * @api {post} /products Crear producto
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiUse AuthHeader
 * @apiUse AdminOnly
 *
 * @apiBody {String} batchNumber  Único.
 * @apiBody {String} name
 * @apiBody {Number} price        > 0
 * @apiBody {Number} stock        >= 0
 * @apiBody {String} [dateEntry]  YYYY-MM-DD
 *
 * @apiSuccess (201) {Number} id
 * @apiError (409) DuplicatedBatch batchNumber ya existe.
 */

/**
 * @api {put} /products/:id Editar producto
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiUse AuthHeader
 * @apiUse AdminOnly
 * @apiParam {Number} id ID del producto a editar
 */

/**
 * @api {delete} /products/:id Borrar producto
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiUse AuthHeader
 * @apiUse AdminOnly
 * @apiParam {Number} id
 *
 * @apiError (409) id No se puede eliminar un producto con compras asociadas.
 */


const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const validate = require('../middlewares/validate');
const v = require('../validators/product.validators');

router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.get);

router.post('/', auth, requireRole('Administrador'), v.createProduct, validate, ctrl.create);
router.put('/:id', auth, requireRole('Administrador'), v.updateProduct, validate, ctrl.update);
router.delete('/:id', auth, requireRole('Administrador'), ctrl.remove);

module.exports = router;
