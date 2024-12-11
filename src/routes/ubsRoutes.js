const express = require("express");
const router = express.Router();
const ubsController = require("../controllers/ubsController.js");
const { basicAuth } = require("../middlewares/authMiddleware.js");

router.post("/login", basicAuth, (req, res) => {
    res.json({ message: "Login bem-sucedido!" })
})

router.get("/", ubsController.getAllUBS);

router.get("/:id", ubsController.getUBSById);

router.get("/:id/medicos", ubsController.getMedicosByUBS);
router.post("/:id/medicos", basicAuth, ubsController.addMedico);
router.put("/:id/medicos/:medicoId", basicAuth, ubsController.editMedico);
router.delete("/:id/medicos/:medicoId", basicAuth, ubsController.deleteMedico);

router.get("/:id/campanhas", ubsController.getCampanhasByUBS);
router.post("/:id/campanhas", ubsController.addCampanha);
router.put("/:id/campanhas/:campanhaId", basicAuth, ubsController.editCampanha);
router.delete("/:id/campanhas/:campanhaId", basicAuth, ubsController.deleteCampanha);

module.exports = router;