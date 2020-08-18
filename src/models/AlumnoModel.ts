import Sequelize from 'sequelize';

export default function AlumnoSchema(sequelize: Sequelize.Sequelize) {
    const model = sequelize.define('alumnos', {
        nombres: Sequelize.STRING(100),
        apellido: Sequelize.STRING(100),
        sexo: Sequelize.ENUM('masculino', 'femenino', 'otros'),
        telefono: Sequelize.STRING(20),
        celular: Sequelize.STRING(20),
        email: Sequelize.STRING(100),
        fecha_nacimiento: Sequelize.DATE,
        estado: Sequelize.ENUM('activo', 'baja'),
        fecha_estado: Sequelize.DATE,
        tipo_doc: Sequelize.ENUM('DNI', 'PAS'),
        documento: Sequelize.STRING(9),
        domicilio: Sequelize.STRING(255)
    },{
        timestamps: true
    });

    return model;
}
