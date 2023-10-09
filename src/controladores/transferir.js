const contaModulo = require("../dados/bancodedados");

const registoTransacao = (numeroDaContaOrigem, numeroDaContaDestino, valor) => {

    const transacao = {
        data: new Date ().toISOString(),
        numero_conta_origem: numeroDaContaOrigem,
        numero_conta_destino: numeroDaContaDestino,
        valor: valor
    }

    const contas = contaModulo.contas

    const contaOrigem = contas.find((conta) => {
        return conta.numero === numeroDaContaOrigem
    })

    const contaDestino = contas.find((conta) => {
        return conta.numero === numeroDaContaDestino
    })

    if (contaOrigem && contaDestino) {
        if (!contaOrigem.transacoes) {
            contaOrigem.transacoes = []
        }
        contaOrigem.transacoes.push(transacao)
    }
}

const transferir = async (req, res) => {
    const {
        numero_conta_origem,
        numero_conta_destino,
        valor, 
        senha
    } = req.body
    const contas = contaModulo.contas;
    if (!numero_conta_origem || !numero_conta_destino || valor === undefined || !senha) {
        return res.status(400).json({mensagem: "Os números das contas de origem e destino, o valor da transferência e a senha são obrigatórios"});
    }

    const contaOrigem = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    });
    const contaDestino = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    });
    if (!contaOrigem || !contaDestino) {
        return res.status(400).json({mensagem: "Contas de origem ou destino não encontradas."})
    }
    if (contaOrigem.usuario.senha !== senha) {
        return res.status(400).json({mensagem: "senha incorreta"})
    }
    if (contaOrigem.saldo < valor) {
        return res.status(400).json({mensagem: "Saldo da conta insuficiente para realizar a transação."})
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    registoTransacao(numero_conta_origem, numero_conta_destino, valor)

    res.status(200).json()
}

module.exports = {
    transferir
}