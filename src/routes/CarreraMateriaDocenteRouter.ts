import express from 'express';
import CarreraMateriaDocenteController from '../controllers/CarreraMateriaDocenteController';

const router = express.Router();

let carreraMateriaDocenteController = new CarreraMateriaDocenteController;

const carreraMateriaDocenteMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    carreraMateriaDocenteController = new CarreraMateriaDocenteController;
    next();
}

router.use(carreraMateriaDocenteMiddleware);

router.get('/', carreraMateriaDocenteController.list);
router.post('/', carreraMateriaDocenteController.create);
router.get('/:id', carreraMateriaDocenteController.read);
router.put('/:id', carreraMateriaDocenteController.update);
router.delete('/:id', carreraMateriaDocenteController.delete);

export default router;
