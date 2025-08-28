/**
 * @api {get} /logs Listar logs
 * @apiName ListLogs
 * @apiGroup Logs
 * @apiUse AuthHeader
 * @apiUse AdminOnly
 * @apiQuery {Number} [userId]
 * @apiQuery {String} [action]
 */


const router = require('express').Router();
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const ctrl = require('../controllers/log.controller');

router.get('/', auth, requireRole('Administrador'), ctrl.list);
module.exports = router;
