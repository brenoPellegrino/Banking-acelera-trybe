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

describe('List user transactions', () => {
  let chaiHttpRequest: Response;

  afterEach(function() {
    sinon.restore();
  });

  it('List user transactions succesfully', async () => {

    const paymentsListMock = [{
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 10,
    },
    {
      transactionId: 2,
      accountId: 1,
      date: new Date(2009-10-10),
      value: 100,
      cashback: 10,
    },
    {
      transactionId: 3,
      accountId: 1,
      date: new Date(2010-10-10),
      value: 100,
      cashback: 10,
    }];

    sinon.stub(SequelizeTransaction, 'findAll').returns(paymentsListMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 1, accStatus: "active" } as any);

    const routeResponse = await chai
      .request(app)
      .get('/transactions')
      .set("authentication", 'token');
    
    expect(routeResponse.status).to.be.equal(200);
    expect(routeResponse.body.data.length).to.be.eq(3);
  });

  it('List user transactions, only if user is authenticate', async () => {

    const paymentsListMock = [{
      transactionId: 1,
      accountId: 1,
      date: new Date(2008-10-10),
      value: 100,
      cashback: 10,
    },
    {
      transactionId: 2,
      accountId: 1,
      date: new Date(2009-10-10),
      value: 100,
      cashback: 10,
    },
    {
      transactionId: 3,
      accountId: 1,
      date: new Date(2010-10-10),
      value: 100,
      cashback: 10,
    }];

    sinon.stub(SequelizeTransaction, 'findAll').returns(paymentsListMock as any);
    sinon.stub(auth, 'tokenValidation').returns({ id: 1, accStatus: "active" } as any);

    const routeResponse = await chai
      .request(app)
      .get('/transactions/1')
      .set("authentication", '');
    
    expect(routeResponse.status).to.be.equal(401);
    expect(routeResponse.body.message).to.be.eq("Token not found");
  });

});