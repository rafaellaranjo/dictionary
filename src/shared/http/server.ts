/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  },
);

AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => {
      console.log('Server started on port 3333! 🏆');
    });
  })
  .catch(error => {
    console.error('Error during Data Source initialization', error);
  });
