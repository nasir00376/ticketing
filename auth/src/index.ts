import express from 'express';

import { json } from 'body-parser';

const PORT = 3000;

const app = express();

// Middlewares
app.use(json());

app.get('/api/users/currentUser', (req, res) => res.send('Hi there.'))

app.listen(PORT, () => console.log(`Auth service is listening on port: ${PORT}!`));