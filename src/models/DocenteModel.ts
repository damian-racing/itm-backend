import Sequelize from 'sequelize';

export default function DocenteSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('docentes', {
        nombres: Sequelize.STRING(100),
        apellido: Sequelize.STRING(100),
        telefono: Sequelize.STRING(20),
        celular: Sequelize.STRING(20),
        email: Sequelize.STRING(100),
        estado: Sequelize.ENUM('activo', 'baja'),
        fecha_estado: Sequelize.DATE
    },{
        timestamps: true
    });

    return model;
}
