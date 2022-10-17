const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError
} = require('../errors')

const userCtrl = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      throw new BadRequestError("All fields must be filled.")
    }

    const user = User.findOne({ email })
    if (user) {

    }
  },
  getUser: async (req, res) => {
    res.status(200).json({ success: true, msg: "Getting user from the controller." })
  }
}

module.exports = userCtrl;