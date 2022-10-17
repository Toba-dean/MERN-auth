require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const connectDB = require('./db/connect');
const userRoute = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
}));


app.use('/api/v1/user', userRoute)


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) { 
    console.log(error.message);
  }
}

start()