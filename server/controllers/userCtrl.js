const userCtrl = {
  getUser: (req, res) => {
    res.status(200).json({success: true, msg: "Getting user from the controller."})
  }
}

module.exports = userCtrl;