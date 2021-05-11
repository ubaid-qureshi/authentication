/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const bcrypt = require('bcryptjs');
const { GOOGLE_CHART } = require('config');
const { AppError } = require('../utils/requestHandlers/errorHandler');

class Authentication {
  constructor() {
    this.userDao = require('../model/Dao/User');
  }

  async login({ email, password }, token) {
    try {
      _logger.debug(`${email} ${password}`);
      const user = await this.userDao.getCompleteDoc({ email });
      // two factor is not enabled by the user
      if (!user.twoFactor || !user.twoFactor.secret) {
        // check credentials
        if (bcrypt.compareSync(password, user.password)) {
          return 'Successful log in';
        }
        throw new AppError(400, 'Invalid email or password');
      }
      // two factor enabled
      if (!bcrypt.compareSync(password, user.password)) {
        throw new AppError(400, 'Invalid email or password');
      }
      // check if otp is passed, if not then ask for OTP
      if (!token) {
        throw new AppError(206, 'Please enter otp to continue');
      }
      // validate otp
      const verified = speakeasy.totp.verify({
        secret: user.twoFactor.secret,
        encoding: 'base32',
        token,
      });
      if (verified) {
        return 'Successful log in with 2fa';
      }
      throw new AppError(400, 'Invalid OTP');
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async register2fa({ id }) {
    _logger.debug(id);
    /*
    TODO - Implement following Security Features
    1. This method should be called for user which is already
    2. Save generated code in redis as well, with incremental req count
        this redis data should expire in  mins
    3. Before generating new secret/ code check if data is present in redis or not,
        if present and request count is less than 3 then send same code
        if request count is 3 then don't send any code (bruteForce block)
        after 15 mins redis will be expired and user can generate new codeW
    */
    const secret = speakeasy.generateSecret({ length: 10 });
    _logger.debug(secret);

    const {
      twoFactor:
        { dataURL, otpURL, googleChart },
    } = await QRCode.toDataURL(secret.otpauth_url).then(async (data_url) => {
      const updateData = {
        twoFactor: {
          secret: '',
          tempSecret: secret.base32,
          dataURL: data_url,
          otpURL: secret.otpauth_url,
          googleChart: `${GOOGLE_CHART}${secret.otpauth_url}`,
        },
      };
      return this.userDao.findOneAndUpdate({ id }, updateData);
    });
    return { dataURL, otpURL, googleChart };
  }

  async get2fa(id) {
    /*
    TODO - Implement following Security Features
    1. After multiple wrong attempts send notification email to user
    */
    _logger.debug(id);
    const user = await this.userDao.getOne2fa({ id });
    if (user.twoFactor) {
      return user.twoFactor;
    }
    throw new AppError(400, 'two factor authentication not enabled');
  }

  async verify(id, { token }) {
    _logger.debug(token);
    const user = await this.userDao.getOne2fa({ id });
    const verified = speakeasy.totp.verify({
      secret: user.twoFactor.tempSecret, // secret of the logged in user
      encoding: 'base32',
      token,
    });
    if (verified) {
      return this.userDao.findOneAndUpdate({ id },
        { $set: { 'twoFactor.secret': user.twoFactor.tempSecret } });
    }
    throw new AppError(401, 'Invalid token, verification failed');
  }

  async deregister2fa(filter) {
    return this.userDao.getAllByQuery(filter);
  }
}

module.exports = new Authentication();
