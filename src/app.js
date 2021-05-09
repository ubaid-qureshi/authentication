require('./utils/logger/logConfig');
require('./utils/requestHandlers/responseHandler');
require('./utils/db/mongo')();
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { APP_PORT } = require('config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging configuration
app.use(
  morgan(
    JSON.stringify(require('./utils/logger/requestConfig')),
    { stream: _logger.stream },
  ),
);

// Routes
require('./routes')(app);

const port = process.env.APP_PORT || APP_PORT;
app.listen(port, () => {
  _logger.info(`App listening on port ${port} in ${process.env.NODE_ENV} environment`);
});

module.exports = app;
