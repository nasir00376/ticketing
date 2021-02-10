import mongoose from 'mongoose';
import { app } from './app';
import Debug from "debug";

const debug: Debug.IDebugger = Debug("ticketing:app");
const PORT = 3000;

const bootstrap = async () => {
  try {
    if(!process.env.JWT_KEY) {
      debug('JWT_KEY must be defined')
      throw new Error('FATAL ERROR: JWT_KEY is not defined.')
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
