const ubsData = require("../data/ubsData.js");

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

module.exports = { getAllUBS, getUBSById };