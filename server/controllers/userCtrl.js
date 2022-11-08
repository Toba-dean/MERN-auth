const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
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

    let activationToken = createActivationToken(newUser);
    const url = `${CLIENT_URL}/api/v1/activate/${activationToken}`;
    sendMail(email, url, "Verify your email address");

    res.status(StatusCodes.OK).json({ msg: 'Successfully registered, Please activate email to start.', activationToken })
  },
  activateUser: async (req, res) => {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, ACTIVATION_SECRET_KEY);
    const { name, email, password } = user;

    let getUser = await User.findOne({ email });
    if (getUser) {
      throw new UnauthenticatedError("User with this email already exists.")
    }

    const newUser = await User.create({ name, email, password });

    return res.status(StatusCodes.OK).json({ msg: 'Account Activated', newUser })

  },
  getUser: async (req, res) => { 
    res.status(200).json({ success: true, msg: "Getting user from the controller." })
  }
}


const createActivationToken = payload => {
  return jwt.sign(payload, ACTIVATION_SECRET_KEY, { expiresIn: '10m' })
}

const createAccessToken = payload => {
  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '15m' })
}

const createRefreshToken = payload => {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' })
}


module.exports = userCtrl;