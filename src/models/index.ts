import Connection from '../configuration/index';
import UsuarioSchema from './UsuarioModel';
import CarreraSchema from './CarreraModel';
import MateriaSchema from './MateriaModel';
import DocenteSchema from './DocenteModel';
import AlumnoSchema from './AlumnoModel';

const sequelize = Connection();

// ADD ALL MODELS
const UsuarioModel = UsuarioSchema(sequelize);
const CarreraModel = CarreraSchema(sequelize);
const MateriaModel = MateriaSchema(sequelize);
const DocenteModel = DocenteSchema(sequelize);
const AlumnoModel = AlumnoSchema(sequelize);

export { UsuarioModel, CarreraModel, MateriaModel, DocenteModel, AlumnoModel };
