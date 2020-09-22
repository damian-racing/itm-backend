import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraModel from './CarreraModel';

export default class MateriaModel extends Model {}

MateriaModel.init({
    nombre: Sequelize.STRING(45),
    // turno_id: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: 'turnos',
    //         key: 'id'
    //     }
    // },
    estado: Sequelize.ENUM('activo', 'baja'),
    duracion: Sequelize.ENUM('cuatrimestral', 'anual')
}, { sequelize, modelName: 'materias', timestamps: true });
