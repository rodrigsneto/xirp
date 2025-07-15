import { Router } from 'express';
import plantaoRouter from './plantoes';
// import usersRoutes from './users.routes';

const router = Router();

// router.use('/', router)
router.use('/plantoes', plantaoRouter)

// router.get("/", (req, res) => {
//     res.send("ROTA RAIZ: /")
// })

// router.use('/users', usersRoutes);

export default router;
