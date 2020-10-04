import sequelize from '../configuration'; 
import Sequelize, { DataTypes, Model } from 'sequelize';

export default class CarreraMateriaModel extends Model {}

CarreraMateriaModel.init({
    carrera_id: { type: Sequelize.INTEGER },
    materia_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'carreras_materias', timestamps: true });
