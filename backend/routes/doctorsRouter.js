const express = require("express");
const router = express.Router();
const doctorsController = require("../controller/doctorsController.js");

// doctors index
// ottengo tutti i medici presenti nel db
router.get("/", doctorsController.index);

// show
// ottengo tutte le recensioni di un medico tramite il suo id
router.get("/:id", doctorsController.show);

// create
// creo un nuovo medico
router.post("/", doctorsController.create);



module.exports = router;