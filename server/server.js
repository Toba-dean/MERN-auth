require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

const userRoute = require("./routes/userRoutes")

app.use(cors());
app.use(express.json())


app.use('/api/v1/user', userRoute)


const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

start()