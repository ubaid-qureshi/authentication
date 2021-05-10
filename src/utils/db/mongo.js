const mongoose = require('mongoose');
const config = require('config');
const { AppError } = require('../requestHandlers/errorHandler');

module.exports = async () => {
  try {
    mongoose.pluralize(null);
    mongoose.set('useFindAndModify', false);
    mongoose.set('debug', process.env.NODE_ENV !== 'production');

    let url;
    if (process.env.NODE_ENV === 'test') {
      url = global.__MONGO_URI__;
    } else {
      url = process.env.MONGODB_URI || config.db.MONGODB_URI;
    }

    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('error', (error) => {
      _logger.error(`Mongoose connection error: ${error}`);
      throw new AppError(400, error.message);
    });

    _logger.info(`mongodb database connection successful on ${url}`);
  } catch (error) {
    _logger.error(`database connection error- ${error.message}`);
    throw new AppError(400, error.message);
  }
};
