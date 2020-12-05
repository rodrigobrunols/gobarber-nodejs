import express,{Request,Response,NextFunction} from 'express';
import 'express-async-errors';
import "reflect-metadata";
import cors  from 'cors';
import routes  from '@shared/infra/http/routes'
import '@shared/infra/typeorm'
import 'reflect-metadata';
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError';
import appExceptionHandler from './middlewares/exceptionHandler';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)
app.use('/files', express.static(uploadConfig.directory));

app.use(appExceptionHandler);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
