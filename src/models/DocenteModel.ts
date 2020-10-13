import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraMateriaDocenteModel from './CarreraMateriaDocenteModel';

export default class DocenteModel extends Model {}

DocenteModel.init({
    nombres: Sequelize.STRING(100),
    apellido: Sequelize.STRING(100),
    telefono: Sequelize.STRING(20),
    celular: Sequelize.STRING(20),
    email: Sequelize.STRING(100),
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE
}, { sequelize, modelName: 'docentes', timestamps: true });

DocenteModel.hasMany(CarreraMateriaDocenteModel, {foreignKey: 'id'});
CarreraMateriaDocenteModel.belongsTo(DocenteModel, {foreignKey: 'docente_id'});
