import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { createdUserMock, requestCreateUserMock } from './mocks/user.mock';



chai.use(chaiHttp);

const { expect } = chai;

describe('Register new Account', () => {
  let chaiHttpRequest: Response;

  afterEach(function() {
    sinon.restore();
  });

  it('A new accout must be registred succesfully', async () => {
    sinon.stub(SequelizeUsers, 'create').returns(createdUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').returns(null as any);

    const routeResposne = await chai.request(app).post('/users').send(requestCreateUserMock);

    expect(routeResposne.status).to.be.equal(201);
    expect(routeResposne.body.token).to.be.an('string');
  });

  it('Cpf/Cnpj must be valid', async () => {
    sinon.stub(SequelizeUsers, 'create').returns(createdUserMock as any);

    const invalidCpfCnpj = {
      ...requestCreateUserMock,
      cpfCnpj: '123.456.789-10',
    };

    const routeResposne = await chai.request(app).post('/users').send(invalidCpfCnpj);

    expect(routeResposne.status).to.be.equal(400);
    expect(routeResposne.body.message).to.be.eq('Invalid CPF/CNPJ');
  });

  it('Email must be valid', async () => {
    sinon.stub(SequelizeUsers, 'create').returns(createdUserMock as any);

    const invalidEmail = {
      ...requestCreateUserMock,
      email: 'invalidEmail',
    };

    const routeResposne = await chai.request(app).post('/users').send(invalidEmail);

    expect(routeResposne.status).to.be.equal(400);
    expect(routeResposne.body.message).to.be.eq('"email" must be a valid email');
  });

  it('Email/Cpf/CNPJ must be unique', async () => {
    sinon.stub(SequelizeUsers, 'findOne').returns(createdUserMock as any);

    const routeResposne = await chai.request(app).post('/users').send(requestCreateUserMock);

    expect(routeResposne.status).to.be.equal(400);
    expect(routeResposne.body.message).to.be.eq('User not created. Email or CPF/CNPJ already registred');
  });

});