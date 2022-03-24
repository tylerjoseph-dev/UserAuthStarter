require("dotenv").config();

const express = require("express");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

// Router declarations
const userRouter = require('./user/user.router');

const app = express();

app.use(express.json());

// User Route
app.use('/user', userRouter);

// Not Found Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

module.exports = app;