import { Router } from 'express';
import plantaoRoutes from './plantaoRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/plantoes', plantaoRoutes);

export default router;

