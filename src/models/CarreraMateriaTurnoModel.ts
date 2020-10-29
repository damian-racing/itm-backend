import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class CarreraMateriaTurnoModel extends Model {}

CarreraMateriaTurnoModel.init({
    turno_id: { type: Sequelize.INTEGER },
    carrera_materia_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'carreras_materias_turnos', timestamps: false });
