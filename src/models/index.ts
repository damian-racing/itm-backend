import Connection from '../configuration/index';
import UsuarioSchema from './usuario-model';

const sequelize = Connection();

// ADD ALL MODELS
const UsuarioModel = UsuarioSchema(sequelize);

export { UsuarioModel };
