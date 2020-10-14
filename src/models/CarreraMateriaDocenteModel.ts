import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class CarreraMateriaDocenteModel extends Model {}

CarreraMateriaDocenteModel.init({
    docente_id: { type: Sequelize.INTEGER },
    carrera_materia_id: { type: Sequelize.INTEGER },
    fecha_desde: { type: Sequelize.DATE },
    fecha_hasta: { type: Sequelize.DATE },
    cupo_maximo: { type: Sequelize.INTEGER },
    cantidad_inscriptos: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'carreras_materias_docentes', timestamps: true });
