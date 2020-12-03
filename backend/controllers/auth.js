const {response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const {generarJWT} = require('../helpers/jwt')
const logger = require('../util/logger')



const crearUsuario = async (req, res = response) => {

   const {email, password } = req.body

    try {
    
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            logger.info(`El correo ${email} ya se encuentra registrado`)
            return res.status(400).json({
               ok: false,
               msg: 'El correo ya fue registrado' 
            })
        }
    
    usuario = new Usuario (req.body);

    //encriptar contraseña:
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardo usuario
    await usuario.save()
    
    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);
    

    //console.log('se solicito el /')
    res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    });
    logger.info(`Usuario creado correctamente para el correo ${email}`)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Admin',
        });
        logger.error(error)
    }
}


const loginUsuario = async (req, res = response) => {

    const {email, password } = req.body

    try {

        const usuario = await Usuario.findOne({email});
        
        if(!usuario){
            logger.info(`Usuario con correo ${email} no existe`)
            return res.status(400).json({
               ok: false,
               msg: 'El usuario no existe' 
            });
        }

        //confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            logger.info(`Password incorrecto para correo ${email}`)
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        logger.info(`Login Correcto para el correo ${email}`)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Admin',
        });
        logger.error(error)
    }
    
}


const revalidarToken = async (req, res = response) => {

    const {uid, name} = req;

    ///Generar JWT
    const token = await generarJWT(uid, name);

    //console.log('se solicito el /')
    res.json({
        ok: true,
        uid,
        name,
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}