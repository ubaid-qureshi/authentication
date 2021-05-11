/* eslint-disable no-useless-escape */
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const twoFactorSchema = Schema({
  tempSecret: {
    type: String,
  },
  secret: {
    type: String,
  },
  dataURL: {
    type: String,
  },
  otpURL: {
    type: String,
  },
  googleChart: {
    type: String,
  },
});

const User = Schema({
  id: {
    type: String,
    required: true,
    default: uuidv4,
  },
  email: {
    type: String,
    lowercase: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  twoFactor: twoFactorSchema,
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  },
});

User.index({ id: 1 }, { unique: true });
User.index({ email: 1 }, { unique: true });
User.index({ id: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', User);
