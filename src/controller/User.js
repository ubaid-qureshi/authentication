const { AppError } = require('../utils/requestHandlers/errorHandler');

class User {
  constructor() {
    this.userDao = require('../model/Dao/User');
  }

  // User Creation
  async create(userData) {
    try {
      _logger.debug(userData);
      return await this.userDao.create(userData);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async updateOne(id, {
    firstName,
    lastName,
    phoneNumber,
    country,
    city,
  }) {
    try {
      const user = await this.getOne(id);
      if (!user) throw new AppError(404, 'User doesn\'t exist');
      _logger.debug('user', user);

      const updateData = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phoneNumber && { phoneNumber }),
        ...(country && { country }),
        ...(city && { city }),
      };
      _logger.debug('updateData', updateData);
      return this.userDao.findOneAndUpdate(id, updateData);
    } catch (error) {
      throw new AppError(
        error.code || 400, error.message,
      );
    }
  }

  // Getting Users
  async getOne(id) {
    _logger.debug(id);
    return this.userDao.getOne(id);
  }

  async getOneByQuery(filter) {
    _logger.debug(filter);
    return this.userDao.getOneByQuery(filter);
  }

  async getAllByQuery(filter) {
    return this.userDao.getAllByQuery(filter);
  }

  // Soft deleting user
  async deleteOne(id) {
    try {
      const updatedData = {
        isDeleted: true,
        deletedAt: new Date(),
      };
      _logger.debug(updatedData);
      const user = await this.userDao.updateOne(
        id, updatedData,
      );
      if (!user) throw new AppError(404, 'User doesn\'t exist');
      _logger.debug(user);
      return user;
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }
}

module.exports = new User();
