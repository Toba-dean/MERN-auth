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
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId }).select('-password')
    res.status(StatusCodes.OK).json(user)
  },
  updateUser: async (req, res) => {
    const { name, avatar, password } = req.body
    const { userId } = req.user

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, {
      name, avatar, password: hashPassword
    }, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ msg: "Update Successful.", updatedUser })
  },
  updateRole: async (req, res) => {
    const {
      params: { id },
      body: { role }
    } = req;

    const updateRole = await User.findOneAndUpdate({ _id: id }, { role }, {
      new: true, runValidators: true
    })
    res.status(StatusCodes.OK).json({ msg: "Update Successful." })
  },
  deleteUser: async (req, res) => {
    const { params: { id } } = req;
    console.log(id)
    await User.findOneAndDelete({ _id: id })
    res.status(StatusCodes.OK).json({ msg: "Deleted Success!" })
  }
}



module.exports = userCtrl;