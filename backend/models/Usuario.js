const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    name:{
        type: String,
        required: [true, 'El name es Obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El email es Obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es Obligatorio']
    }

});


module.exports = model('Usuario', UsuarioSchema);