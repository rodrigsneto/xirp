import { Router } from "express";

const router = Router();

router.get ('/', (req, res) => {
    res.json(
        {
            'titulo' : 'getPlantoes'
        }
        )
})

export default router