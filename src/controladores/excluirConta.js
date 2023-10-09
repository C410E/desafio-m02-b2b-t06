const contasModulo = require("../dados/bancodedados");

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params;

    const contas = contasModulo.contas;

    const indiceContaParaExcluir = contas.findIndex((conta) => {
      return conta.numero === numeroConta;
    });

    if (indiceContaParaExcluir !== -1) {
      const contaParaExcluir = contas[indiceContaParaExcluir];
  
     
      if (contaParaExcluir.saldo === 0) {
        
        contas.splice(indiceContaParaExcluir, 1);
        return res.status(204).json(); 
      } else {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
      }
    } else {
      res.status(404).json({ mensagem: "Conta não encontrada." });
    }
}


module.exports = {
  excluirConta
}