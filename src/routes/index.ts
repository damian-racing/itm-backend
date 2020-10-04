import express from 'express';

import UsuarioRouter from '../routes/UsuarioRouter';
import CarreraRouter from '../routes/CarreraRouter';
import MateriaRouter from '../routes/MateriaRouter';
import DocenteRouter from '../routes/DocenteRouter';
import AlumnoRouter from '../routes/AlumnoRouter';
import CarreraMateriaRouter from '../routes/CarreraMateriaRouter';
import TurnoRouter from '../routes/TurnoRouter';
import CorrelativaRouter from '../routes/CorrelativaRouter';
import CarreraMateriaDocenteRouter from '../routes/CarreraMateriaDocenteRouter';

const router = express.Router();

router.use('/usuarios', UsuarioRouter);
router.use('/carreras', CarreraRouter);
router.use('/materias', MateriaRouter);
router.use('/docentes', DocenteRouter);
router.use('/alumnos', AlumnoRouter);
router.use('/carreras_materias', CarreraMateriaRouter);
router.use('/turnos', TurnoRouter);
router.use('/correlativas', CorrelativaRouter);
router.use('/carreras_materias_docentes', CarreraMateriaDocenteRouter);

export default router;
