import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import { DB_ADDRESS } from './config';
import routes from './routes';

const helmet = require('helmet');

const { PORT = 3001 } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(DB_ADDRESS);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
