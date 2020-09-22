import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class CarreraMateriaModel extends Model {}

CarreraMateriaModel.init({
    carrera_id: { type: Sequelize.INTEGER,  unique: 'compositeIndex' },
    materia_id: { type: Sequelize.INTEGER,  unique: 'compositeIndex' },
}, { sequelize, modelName: 'carreras_materias', timestamps: true });

CarreraMateriaModel.removeAttribute('id');
