const momment = require('moment')

const isDate = (value) => {
    
    if ( !value ) {
        return false;
    }

    const fecha = momment(value);

    if (fecha.isValid()){
        return true;
    }else{
        return false;
    }

}


module.exports = {
    isDate
}