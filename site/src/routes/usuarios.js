var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});
// rota do cadastro edpi
router.post("/cadastro_eDPI", function (req, res) {
    usuarioController.cadastro_eDPI(req, res);
})
// rota do select do dpi
router.post("/verificar_eDPI", function (req, res) {
    usuarioController.verificar_eDPI(req, res);
});

// rota do update do dpi
router.put("/alterar_edpi/:fk_usuario", function (req, res) {
    usuarioController.alterar_edpi(req, res);
});

module.exports = router;