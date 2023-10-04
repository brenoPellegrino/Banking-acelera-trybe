/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeTransactions extends Model<InferAttributes<SequelizeTransactions>,
InferCreationAttributes<SequelizeTransactions>> {
  declare transactionId: number;
  declare accountId: number;
  declare date: Date;
  declare value: number;
  declare cashback: number;
}

SequelizeTransactions.init({
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'transaction_id',
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'account_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  cashback: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
  underscored: true,
});

export default SequelizeTransactions;
