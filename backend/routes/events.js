/*
Rutas de eventos = host + /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEventos, eliminarEventos } = require('../controllers/events');

const { validarJWT } = require('../middlewares/validar-jwt');
const {isDate} = require('../helpers/isDate');

const validarID = require('../middlewares/validarId')

const router = Router();

//todas las peticione pasan por JWT
router.use( validarJWT )

//Enrutadores

//Obtener Evebtos
router.get('/',  getEventos)


//Crear Evento
router.post(
    '/',
    [
        check('title', ' El titulo es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es Obligatoria').custom( isDate ),
        check('end', 'Fecha de End es Obligatoria').custom( isDate ),
        validarCampos
    ], 
    crearEvento
    )


// Actualziar Evento
router.put('/:id', validarID, actualizarEventos)


//Elimianr Evento
router.delete('/:id', validarID, eliminarEventos)


module.exports = router;