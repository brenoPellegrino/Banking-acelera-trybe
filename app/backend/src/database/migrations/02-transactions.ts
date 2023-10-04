/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITransaction from '../../interfaces/ITransaction';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITransaction>>('transactions', {
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
    }, {});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};