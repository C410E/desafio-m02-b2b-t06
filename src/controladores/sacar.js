const contasModulo = require("../dados/bancodedados");

const registrarTransacao = (numeroConta, valor) => {
    const transacao = {
        data: new Date().toISOString(),
        numero_conta: numeroConta,
        valor: valor
    };

    const contas = contasModulo.contas;
    const conta = contas.find((conta) => {
        return conta.numero === numeroConta
    });

    if (conta) {
        if (!conta.transacoes) {
            conta.transacoes = [];  
        }
        conta.transacoes.push(transacao);
    }
};

const sacarSaldo = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const contas = contasModulo.contas;

    if (!numero_conta || valor === undefined || !senha) {
        return res.status(400).json({ mensagem: "O número da conta, valor do saque e a senha são obrigatórios" });
    }

    const conta = contas.find((conta) => {
        return conta.numero === numero_conta;
    });

    if (!conta) {
        return res.status(400).json({ mensagem: "Conta não encontrada." });
    }
   
    if (conta.usuario.senha !== senha) {
      return res.status(400).json({ mensagem: "Senha incorreta." });
    }
    if (conta.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para saque." });
    }
    conta.saldo -= valor;

    registrarTransacao(numero_conta, valor);

    res.status(200).json();
};

module.exports = {
    sacarSaldo
};