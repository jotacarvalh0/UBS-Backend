const express = require("express");
const router = express.Router();
const ubsController = require("../controllers/ubsController.js");

router.get("/ubs", ubsController.getAllUBS);

router.get("/:id", ubsController.getUBSById);

router.get("/:id/medicos", ubsController.getMedicosByUBS);

router.post("/:id/medicos", ubsController.addMedico);

module.exports = router;