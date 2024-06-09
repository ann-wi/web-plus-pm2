import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import router from './routes/index';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import { errorLogger, requestLogger } from './middlewares/logger';
import { createUserValidation, loginValidation } from './validators/userValidator';
import { createUser, loginUser } from './controllers/user';
import { authMiddleware } from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';
import { DB_ADDRESS } from './config';

const helmet = require('helmet');

const { PORT = 3001 } = process.env;
const app = express();
app.use(helmet());
mongoose.connect(DB_ADDRESS);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, loginUser);

app.use(authMiddleware);

app.use(userRouter);
app.use(cardRouter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
