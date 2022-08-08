import crypto from 'crypto';

// TODO: Definir en environment, o en algun lado la key y el iv, para que no genere random cada vez que levanta el server

const algoritmoEncriptacion = 'aes-256-cbc';
const key = crypto.randomBytes(32); // key de encriptacion
const iv = crypto.randomBytes(16); // Initializating vector

export const encriptar = (valor: string) => {

    const cipher = crypto.createCipheriv(algoritmoEncriptacion, Buffer.from(key), iv);
    let encrypted = cipher.update(valor);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    return encrypted.toString('hex');
}

