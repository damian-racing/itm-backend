import Sequelize from 'sequelize';

export default function CarreraSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('carreras', {
        nombre: Sequelize.STRING(45),
        estado: Sequelize.ENUM('activo', 'baja'),
        fecha_estado: Sequelize.DATE
    },{
        timestamps: true
    });

    return model;
}
