const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError
} = require('../errors');



const userCtrl = {
  getAllUsers: async (req, res) => {
    const users = await User.find().select('-password');
    res.status(StatusCodes.OK).json({ users })
  },
  getSingleUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select('-password')
    res.status(StatusCodes.OK).json({ user })
  }
}



module.exports = userCtrl;