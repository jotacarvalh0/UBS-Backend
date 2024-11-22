const express = require("express");
const router = express.Router();
const ubsController = require("../controllers/ubsController.js");

router.get("/ubs", ubsController.getAllUBS);

module.exports = router;