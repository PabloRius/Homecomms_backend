import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import itemRoutes from './routes/itemRoutes';
import userInfoRoutes from './routes/userInfoRoutes';
import authRoutes from './routes/authRoutes';
import hubRoutes from './routes/hubRoutes';
import swaggerSpec from './config/swagger';

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

app.use('/api/items', itemRoutes);

app.use('/api/users', userInfoRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/hubs', hubRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
