const express = require("express");
const app = express();
const DoctorRouter = require("./routes/doctorsRouter.js");
const handler404 = require('./middlewares/error404.js');
const handler500 = require('./middlewares/error500.js');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;

// body parse middleware
app.use(express.json());

// cors
app.use(cors());

// static files served from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// start the server
app.listen(PORT, () => {
    console.log(`Server is running at ${LOCALHOST}:${PORT}`);
});

// router
app.use("/api/doctors", DoctorRouter);

// handler404
app.use(handler404);

//handler500
app.use(handler500);