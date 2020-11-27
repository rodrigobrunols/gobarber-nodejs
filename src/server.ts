import express,{Request,Response,NextFunction} from 'express';
import 'express-async-errors';

import cors  from 'cors';
import routes  from './routes'
import './database';
import 'reflect-metadata';
import uploadConfig from './config/upload'
import AppError from './errors/AppError';
import appExceptionHandler from './middlewares/exceptionHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)
app.use('/files', express.static(uploadConfig.directory));

app.use(appExceptionHandler);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
