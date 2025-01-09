const express = require("express");
const app = express();
const DBConnection = require("./db/connection.js");

const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;

// body parse middleware
app.use(express.json());

// start the server
app.listen(PORT, () => {
    console.log(`Server is running at ${LOCALHOST}:${PORT}`);
});

// index
app.get("/", (req, res) => {
    res.send("Hello World!");
});