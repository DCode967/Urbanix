const crypto = require('node:crypto');
const {promisify} = require('node:util');

const scrypt = promisify(crypto.scrypt);

async function createHash(password) {
    const salt = crypto.randomBytes(16).toString('hex');


    const claveDerivada = await scrypt(password, salt, 64, {
        N: 2 ** 17,
        r: 8,
        p: 1,
        maxmem: 256 * 1024 * 1024
    });

    return `scrypt$${salt}$${claveDerivada.toString('hex')}`;
}


//comprobar contraseña

async function verifyPassword(password, storedHash) {
    const [algorithm, salt, storedKeyHex] = storedHash.split('$');

    if (
        algorithm !== 'scrypt' ||
        !salt ||
        !/^[0-9a-f]{128}$/.test(storedKeyHex)
    ) {
        return false;
    }

    const storedKey = Buffer.from(storedKeyHex, 'hex');

    const derivedKey = await scrypt(password, salt, storedKey.length, {
        N: 2 ** 17,
        r: 8,
        p: 1,
        maxmem: 256 * 1024 * 1024
    });

    return crypto.timingSafeEqual(derivedKey, storedKey);

}

module.exports = { createHash, verifyPassword };

