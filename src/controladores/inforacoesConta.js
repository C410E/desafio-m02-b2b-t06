const dados = require("../dados/bancodedados")

const informacoesContaBancaria = async (req, res) => {
    
    res.status(200).json(dados)
}

module.exports = {
    informacoesContaBancaria
}