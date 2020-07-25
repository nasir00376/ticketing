import express from 'express';
import 'express-async-errors';

import { json } from 'body-parser';
import { errorHandler } from './middlewares/error.handler';
import { DatabaseError, NotFoundError } from './error';

const PORT = 3000;

const app = express();

// Middlewares
app.use(json());

app.get('/api/users/currentUser', (req, res) => {
  console.log('Current User');
  throw new DatabaseError();
  res.send({})
});

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Auth service is listening on port: ${PORT}!`));