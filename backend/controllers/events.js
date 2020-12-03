const { response } = require('express');
const Evento = require('../models/Event')

const logger = require('../util/logger')

//Obtener Eventos
const getEventos = async (req, res = response) => {


    try {
        
        const eventos = await Evento.find().populate('user', 'name'); //solo recibo el nombre  y ID


        res.status(200).json({
            ok: true,
            eventos
        })
        logger.info('GET Ruta para Obtener Eventos')

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
        logger.error(error)
    }
    
}

//Crear entos
const crearEvento = async (req, res = response) => {

    const evento = new Evento( req.body );
    //console.log(evento)

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        logger.info('POST Crear Evento')


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
        logger.error(error)
    }


}

//Actualizar Evento
const actualizarEventos = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid= req.uid;

    try {

        const evento = await Evento.findById(eventoId)

        //verifico evento
        if(!evento){
            logger.info('Evento no Existe con ese ID')
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
            
        }

        //verifico si al persona es dueña del evento
        if(evento.user.toString() !== uid){
            logger.info('No tiene privilegios para editar este evento')
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }


        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualiazdo = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualiazdo
        });
        logger.info('PUT Evento Actualizado')
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
        logger.error(error)
    }   
}


//Elimianr Evento
const eliminarEventos = async (req, res = response) => {


    const eventoId = req.params.id;
    const uid= req.uid;


    try {

        const evento = await Evento.findById(eventoId)

        //Cerifico evento
        if(!evento){
            logger.info('Evento no Existe con ese ID')
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }

        //Cerifico si al persona es dueña del evento
        if(evento.user.toString() !== uid){
            logger.info('No tiene privilegios para editar este evento')
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete(eventoId)

        res.json({
            ok: true,
            msg: 'Evento Eliminado'
        });
        logger.info('DELETE Evento Eliminado')
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
        logger.error(error)
    }   
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEventos,
    eliminarEventos
}