const DBConnection = require("../db/connection.js");

// index
const index = (req, res) => {

    const sql = `SELECT * FROM doctors`;

    // eseguire la query sul database
    DBConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving doctors from database");
        }

        res.status(200).json(result);

    });
};


// show
const show = (req, res) => {

    const { id } = req.params;

    const DocSql = `SELECT * FROM doctors WHERE id = ?`;
    const RevSql = `SELECT * FROM reviews JOIN doctors ON doctors.id = reviews.doctor_id WHERE doctor_id = ?`;

    // eseguire la query sul database
    DBConnection.query(DocSql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error retrieving doctor from database");

        } else if (result.length === 0) {
            return res.status(404).send("Doctor not found");
        };

        const doctor = result[0];

        // eseguire la query sul database
        DBConnection.query(RevSql, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error retrieving reviews from database");
            }

            res.status(200).json({
                doctor,
                reviews: result,
            });
        });

    });
};

const DocCreate = (req, res) => {
    res.send("Hello World!");
};

const RevCreate = (req, res) => {
    res.send("Hello World!");
};


module.exports = {
    index,
    show,
    DocCreate,
    RevCreate,
}