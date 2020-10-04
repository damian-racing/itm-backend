import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class CorrelativaModel extends Model {}

CorrelativaModel.init({
    materia_id: { type: Sequelize.INTEGER },
    correlativa_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'correlativas', timestamps: true });

CorrelativaModel.removeAttribute('id');
