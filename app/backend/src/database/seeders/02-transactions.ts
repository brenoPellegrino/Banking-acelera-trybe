/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'transactions',
      [
        {
          transaction_id: 1,
          account_id: 1,
          date: new Date('2020-09-30'),
          value: 100,
          cashback: 10,
        },
        {
          transaction_id: 2,
          account_id: 1,
          date: new Date('2021-09-30'),
          value: 150,
          cashback: 20,
        },
        {
          transaction_id: 3,
          account_id: 2,
          date: new Date('2022-09-30'),
          value: 1500,
          cashback: 200,
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('transactions', {});
  },
};
