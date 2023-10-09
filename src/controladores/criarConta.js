let { contas } = require("../dados/bancodedados");


const emailOuCpfJaCadastrado = (cpf, email) => {
    for (const conta of contas) {
        if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
            return true;
        }
    }
    return false;
}

const criarConta = async (req, res) => {
    const { 
        nome, 
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    
    if (emailOuCpfJaCadastrado(cpf, email)) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }

    if (!nome) {
        return res.status(400).json({mensagem: "O nome é obrigatorio"});
    }
    if (!cpf) {
        return res.status(400).json({mensagem: "O cpf é obrigatorio"});
    }
    if (!data_nascimento) {
        return res.status(400).json({mensagem: "A data de nascimento é obrigatoria"});
    }
    if (!telefone) {
        return res.status(400).json({mensagem: "O telefone é obrigatorio"});
    }
    if (!email) {
        return res.status(400).json({mensagem: "O email é obrigatorio"});
    }
    if (!senha) {
        return res.status(400).json({mensagem: "A senha é obrigatoria"});
    }

    const novaConta = {
        numero: (contas.length + 1).toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }
    };

    

    contas.push(novaConta);

    res.status(200).json({ novaConta });
}

module.exports = {
    criarConta
};