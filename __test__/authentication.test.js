require('../src/utils/logger/logConfig.js');
require('../src/utils/requestHandlers/responseHandler');
require('../src/utils/db/mongo')();
require('dotenv').config();
const mongoose = require('mongoose');

const user = require('../src/controller/User');
const authentication = require('../src/controller/Authentication');

// jest.mock('../src/controller/');

describe('Test suit for user', () => {
  beforeAll(async () => {
    await user.create({
      email: 'u.qureshi005@gmail.com',
      firstName: 'Ubaid',
      lastName: 'Qureshi',
      password: 'password',
      phoneNumber: '1234567890',
      city: 'mumbai',
      country: 'india',
    });
  });

  it('Register should pass', async () => {
    const { id } = await user.getOneCompleteDoc({ email: 'u.qureshi005@gmail.com' });
    const {
      dataURL, otpURL, googleChart,
    } = await authentication.register2fa({ id });
    expect(dataURL).toBeDefined();
    expect(otpURL).toBeDefined();
    expect(googleChart).toBeDefined();
  });

  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });
});
