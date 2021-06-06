require('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieSession = require('cookie-session');
const db = require("./modal");

//creates the table if it doesn't exist (and does nothing if it already exists)
db.sequelize.sync();

const app = express();
app.set('trust proxy', true);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//mysql connection
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = app;