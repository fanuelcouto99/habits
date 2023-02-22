// import express from 'express';
// import cors from 'cors';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

// const app = express();
const app = Fastify();

// app.use(cors());
app.register(cors, {
    origin: true
});

// app.use(express.json());
app.register(appRoutes);

// app.use(appRoutes);

// app.listen(3333, () => {
//     console.log('HTTP: Server Running!');
// });
app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(() => {
    console.log('HTTP: Server Running!')});