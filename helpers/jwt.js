

const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                //no se creo token
                reject('No se pudo generar JWT');
            } else {
                //se creo correctamente
                resolve(token);
            }
        });
    });
}


module.exports = {
    generarJWT
}