
const ubsData = require("../data/ubsData.js");

const getAllUBS = (req, res) => {
    try {
        res.status(200).json(ubsData);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados das UBS"});
    }
};

module.exports = { getAllUBS };