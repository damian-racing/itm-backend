import express from 'express';
import AsistenciaController from '../controllers/AsistenciaController';

const router = express.Router();

let asistenciaController = new AsistenciaController;

const carreraMateriaDocenteMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    asistenciaController = new AsistenciaController;
    next();
}

router.use(carreraMateriaDocenteMiddleware);

router.get('/', asistenciaController.list);
router.post('/bulk', asistenciaController.createBulk);
router.get('/:id', asistenciaController.read);

export default router;
