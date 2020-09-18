import Sequelize from 'sequelize';

export default function MateriaSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('materias', {
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
    },{
        timestamps: true
    });

    return model;
}
