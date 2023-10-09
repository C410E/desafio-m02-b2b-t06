const contasModulo = require("../dados/bancodedados");

const atualizarConta = async (req, res) => {
    const { numeroConta } = req.params;
    const { 
        nome, 
        cpf, 
        data_nascimento, 
        telefone, 
        email, 
        senha 
    } = req.body;

    const contas = contasModulo.contas;

 
    const indiceContaParaAtualizar = contas.findIndex((conta) => {
        return conta.numero === numeroConta;
    });

    if (indiceContaParaAtualizar !== -1) {
    
        const CPFduplicado = contas.some((conta, index) => index !== indiceContaParaAtualizar && conta.usuario.cpf === cpf);
        const emailDuplicado = contas.some((conta, index) => index !== indiceContaParaAtualizar && conta.usuario.email === email);

    if (CPFduplicado) {
      return res.status(400).json({ mensagem: "CPF já está sendo usado em outra conta." });
    }

    if (emailDuplicado) {
      return res.status(400).json({ mensagem: "E-mail já está sendo usado em outra conta." });
    }

   
    contas[indiceContaParaAtualizar].usuario = {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
    };

    return res.sendStatus(204);
  } else {
    res.status(404).json({ mensagem: "Conta não encontrada." });
  }
}

module.exports = { 
    atualizarConta
}