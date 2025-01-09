const DBConnection = require("../db/connection.js");

const index = (req, res) => {
    res.send("Hello World!");
};

const show = (req, res) => {
    res.send("Hello World!");
};

const create = (req, res) => {
    res.send("Hello World!");
};


module.exports = {
    index,
    show,
    create
}