import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import apiRouter from './routes/apiRoutes';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Health check OK!');
});

app.use('/api', apiRouter);

export default app;
