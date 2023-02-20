import express from 'express';
import cors from 'cors';
import { appRoutes } from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(appRoutes);

app.listen(3333, () => {
    console.log('HTTP: Server Running!');
});