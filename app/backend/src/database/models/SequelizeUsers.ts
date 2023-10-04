/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare id: number;
  declare cpfCnpj: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare accStatus: "active" | "inactive";
  declare accType: "admin" | "user";
}

SequelizeUsers.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },
  cpfCnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cpf_cnpj',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accStatus: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    field: 'acc_status',
  },
  accType: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    field: 'acc_type',
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUsers;
