const requestCreateUserMock = {
  cpfCnpj: '520.515.560-40',
  name: 'User 1',
  email: 'user1@email.com',
  password: '123456'
};

const createdUserMock = {
  id: 1,
  cpfCnpj: '520.515.560-40',
  name: 'User 1',
  email: 'user1@email.com',
  password: '123456',
  accType: 'user',
  accStatus: 'active',
};


export {
  createdUserMock,
  requestCreateUserMock
};