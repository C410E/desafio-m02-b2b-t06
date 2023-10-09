const { banco } = require("../dados/bancodedados");

//verificar se senha foi passada
const checarSenha = async (req, res, next) => {
    const { senha_banco } = req.query;

    const { senha } = banco;

    if (!senha_banco) {
        return res.status(404).json({mensagem: "a senha é obrigatoria"});
    };

    if (senha_banco !== senha) {
        return res.status(404).json({mensagem: "A senha do banco informada é inválida!"});
    } else {
        next();
    };
}

module.exports = {
    checarSenha
};