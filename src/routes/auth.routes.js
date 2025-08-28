/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization Bearer {token}
 */

/**
 * @apiDefine AdminOnly Solo Administrador
 * Requiere token con rol Administrador.
 */

/**
 * @apiDefine ClientOrAdmin Cliente o Administrador
 * Requiere token con rol Cliente o Administrador.
 */


/**
 * @api {post} /auth/register Registrar usuario
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiBody {String} name nombre completo 
 * @apiBody {String} email correo electronico
 * @apiBody {String} password  Mínimo 6 caracteres.
 * @apiBody {String} [role="Cliente"] Debe existir en la tabla Roles (p.ej. Administrador|Cliente).
 *
 * @apiSuccess (201) {Number} id
 * @apiSuccess (201) {String} name
 * @apiSuccess (201) {String} email
 * @apiSuccess (201) {String} role
 *
 * @apiError (409) EmailExists El email ya está registrado.
 * @apiError (400) InvalidRole El rol no existe.
 *
 * @apiExample {json} Request:
 *    { "name":"Cliente Prueba", "email":"cli@acme.com", "password":"secret" }
 */

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} email
 * @apiBody {String} password
 *
 * @apiSuccess {String} token  JWT.
 * @apiSuccess {Object} user   { id, email, role }
 *
 * @apiError (401) Credenciales inválidas
 */


const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
module.exports = router;
