import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import TurnoModel from './TurnoModel';

export default class MateriaModel extends Model {}

MateriaModel.init({
    nombre: Sequelize.STRING(45),
    estado: Sequelize.ENUM('activo', 'baja'),
    duracion: Sequelize.ENUM('cuatrimestral', 'anual')
}, { sequelize, modelName: 'materias', timestamps: true });
