const ubsData = require("../data/ubsData.js");
const medicosData = require("../data/medicosData.js");

const getAllUBS = (req, res) => {
    try {
        res.status(200).json(ubsData);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados das UBS"});
    }
};

const getUBSById = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const ubs = ubsData.find((item) => item.id === ubsId);

    if (!ubs) {
        return res.status(404).json({error: "UBS não encontrada"})
    }

    res.json(ubs);
}

const getMedicosByUBS = (req, res) => {
    const ubsId = parseInt(req.params.id);

    const medicos = medicosData.filter((medico) => medico.ubs_id === ubsId);

    if (medicos.lenght === 0) {
        return res.status(404).json({ message: "Nenhum médico encontrado para essa UBS." });
    }

    return res.json(medicos);
}

module.exports = { getAllUBS, getUBSById,  getMedicosByUBS};