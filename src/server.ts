import express from 'express';
import placesRouter from './routes/places';

const app = express();
app.use(express.json());

app.use('/api',placesRouter);

app.listen(3000, () => console.log('Listening'));
