const express = require("express");
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require("./Config/Db");
const todoRoute = require("./Routes/TodoRoute");

//Configure the dotenv file...
dotenv.config();

//Configure the database connection...
connectDB();

//Configure the server objects...
const app = express();
app.use(cors());
app.use(express.json());

//Configure the Routes...
app.use("/api", todoRoute);

//Setup the server port...
const port = process.env.PORT || 8500

//Running the server...
app.listen(port, () => {
    console.log(`TODOLIST server successfully connected to database at port no ${process.env.PORT}`.bgCyan.white);
});