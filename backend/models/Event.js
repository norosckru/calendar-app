const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: [true, 'El Titulo es Obligatorio']
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: [true, 'El evento debe tener fecha de Inicio']
    },

    end: {
        type: Date,
        required: [true, 'El evento debe tener fecha de finalización']
    },

    user: { //referencia
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es Obligatorio']
    }

});

//cambiar _id por id solo en al vista (respuesta)
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema);