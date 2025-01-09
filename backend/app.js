const express = require("express");
const app = express();

const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;

app.listen(PORT, () => {
    console.log(`Server is running at ${LOCALHOST}:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});