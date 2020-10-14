import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class CursoModel extends Model {}

CursoModel.init({
    alumno_id: { type: Sequelize.INTEGER },
    carrera_materia_docente_id: { type: Sequelize.INTEGER },
    fecha_desde: { type: Sequelize.DATE },
    fecha_hasta: { type: Sequelize.DATE },
}, { sequelize, modelName: 'cursos', timestamps: true });
