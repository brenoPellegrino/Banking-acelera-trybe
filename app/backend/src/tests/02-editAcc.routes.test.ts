import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { createdUserMock, requestCreateUserMock } from './mocks/user.mock';
import { authentication } from '../middlewares';
import * as auth from '../auth';
import { log } from 'console';



chai.use(chaiHttp);

const { expect } = chai;

describe('Edit registred account', () => {
  let chaiHttpRequest: Response;

  afterEach(function() {
    sinon.restore();
  });

  it('A user must be edited successfully', async () => {
    const editedUserMock = {
      ...createdUserMock,
      name: 'User 1 edited',
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 1, accStatus: "active" } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: editedUserMock } as SequelizeUsers);
  
    const editUserRequest = {
      ...requestCreateUserMock,
      name: 'User 1 edited',
    }
  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", 'token')
      .send(editUserRequest);

    expect(routeResponse.status).to.equal(200);
    expect(routeResponse.body.data.name).to.be.eq('User 1 edited');
  });

  it('To edit an user, the user must be authenticate', async () => {
    const editedUserMock = {
      ...createdUserMock,
      name: 'User 1 edited',
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 1 } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: editedUserMock } as SequelizeUsers);
  
    const editUserRequest = {
      ...requestCreateUserMock,
      name: 'User 1 edited',
    }
  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", '')
      .send(editUserRequest);

    expect(routeResponse.status).to.equal(401);
    expect(routeResponse.body.message).to.be.eq('Token not found');
  });

  it('It is not possible to edit a cpf/cnpj' , async () => {
    const editedUserMock = {
      ...createdUserMock,
      cpfCnpj: '930.993.230-98'
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 1 } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: createdUserMock } as SequelizeUsers);
  
    const editUserRequest = {
      ...requestCreateUserMock,
      name: 'User 1 edited',
    }
  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", 'token')
      .send(editUserRequest);

    expect(routeResponse.status).to.equal(200);
    expect(routeResponse.body.data.cpfCnpj).to.be.eq('520.515.560-40');
  });


});