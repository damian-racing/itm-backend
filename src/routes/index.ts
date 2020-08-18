import express from 'express';
import * as UsuarioController from '../controllers/usuario-controller';

const router = express.Router();

router.get('/usuarios', UsuarioController.findAll);
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios/:id', UsuarioController.findById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.remove);

export default router;
