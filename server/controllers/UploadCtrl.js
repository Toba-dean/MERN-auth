const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


const uploadCtrl = {
  uploadAvatar: async (req, res) => {
    const file = req.files.file;

    cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'avatar', width: 150, height: 150, crop: "fill"
    }, async (err, result) => {
      if (err) throw err;

      const { secure_url } = result;
      removeTmp(file.tempFilePath)
      res.json({ url: secure_url })
    }) 
  },
}

const removeTmp = path => {
  fs.unlink(path, err => {
      if(err) throw err
  })
}

module.exports = uploadCtrl;