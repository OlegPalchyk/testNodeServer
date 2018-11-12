import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
/*
* Express === Быстрый, гибкий, минималистичный веб-фреймворк для Node.js — http://expressjs.com/
* */

import routes from './routes/routes';

const app = express();

app.set('view engine', 'html');
//чисто для dev
app.use(logger('dev'));
//parseru для всего что летит с клиента, не все обязательны, но видел часто такое
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//все роуты вынесены в отдельный файл для красоты
routes(app);

export default app;