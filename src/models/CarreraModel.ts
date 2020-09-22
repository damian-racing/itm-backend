import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import MateriaModel from './MateriaModel';

export default class CarreraModel extends Model {}

CarreraModel.init({
    nombre: Sequelize.STRING(45),
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE
}, { sequelize, modelName: 'carreras', timestamps: true });

CarreraModel.belongsToMany(MateriaModel, { through: 'carreras_materias', foreignKey: 'carrera_id' });
MateriaModel.belongsToMany(CarreraModel, { through: 'carreras_materias', foreignKey: 'materia_id' });
