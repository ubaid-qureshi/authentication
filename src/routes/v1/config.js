const express = require('express');

const router = express.Router();

const { version } = require('../../../package.json');

router.get('/ping', (req, res) => {
  _handleResponse({
    res,
    statusCode: 200,
    response: 'PONG',
  });
});

router.get('/version', (req, res) => {
  _handleResponse({
    res,
    statusCode: 200,
    response: version,
  });
});

module.exports = router;
