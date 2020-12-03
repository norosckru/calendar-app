//Configuracion basica express

const express = require('express');
const logger = require('./util/logger')
var cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

//console.log(process.env)

//Crear app de express (servidor)

const app = express();

//Morgan
const morgan = require('morgan');

app.use(morgan('short', {
    stream: {
        write: message => logger.info(message.trim())
    }
}))

//DB
dbConnection();

//Cors
app.use(cors())

//Directorio Publico (midellware)
app.use(express.static('public'));

//Lectura y Parseo de Body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server Corriento en puerto ${process.env.PORT}`)
})