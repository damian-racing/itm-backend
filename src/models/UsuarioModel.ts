import Sequelize from 'sequelize';

export default function UsuarioSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('usuarios', {
        username: Sequelize.STRING(100),
        password: Sequelize.STRING(255),
        estado: Sequelize.ENUM('activo', 'baja'),
        fecha_estado: Sequelize.DATE
    },{
        timestamps: true
    });

    return model;
}
