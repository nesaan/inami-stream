import Datastore from 'nedb';
import fs from 'fs';

const libDir = process.env.APPDATA + '/inami-stream'

if (!fs.existsSync(libDir)){
    fs.mkdirSync(libDir);
}

const library = new Datastore({ filename: libDir + '/libraries.db', autoload: true });

export {library};