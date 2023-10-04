import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTransaction from '../database/models/SequelizeTransactions';
// import { createdUserMock, requestCreateUserMock } from './mocks/user.mock';
import * as auth from '../auth';



chai.use(chaiHttp);

const { expect } = chai;

describe('Register a Payment', () => {
  let chaiHttpRequest: Response;

  afterEach(function() {
    sinon.restore();
  });

  it('A new payment must be registred succesfully', async () => {

    const requesrRegisterPaymentMock = {
      value: 100
    };

    const createdPaymentMock = {
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 0,
    };

    sinon.stub(SequelizeTransaction, 'create').returns(createdPaymentMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 1, accStatus: "active" } as any);

    const routeResponse = await chai
      .request(app)
      .post('/transactions/1')
      .set("authentication", 'token')
      .send(requesrRegisterPaymentMock);
    

    expect(routeResponse.status).to.be.equal(201);
    expect(routeResponse.body.transactionId).to.be.eq(1);
  });

  it('A new payment must be registred only by the acc owner', async () => {

    const requesrRegisterPaymentMock = {
      value: 100
    };

    const createdPaymentMock = {
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 0,
    };

    sinon.stub(SequelizeTransaction, 'create').returns(createdPaymentMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 2, accStatus: "active" } as any);

    const routeResponse = await chai
      .request(app)
      .post('/transactions/1')
      .set("authentication", 'token')
      .send(requesrRegisterPaymentMock);
    

    expect(routeResponse.status).to.be.equal(401);
    expect(routeResponse.body.message).to.be.eq("You do not have permission to perform this action");
  });

  it('To register a payment you must be authenticate', async () => {

    const requesrRegisterPaymentMock = {
      value: 100
    };

    const createdPaymentMock = {
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 0,
    };

    sinon.stub(SequelizeTransaction, 'create').returns(createdPaymentMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 2, accStatus: "active" } as any);

    const routeResponse = await chai
      .request(app)
      .post('/transactions/1')
      .set("authentication", '')
      .send(requesrRegisterPaymentMock);
    

    expect(routeResponse.status).to.be.equal(401);
    expect(routeResponse.body.message).to.be.eq("Token not found");
  });

  it('To register a payment the acc must be "active"', async () => {

    const requesrRegisterPaymentMock = {
      value: 100
    };

    const createdPaymentMock = {
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 0,
    };

    sinon.stub(SequelizeTransaction, 'create').returns(createdPaymentMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 1, accStatus: "inactive" } as any);

    const routeResponse = await chai
      .request(app)
      .post('/transactions/1')
      .set("authentication", 'token')
      .send(requesrRegisterPaymentMock);
    

    expect(routeResponse.status).to.be.equal(401);
    expect(routeResponse.body.message).to.be.eq("Acc inactive");
  });

});