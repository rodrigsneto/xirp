import { Router } from 'express';
import plantaoRouter from './plantoes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/plantoes', plantaoRouter);
router.use('/auth', authRoutes);

export default router;
