const {response} = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../util/logger')


const validarJWT = (req, res = response, next) => {

    //como recibo el JWT
    const token = req.header('x-token');
    //console.log(token)

    if(!token){
        logger.info('No hay token en la petición')
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en al petición'
        });
    }



    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        logger.error('Token Invalido')
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


    next()


}



module.exports = {
    validarJWT
}


