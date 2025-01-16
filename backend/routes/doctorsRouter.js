const express = require("express");
const router = express.Router();
const doctorsController = require("../controller/doctorsController.js");
const upload = require("../utils/fileValidator.js");

// doctors index => ottengo tutti i medici presenti nel db
router.get("/", doctorsController.index);

// show => ottengo tutte le recensioni di un medico tramite il suo id
router.get("/:slug", doctorsController.show);

// create => creo un nuovo medico
router.post("/", upload.single("cv"), doctorsController.DocCreate);

// create => creo un nuova recensione
router.post("/review/:slug", doctorsController.RevCreate);

module.exports = router;