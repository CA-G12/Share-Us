import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.set('port', process.env.PORT || 8080);

app.use('/api/v1', router)

export default app;
