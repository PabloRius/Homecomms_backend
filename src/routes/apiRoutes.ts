import express from 'express';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './authRoutes';

import swaggerSpec from '../config/swagger';

const router = express();

router.use('/auth', authRoutes);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
