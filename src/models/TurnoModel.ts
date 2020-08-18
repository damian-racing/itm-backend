import Sequelize from 'sequelize';

export default function TurnoSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('turnos', {
        nombre: Sequelize.STRING(45),
    },{
        timestamps: false
    });

    return model;
}
