/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          cpf_cnpj: '520.515.560-40',
          name: 'John Doe',
          email: 'john.doe@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4X7pe3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'admin'
        },
        {
          cpf_cnpj: '168.192.030-12',
          name: 'Brian Poe',
          email: 'brian.poe@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4X7pe3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'user'
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
