const User = require('../models/userModel');
const {
  UnauthenticatedError
} = require('../errors');


const authAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user
    const user = await User.findById({ _id: userId })

    if (user.role !== 1) {
      throw new UnauthenticatedError("Admin resource, access denied.")
    } else {
      next();
    }
  } catch (e) {
    return res.status(500).json({ msg: e.message })
  } 
}
  
module.exports = authAdmin 