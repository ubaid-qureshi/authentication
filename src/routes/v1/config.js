const express = require('express');

const router = express.Router();

const { version } = require('../../../package.json');

router.get('/ping', (req, res) => {
  _logger.info('PINGED');
  _handleResponse({
    res,
    statusCode: 200,
    response: 'PONG',
  });
});

router.get('/version', (req, res) => {
  _logger.info(`version - ${version}`);
  _handleResponse({
    res,
    statusCode: 200,
    response: version,
  });
});

module.exports = router;
