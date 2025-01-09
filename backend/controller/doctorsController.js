const DBConnection = require("../db/connection.js");

const index = (req, res) => {

    const sql = `SELECT * FROM doctors`;

    DBConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving doctors from database");
        } else {
            res.status(200).json(result);
        }
    });
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