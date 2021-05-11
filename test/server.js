const express = require('express');

const app = express();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const path = require('path');

app.use(express.json());

// EXPL: single in memory user
const user = {
  firstName: 'Jon',
  lastName: 'Doe',
  email: 'jon.doe@gmail.com',
  password: 'test',
};

// login API supports both, normal auth + 2fa
app.post('/login', (req, res) => {
  if (!user.twofactor || !user.twofactor.secret) { // two factor is not enabled by the user
    // check credentials
    if (req.body.email == user.email && req.body.password == user.password) {
      return res.send('success');
    }
    return res.status(400).send('Invald email or password');
  }
  // two factor enabled
  if (req.body.email != user.email || req.body.password != user.password) {
    return res.status(400).send('Invald email or password');
  }
  // check if otp is passed, if not then ask for OTP
  if (!req.headers['x-otp']) {
    return res.status(206).send('Please enter otp to continue');
  }
  // validate otp
  const verified = speakeasy.totp.verify({
    secret: user.twofactor.secret,
    encoding: 'base32',
    token: req.headers['x-otp'],
  });
  if (verified) {
    return res.send('success');
  }
  return res.status(400).send('Invalid OTP');
});

// setup two factor for logged in user
app.post('/twofactor/setup', (req, res) => {
  const secret = speakeasy.generateSecret({ length: 10 });
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    // save to logged in user.
    user.twofactor = {
      secret: '',
      tempSecret: secret.base32,
      dataURL: data_url,
      otpURL: secret.otpauth_url,
      googleChart: `internal/modules/cjs/loader.js:593:12${secret.otpauth_url}`,
    };
    return res.json({
      message: 'Verify OTP',
      tempSecret: secret.base32,
      dataURL: data_url,
      otpURL: secret.otpauth_url,
      googleChart: `internal/modules/cjs/loader.js:593:12${secret.otpauth_url}`,
    });
  });
});

// get 2fa details
app.get('/twofactor/setup', (req, res) => {
  res.json(user.twofactor);
});

// disable 2fa
app.delete('/twofactor/setup', (req, res) => {
  delete user.twofactor;
  res.send('success');
});

// before enabling totp based 2fa; it's important to verify, so that we don't end up locking the user.
app.post('/twofactor/verify', (req, res) => {
  const verified = speakeasy.totp.verify({
    secret: user.twofactor.tempSecret, // secret of the logged in user
    encoding: 'base32',
    token: req.body.token,
  });
  if (verified) {
    user.twofactor.secret = user.twofactor.tempSecret;
    console.log(user);
    return res.send('Two-factor auth enabled');
  }
  return res.status(400).send('Invalid token, verification failed');
});

// EXPL: Front-end app
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/vue.app.html`));
});

app.listen('3000', () => {
  console.log('App running on 3000');
});
