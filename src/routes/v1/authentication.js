const express = require('express');

const router = express.Router();
const Authentication = require('../../controller/Authentication');

router.post('/login',
  async (req, res, next) => {
    const token = req.headers['x-otp'];
    Authentication.login(req.body, token)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.post('/twofactor/:id',
  async (req, res, next) => {
    Authentication.register2fa(req.params)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.get('/twofactor/:id',
  async (req, res, next) => {
    Authentication.get2fa(req.params.id)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.post('/twofactor/:id/verify',
  async (req, res, next) => {
    Authentication.verify(req.params.id, req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.delete('/twofactor/:id',
  async (req, res, next) => {
    Authentication.deregister2fa(req.params.id)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });

module.exports = router;
