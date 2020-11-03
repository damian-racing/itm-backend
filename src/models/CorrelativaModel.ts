import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraMateriaModel from './CarreraMateriaModel';

export default class CorrelativaModel extends Model {}

CorrelativaModel.init({
    carrera_materia_id: { type: Sequelize.INTEGER },
    correlativa_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'correlativas', timestamps: false });

CorrelativaModel.belongsTo(CarreraMateriaModel, { foreignKey: 'correlativa_id' });
