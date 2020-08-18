import Connection from '../configuration/index';
import UsuarioSchema from './UsuarioModel';

const sequelize = Connection();

// ADD ALL MODELS
const UsuarioModel = UsuarioSchema(sequelize);

export { UsuarioModel };
