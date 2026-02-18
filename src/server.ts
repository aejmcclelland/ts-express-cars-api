import express from 'express';
import carsRouter from './routes/cars';

const app = express();
app.use(express.json());

app.use('/api',carsRouter);

app.listen(3000, () => console.log('Listening'));
