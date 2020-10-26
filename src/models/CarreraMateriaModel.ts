import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CursoModel from './CursoModel';

export default class CarreraMateriaModel extends Model {}

CarreraMateriaModel.init({
    carrera_id: { type: Sequelize.INTEGER },
    materia_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'carreras_materias', timestamps: true });

CarreraMateriaModel.hasMany(CursoModel, {foreignKey: 'carrera_materia_id'});
CursoModel.belongsTo(CarreraMateriaModel, {foreignKey: 'carrera_materia_id'});
