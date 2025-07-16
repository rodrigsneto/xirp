import { Router } from 'express';
import { criarPlantao, listarPlantoesPorMes } from '../controllers/plantaoController';
import { autenticar } from '../middlewares/auth';

const router = Router();

router.post('/', autenticar, criarPlantao);
router.get('/', autenticar, listarPlantoesPorMes);

export default router;