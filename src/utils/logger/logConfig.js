const winston = require('winston');
const { LOGS: { LOG_LEVEL } } = require('config');

const { format } = winston;

// Logger configuration
const logConfiguration = {
  level: process.env.LOG_LEVEL || LOG_LEVEL || 'debug',
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint(),
    format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
};

// Create the logger
const logger = winston.createLogger(logConfiguration);
logger.stream = {
  write(message) {
    format.colorize(logger.info(JSON.parse(message)));
  },
};

global._logger = logger;
