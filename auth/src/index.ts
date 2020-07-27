import express from 'express';
import 'express-async-errors';

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

app.listen(PORT, () => console.log(`Auth service is listening on port: ${PORT}!`));