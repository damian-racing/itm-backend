import express from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = express.Router();

new UsuarioController;

router.get('/usuarios', UsuarioController.list);
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios/:id', UsuarioController.read);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

export default router;
