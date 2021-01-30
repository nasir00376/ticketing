import express from 'express';
import 'express-async-errors';

import Debug from 'debug';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { json } from 'body-parser';
import { errorHandler } from './middlewares/error.handler';
import { NotFoundError } from './error';

import { CurrentUserRouter, SignUpRouter } from './routes';

const debug: Debug.IDebugger = Debug('ticketing:app')

const PORT = 3000;
const app = express();
app.set('trust proxy', true);

// Middlewares
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use('/api/users', CurrentUserRouter);
app.use('/api/users', SignUpRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);

const bootstrap = async () => {
  try {
    if(!process.env.JWT_KEY) {
      debug('JWT_KEY must be defined')
      throw new Error('JWT_KEY must be defined')
    }

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  
    debug('MongoDb is connected.');
    
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => console.log(`Auth service is listening on port: ${PORT}!`));
}

bootstrap();
