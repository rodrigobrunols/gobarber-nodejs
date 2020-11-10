import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
const tmpFolder = path.join(__dirname, '..', '..', 'temp')

export default {

  directory : tmpFolder,

  storage : multer.diskStorage({
    destination : path.resolve(__dirname, '..' , '..','temp') ,
      filename (request, file, callback) {
       const fileHash = crypto.randomBytes(32).toString('hex');
       const filename = `${fileHash}-${file.originalname}`;

       return callback(null, filename);
    },

  }),
}
