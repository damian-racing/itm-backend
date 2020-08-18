import Sequelize from 'sequelize';

export default function UsuarioSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('usuarios', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        estado: Sequelize.STRING,
        fecha_estado: Sequelize.DATE
    },{
        timestamps: true
    });

    return model;
}
