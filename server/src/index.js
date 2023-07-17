import express from 'express';
import cors from 'cors'; // set up communication between front end and back end
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';

const app = express();

app.use(express.json()); // converts every request from front end into json
app.use(cors());

app.use('/auth', userRouter);

mongoose
  .connect(
    'mongodb+srv://punnoose:punnen@cluster0.qjstmsp.mongodb.net/cluster0?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to atlas'))
  .catch((err) => console.log(err));

app.listen(3001, () => console.log('Server listening at port 3001'));
