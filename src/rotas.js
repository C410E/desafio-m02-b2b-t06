const express = require("express");

const { informacoesContaBancaria } = require("./controladores/inforacoesConta");

const { checarSenha } = require("./intermediario/checarSenha");

const { atualizarConta } = require("./controladores/atualizarConta");

const { criarConta } = require("./controladores/criarConta");

const { excluirConta } = require("./controladores/excluirConta");

const { depositar } = require("./controladores/depositar");

const { sacarSaldo } = require("./controladores/sacar");

const { transferir } = require("./controladores/transferir");

const rotas = express();

rotas.get("/contas", checarSenha, informacoesContaBancaria);

rotas.put("/contas/:numeroConta/usuario", atualizarConta);

rotas.post("/contas", criarConta);

rotas.delete("/contas/:numeroConta", excluirConta); 

rotas.post("/transacoes/depositar", depositar);

rotas.post("/transacoes/sacar", sacarSaldo);


rotas.post("/transacoes/transferir", transferir);

module.exports = rotas;