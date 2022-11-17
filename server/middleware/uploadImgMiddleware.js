const fs = require('fs');

const UploadMiddleware = async function (req, res, next) {
  try {
    // Check if the req has a file
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." })
    }

    const file = req.files.file;

    // Making sure the size is not too large
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "Size too large." })
    } // 1mb

    // Making sure image format is jpeg or png
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "File format is incorrect." })
    }

    next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

// removing the tmp file
const removeTmp = path => {
  fs.unlink(path, err => {
    if (err) throw err
  })
} 

module.exports = UploadMiddleware