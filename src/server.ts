import express from 'express';
import cors  from 'cors';
import routes  from './routes'
import './database';
import 'reflect-metadata';
import uploadConfig from './config/upload'

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)
app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
