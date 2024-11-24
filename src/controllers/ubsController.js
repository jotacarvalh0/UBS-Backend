const ubsData = require("../data/ubsData.js");
const medicosData = require("../data/medicosData.js");
const campanhasData = require("../data/campanhasData.js");

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

let idCounter = medicosData.length + 1;
const addMedico = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const { nome, especialidade, horario_atendimento, telefone } = req.body;

    if (!nome || !especialidade || !horario_atendimento || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const ubsExiste = medicosData.some(medico => medico.ubs_id === ubsId);

    if (!ubsExiste) {
        return res.status(404).json({ message: "UBS não encontrada." });
    }

    const novoMedico = {
        id: idCounter++,
        nome,
        especialidade,
        ubs_id: ubsId,
        horario_atendimento,
        telefone
    };

    medicosData.push(novoMedico);

    return res.status(201).json(novoMedico);

}

const editMedico = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const medicoId = parseInt(req.params.medicoId);
    const { nome, especialidade, horario_atendimento, telefone } = req.body;

    if (!nome || !especialidade || !horario_atendimento || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const medico = medicosData.find(m => m.id === medicoId && m.ubs_id === ubsId);

    if (!medico) {
        return res.status(404).json({ message: "Médico não encontrado." });
    }

    medico.nome = nome;
    medico.especialidade = especialidade;
    medico.horario_atendimento = horario_atendimento;
    medico.telefone = telefone;

    return res.status(200).json(medico);
}

const deleteMedico = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const medicoId = parseInt(req.params.medicoId);

    const medicoIndex = medicosData.findIndex(m => m.id === medicoId && m.ubs_id === ubsId);

    if (medicoIndex === -1) {
        return res.status(404).json({ message: "Médico não encontrado." });
    }

    medicosData.splice(medicoIndex, 1); // Remove o médico
    return res.status(200).json({ message: "Médico excluído com sucesso." });
};

const getCampanhasByUBS = (req, res) => {
    const ubsId = parseInt(req.params.id);

    const campanhas = campanhasData.filter((campanhas) => campanhas.ubs_id === ubsId);

    if (campanhas.lenght === 0) {
        return res.status(404).json({ message: "Nenhuma campanha encontrada para essa UBS." });
    }

    return res.json(campanhas);
}

let idCounter2 = campanhasData.length + 1;
const addCampanha = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const { nome, descricao, data_inicio, data_fim } = req.body;

    if (!nome || !descricao || !data_inicio || !data_fim) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const ubsExiste = campanhasData.some(campanha => campanha.ubs_id === ubsId);

    if (!ubsExiste) {
        return res.status(404).json({ message: "UBS não encontrada." });
    }

    const novaCampanha = {
        id: idCounter2++,
        nome,
        descricao,
        ubs_id: ubsId,
        data_inicio,
        data_fim
    };

    campanhasData.push(novaCampanha);

    return res.status(201).json(novaCampanha);

}

const editCampanha = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const campanhaId = parseInt(req.params.campanhaId);
    const { nome, descricao, data_inicio, data_fim } = req.body;

    if (!nome || !descricao || !data_inicio || !data_fim) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const campanha = campanhasData.find(c => c.id === campanhaId && c.ubs_id === ubsId);

    if (!campanha) {
        return res.status(404).json({ message: "Campanha não encontrada." });
    }

    campanha.nome = nome;
    campanha.descricao = descricao;
    campanha.data_inicio = data_inicio;
    campanha.data_fim = data_fim;

    return res.status(200).json(campanha);
};

const deleteCampanha = (req, res) => {
    const ubsId = parseInt(req.params.id);
    const campanhaId = parseInt(req.params.campanhaId);

    const campanhaIndex = campanhasData.findIndex(c => c.id === campanhaId && c.ubs_id === ubsId);

    if (campanhaIndex === -1) {
        return res.status(404).json({ message: "Campanha não encontrada." });
    }

    campanhasData.splice(campanhaIndex, 1); // Remove a campanha
    return res.status(200).json({ message: "Campanha excluída com sucesso." });
};


module.exports = { 
    getAllUBS, 
    getUBSById,  
    getMedicosByUBS,
    addMedico,
    editMedico,
    deleteMedico,
    getCampanhasByUBS,
    addCampanha,
    editCampanha,
    deleteCampanha
};