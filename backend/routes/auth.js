/*
Rutas de usuarios = host + /api/auth
*/

const {Router} = require('express');

const {check} = require('express-validator')

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Enrutadores

//new post
router.post(
    '/new', 
    [ //middlewares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario)

//login    
router.post(
    '/',
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario)

//renew token    
router.get('/renew', validarJWT, revalidarToken);



module.exports = router;