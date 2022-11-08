const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError
} = require('../errors');
const {
  CLIENT_URL,
  ACTIVATION_SECRET_KEY,
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY
} = process.env;

const userCtrl = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      throw new BadRequestError("All fields must be filled.")
    }

    let user = await User.findOne({ email });
    if (user) {
      throw new UnauthenticatedError("User with this email already exists.")
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = { name, email, password: hashPassword }

    const activationToken = createActivationToken(newUser);

    res.status(StatusCodes.OK).json({ newUser, activationToken })
  },
  getUser: async (req, res) => { 
    res.status(200).json({ success: true, msg: "Getting user from the controller." })
  } 
}


const createActivationToken = payload => {
  return jwt.sign(payload, ACTIVATION_SECRET_KEY, { expiresIn: '5m' })
}

const createAccessToken = payload => {
  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '15m' })
}

const createRefreshToken = payload => {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' })
}


module.exports = userCtrl;