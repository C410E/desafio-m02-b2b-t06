const contasModulo = require("../dados/bancodedados")

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body

    const contas = contasModulo.contas

    if (numero_conta === undefined || valor === undefined) {
        return res.status(400).json({mensagem: "O número da conta e o valor são obrigatórios!"})
    }

    const conta = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    if (!conta) {
        return res.status(400).json({mensagem: "Conta não encontrada."})
    }
    if (valor<= 0) {
        return res.status(400).json({mensagem: "O valor do deposito tem que ser maior que zero"})
    }

    conta.saldo += valor

    res.status(200).json()
}

module.exports = {
    depositar
}