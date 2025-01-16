const DBConnection = require("../db/connection.js");
const path = require("path");
const emailValidator = require("../utils/emailValidator.js");
const phoneValidator = require("../utils/phoneValidator.js");
const nameValidator = require("../utils/nameValidator.js");
const addressValidator = require("../utils/addressValidator.js");

// index
const index = (req, res) => {

    const sql = `SELECT * FROM doctors`;

    // eseguire la query sul database
    DBConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error retrieving doctors from database" });
        };

        if (result.length === 0) return res.status(404).json({ error: "No doctors found" });

        res.status(200).json(result);
    });
};


// show
const show = (req, res) => {

    const { slug } = req.params;
    const DocSql = `SELECT * FROM doctors WHERE slug = ?`;
    const RevSql = `SELECT * FROM reviews WHERE doctor_id = ?`;

    if (!slug) return res.status(500).json({ error: "Please insert slug" });

    // eseguire la query sul database
    DBConnection.query(DocSql, [slug], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error retrieving doctor from database" });

        } else if (result.length === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        };

        const doctor = result[0];

        // eseguire la query sul database
        DBConnection.query(RevSql, [doctor.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error retrieving reviews from database" });
            }

            res.status(200).json({
                doctor,
                reviews: result,
            });
        });
    });
};


// create 
const DocCreate = async (req, res) => {

    // funzione per generare slug
    function generateSlug(name, last_name) {
        const fullName = `${name} ${last_name}`;
        const slug = fullName
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // toglie caratteri speciali
            .replace(/|s+/g, '-') // mette "-" al posto degli spazi
            .replace(/-+/g, '-') // mette un "-" nel caso di multipli
            .trim() // rimuove spazi multipli

        /* RICORDA: mancano le condizioni per rendere lo slug unico! O gli omonimi daranno errore nel db */
        return slug;
    }

    // recuperare i dati dal body
    const { name, last_name, department, email, phone_number, address, description, } = req.body;
    const cv = req.file ? req.file.path : null;

    // se uno dei campi é vuoto
    if (!name || !last_name || !department || !email || !phone_number || !address || !description) {
        return res.status(400).json({ error: "Please insert all information" });
    };

    // se la mail inserita non é valida
    if (!emailValidator(email)) return res.status(400).json({ error: "Invalid email format" });

    // se il nome é inferiore a 3 lettere
    if (!nameValidator(name)) return res.status(400).json({ error: "Name must be at least 3 characters" });

    // se il congnome é inferiore a 3 lettere
    if (!nameValidator(last_name)) return res.status(400).json({ error: "Last name must be at least 3 characters" });

    // se l'indirizzo é inferiore a 5 lettere
    if (!addressValidator(address)) return res.status(400).json({ error: "Address must be at least 5 characters" });

    // se il numero di telefono contiene lettere o simboli diversi da "+"  se é presente "+", deve essere all'inizio
    if (!phoneValidator(phone_number)) return res.status(400).json({ error: "Invalid phone number format" });

    // generazione slug
    const slug = generateSlug(name, last_name);

    // se la mail inserita esiste giá nel sistema
    const checkEmailSql = `SELECT * FROM doctors WHERE email = ?`;

    // io devo aspettare che questa query vada a buon fine prima di andare avanti con il codice, quindi utilizzo una promise e await per aspettare il risultato
    const emailExist = await new Promise((resolve, reject) => {
        DBConnection.query(checkEmailSql, [email], (err, result) => {
            if (err) {
                return reject(err);
            };

            return resolve(result.length > 0);
        });
    });

    if (emailExist) return res.status(400).json({ error: "Email already exists in the system" });

    // eseguire la query
    const sql = `INSERT INTO doctors (name, last_name, department, email, phone_number, address, description, cv, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    DBConnection.query(sql, [name, last_name, department, email, phone_number, address, description, cv, slug], (err, result) => {
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
            description,
            slug
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