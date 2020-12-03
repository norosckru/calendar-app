const mongoose = require('mongoose');
const logger = require('../util/logger')


const dbConnection = async () => {

    try {

          await mongoose.connect(process.env.DB_CNN,
            {useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true
            });

            console.log('DB Online')
            logger.info('DB Conectada')
        
    } catch (error) {
        console.log(error)
        logger.error(error)
        throw new Error('Errro a la hora de inicializar DB')        
    }
}

module.exports = {
    dbConnection
}