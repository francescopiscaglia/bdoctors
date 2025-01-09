const DBConnection = require("../db/connection.js");

// index
const index = (req, res) => {

    const sql = `SELECT * FROM doctors`;

    // eseguire la query sul database
    DBConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving doctors from database");
        };

        res.status(200).json(result);
    });
};


// show
const show = (req, res) => {

    const { id } = req.params;
    const DocSql = `SELECT * FROM doctors WHERE id = ?`;
    const RevSql = `SELECT * FROM reviews WHERE doctor_id = ?`;

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


// create 
const DocCreate = (req, res) => {

    // recuperare i dati dal body
    const { name, last_name, department, email, phone_number, address, description } = req.body;

    if (!name || !last_name || !department || !email || !phone_number || !address || !description) {
        return res.status(400).send("Missing required fields");
    };

    // eseguire la query
    const sql = `INSERT INTO doctors (name, last_name, department, email, phone_number, address, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    DBConnection.query(sql, [name, last_name, department, email, phone_number, address, description], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error creating doctor");
        };

        // creare un nuovo oggetto con i dati del nuovo dottore
        const newDoc = {
            name,
            last_name,
            department,
            email,
            phone_number,
            address,
            description
        };

        res.status(201).json({
            message: "Doctor created successfully",
            doctor: newDoc
        });
    });
};


// create
const RevCreate = (req, res) => {

    // recuperare i dati dal body
    const { username, rating, review_text } = req.body;
    const { doctor_id } = req.params;


    if (!username || !rating || !review_text) {
        return res.status(400).send("Missing required fields");
    };

    // eseguire la query
    const sql = `INSERT INTO reviews (doctor_id, username, rating, review_text) VALUES (?, ?, ?, ?)`;

    DBConnection.query(sql, [doctor_id, username, rating, review_text], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error creating review");
        };

        // creare un nuovo oggetto con i dati della nuova recensione
        const newRev = {
            doctor_id,
            username,
            rating,
            review_text
        };

        res.status(201).json({
            message: "Review created successfully",
            doctor: newRev
        });
    });
};


module.exports = {
    index,
    show,
    DocCreate,
    RevCreate,
};