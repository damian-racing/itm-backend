import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraMateriaDocenteModel from './CarreraMateriaDocenteModel';
import CarreraModel from './CarreraModel';

export default class CarreraMateriaModel extends Model {}

CarreraMateriaModel.init({
    carrera_id: { type: Sequelize.INTEGER },
    materia_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'carreras_materias', timestamps: true });

CarreraMateriaModel.hasMany(CarreraMateriaDocenteModel, {foreignKey: 'id'});
CarreraMateriaDocenteModel.belongsTo(CarreraMateriaModel, {foreignKey: 'carrera_materia_id'});
