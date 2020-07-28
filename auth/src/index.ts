import express from 'express';
import 'express-async-errors';

import mongoose from 'mongoose';

import { json } from 'body-parser';
import { errorHandler } from './middlewares/error.handler';
import { NotFoundError } from './error';

import { CurrentUserRouter, SignUpRouter } from './routes';

const PORT = 3000;
const app = express();

// Middlewares
app.use(json());

app.use('/api/users', CurrentUserRouter);
app.use('/api/users', SignUpRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);

const bootstrap = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  
    console.log('MongoDb is connected.');
    
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => console.log(`Auth service is listening on port: ${PORT}!`));
}

bootstrap();
