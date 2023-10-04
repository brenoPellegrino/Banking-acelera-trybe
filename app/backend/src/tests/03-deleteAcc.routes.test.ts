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

describe('Delete registred account', () => {
  let chaiHttpRequest: Response;

  afterEach(function() {
    sinon.restore();
  });

  it('A user must be deleted successfully', async () => {
    const editedUserMock = {
      ...createdUserMock,
      accStatus: 'inactive',
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 1 } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: editedUserMock } as SequelizeUsers);

  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", 'token');

    expect(routeResponse.status).to.equal(200);
    expect(routeResponse.body.data.accStatus).to.be.eq('inactive');
  });

  it('To delete an user, the user must be authenticate', async () => {
    const editedUserMock = {
      ...createdUserMock,
      accStatus: 'inactive',
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 1 } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: editedUserMock } as SequelizeUsers);

  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", '');

    expect(routeResponse.status).to.equal(401);
    expect(routeResponse.body.message).to.be.eq('Token not found');
  });

  it('The user can only delete his own acc', async () => {
    const editedUserMock = {
      ...createdUserMock,
      accStatus: 'inactive',
    };
    
    sinon.stub(auth, 'tokenValidation').returns({ id: 2 } as any);
    sinon.stub(SequelizeUsers, 'update').returns(editedUserMock as any);
    sinon.stub(SequelizeUsers, 'findOne').resolves( { dataValues: editedUserMock } as SequelizeUsers);

  
    const routeResponse = await chai
      .request(app)
      .patch('/users/1').set("authentication", 'token');

    expect(routeResponse.status).to.equal(401);
    expect(routeResponse.body.message).to.be.eq('Unauthorized');
  });
});