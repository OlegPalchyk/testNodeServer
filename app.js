import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes/routes';

const app = express();

app.set('view engine', 'html');
//чисто для dev

app.use(logger('dev'));
//parseru для всего что летит с клиента, не все обязательны, но видел часто такое

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//все роуты вынесены в отдельный файл для красоты
routes(app);

export default app;