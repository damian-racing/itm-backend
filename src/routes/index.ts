import express from 'express';

import UsuarioRouter from '../routes/UsuarioRouter';
import CarreraRouter from '../routes/CarreraRouter';
import MateriaRouter from '../routes/MateriaRouter';
import DocenteRouter from '../routes/DocenteRouter';
import AlumnoRouter from '../routes/AlumnoRouter';
import CarreraMateriaRouter from '../routes/CarreraMateriaRouter';

const router = express.Router();

router.use('/usuarios', UsuarioRouter);
router.use('/carreras', CarreraRouter);
router.use('/materias', MateriaRouter);
router.use('/docentes', DocenteRouter);
router.use('/alumnos', AlumnoRouter);
router.use('/carreras_materias', CarreraMateriaRouter);

export default router;
