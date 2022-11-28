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


const authCtrl = {
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
    const url = `${CLIENT_URL}/api/v1/auth/activate/${activationToken}`;
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

    return res.status(StatusCodes.CREATED).json({ msg: 'Account Activated', newUser })

  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('All fields must be filled.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("No user with that email.")
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError('Incorrect password entered.');
    }

    const { _id: userId } = user;
    const refresh_token = createRefreshToken({ userId });

    // Set the refresh token as a cookie value
    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/api/v1/auth/access',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ msg: "Login successful", refresh_token })
  },
  getAccessToken: async (req, res) => {
    // get refresh token from req
    const rf_token = req.cookies.refreshtoken;

    // check for refresh token
    if (!rf_token) {
      throw new UnauthenticatedError("Please Login now.")
    }

    // verify the refresh token
    jwt.verify(rf_token, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        throw new UnauthenticatedError("Please Login now.")
      }

      const { userId } = user
      const access_token = createAccessToken({ userId })
      res.json({ access_token })
    })
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("No user with that email.")
    }

    const access_token = createAccessToken({ userId: user._id })
    const url = `${CLIENT_URL}/api/v1/auth/reset/${access_token}`

    sendMail(email, url, "Reset your password");
    res.status(StatusCodes.OK).json({ msg: "Reset your password, please check your email.", access_token })
  },
  resetPassword: async (req, res) => {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const { userId } = req.user
    await User.findOneAndUpdate({ _id: userId }, { password: hashPassword });

    res.status(StatusCodes.OK).json({ msg: "Password successfully changed!" })
  },
  logOut: async (req, res) => {
    res.clearCookie('refreshtoken', { path: '/api/v1/auth/access' });
    return res.json({ msg: "Logged out." })
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


module.exports = authCtrl;