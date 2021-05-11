const { AppError } = require('../../utils/requestHandlers/errorHandler');

class User {
  constructor() {
    this.userModel = require('../Schema/User');
    this.projection = {
      _id: 0,
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      twoFactor: 0,
      __v: 0,
    };
    this.projection2fa = {
      _id: 0,
      twoFactor: 1,
    };
  }

  async create(payload) {
    try {
      return this.userModel.create(payload);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async getOne(id) {
    try {
      return this.userModel.findOne({ id }, this.projection);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async getCompleteDoc(filter) {
    try {
      return this.userModel.findOne(filter);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async getOneByQuery(filter) {
    try {
      return this.userModel.findOne(filter, this.projection);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async getOne2fa(filter) {
    try {
      return this.userModel.findOne(filter, this.projection2fa);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async getAll(filter) {
    try {
      return this.userModel.find(filter, this.projection);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async updateOne(id, updateData) {
    try {
      return this.userModel.updateOne(
        { id },
        updateData,
        this.projection,
      );
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async findOneAndUpdate(filter, updateData) {
    try {
      return this.userModel.findOneAndUpdate(
        filter,
        updateData,
        { new: true, ...this.projection },
      );
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }
}

module.exports = new User();
