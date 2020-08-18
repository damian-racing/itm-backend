import express from 'express';
import UsuarioController from '../controllers/UsuarioController';
import CarreraController from '../controllers/CarreraController';
import MateriaController from '../controllers/MateriaController';
import DocenteController from '../controllers/DocenteController';
import AlumnoController from '../controllers/AlumnoController';

const router = express.Router();

new UsuarioController;

router.get('/usuarios', UsuarioController.list);
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios/:id', UsuarioController.read);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

new CarreraController;

router.get('/carreras', CarreraController.list);
router.post('/carreras', CarreraController.create);
router.get('/carreras/:id', CarreraController.read);
router.put('/carreras/:id', CarreraController.update);
router.delete('/carreras/:id', CarreraController.delete);

new MateriaController;

router.get('/materias', MateriaController.list);
router.post('/materias', MateriaController.create);
router.get('/materias/:id', MateriaController.read);
router.put('/materias/:id', MateriaController.update);
router.delete('/materias/:id', MateriaController.delete);

new DocenteController;

router.get('/docentes', DocenteController.list);
router.post('/docentes', DocenteController.create);
router.get('/docentes/:id', DocenteController.read);
router.put('/docentes/:id', DocenteController.update);
router.delete('/docentes/:id', DocenteController.delete);

new AlumnoController;

router.get('/alumnos', AlumnoController.list);
router.post('/alumnos', AlumnoController.create);
router.get('/alumnos/:id', AlumnoController.read);
router.put('/alumnos/:id', AlumnoController.update);
router.delete('/alumnos/:id', AlumnoController.delete);

export default router;
