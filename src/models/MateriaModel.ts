import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraMateriaModel from './CarreraMateriaModel';

export default class MateriaModel extends Model {}

MateriaModel.init({
    nombre: Sequelize.STRING(45),
    estado: Sequelize.ENUM('activo', 'baja'),
    duracion: Sequelize.ENUM('cuatrimestral', 'anual')
}, { sequelize, modelName: 'materias', timestamps: true });

MateriaModel.belongsToMany(MateriaModel, { as: 'children', through: 'correlativas', foreignKey: 'correlativa_id' });
MateriaModel.belongsToMany(MateriaModel, { as: 'correlativas_materias', through: 'correlativas', foreignKey: 'materia_id' });
MateriaModel.hasMany(CarreraMateriaModel, {foreignKey: 'materia_id'});
CarreraMateriaModel.belongsTo(MateriaModel, {foreignKey: 'materia_id'});
