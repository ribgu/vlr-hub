var express = require("express");
var router = express.Router();

// Essa variavel é utilizada para o script reconhecer caminhos no router.get
var path = require("path");

// Aqui ele envia para o GET o arquivo home.html no diretorio raiz
// Troque o caminho em "" para o caminho da sua .html da Pagina Inicial
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/index.html"));
});

// Função para setar o diretorio raiz do home.html(no meu caso), assim ele conseguirá carregar o CSS e o JS das paginas
router.use(express.static(path.join(__dirname, "../../public/pages")));

module.exports = router;
