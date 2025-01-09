const express = require("express");
const app = express();
const DoctorRouter = require("./routes/doctorsRouter.js");

const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;

// body parse middleware
app.use(express.json());

// start the server
app.listen(PORT, () => {
    console.log(`Server is running at ${LOCALHOST}:${PORT}`);
});

// router
app.use("/api/doctors", DoctorRouter);