require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}));

// Routes
app.use("/user", require("./routes/userRouter"))
// MongoDb Connection
require('./helper/db')()

//56:40
// PORT Connection
 const PORT = process.env.PORT || 5000
 app.listen(PORT, () =>{
     console.log(`Server is running http://localhost:${PORT}`);
 })
