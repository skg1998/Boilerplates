const express = require("express");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const connectDB = require("./config/db");

//mongoDB connection
connectDB();

//routes
const usersRouter = require("./src/routes/user.routes");

const app = express();
app.set('trust proxy', true);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use("/api/users", usersRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;