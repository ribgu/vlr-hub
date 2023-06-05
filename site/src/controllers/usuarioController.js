var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {

    // Recebe as inputs aqui postas no JS da pagina de Login
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    // Recebe as inputs aqui postas no JS da pagina de Cadastro
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nickname = req.body.nicknameServer;
    var confirmarSenha = req.body.confirmarSenhaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nickname == undefined){
        res.status(400).send("Seu nickname está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (confirmarSenha == undefined) {
        res.status(400).send("Sua confirmação de senha está undefined!");
    }else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, nickname, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastro_eDPI(req, res) {

    // Recebe as inputs aqui postas no JS da pagina de Cadastro
    var dpi = req.body.dpiServer;
    var sensi = req.body.sensiServer;
    var eDPI = req.body.eDPIServer;
    var fk_usuario = req.body.fkUsuarioServer;

    // Faça as validações dos valores
    if (dpi == undefined) {
        res.status(400).send("Sua dpi está undefined!");
    } else if (sensi == undefined){
        res.status(400).send("Sua sensi está undefined!")
    } else if (eDPI == undefined) {
        res.status(400).send("Seu eDPI está undefined!");
    }else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastro_eDPI(sensi, dpi, eDPI, fk_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificar_eDPI(req, res) {

    // valida se o usuario ja tem edpi
    var fk_usuario = req.body.fkUsuarioServer;

    if (fk_usuario == undefined) {
        res.status(400).send("Seu usuario está indefinido!");
    } else {
        
        usuarioModel.verificar_eDPI(fk_usuario)
            .then(
                function (resultado) {
                    

                    if (resultado.length == 0) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                        console.log(resultado);
                        res.json(resultado[0]);
                        
                      }else{
                        res.status(204).send("vc ja tem dpi")
                      }
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a verificacao do eDPI! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

// controler do update
function alterar_edpi(req, res) {
    var dpi = req.body.dpiServer;
    var sensi = req.body.sensiServer;
    var eDPI = req.body.eDPIServer;
    var fk_usuario = req.body.fkUsuarioServer;

    usuarioModel.alterar_edpi(dpi, sensi, eDPI, fk_usuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function pegar_dados_grafico(req, res) {

    // Recebe as inputs aqui postas no JS da pagina de Login
    var fk_usuario = req.body.fkUsuarioServer;

    if (fk_usuario == undefined) {
        res.status(400).send("Seu usuario está indefinido!");
    }else {
        
        usuarioModel.pegar_dados_grafico(fk_usuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    cadastro_eDPI,
    verificar_eDPI,
    alterar_edpi,
    pegar_dados_grafico
}