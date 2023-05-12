
/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE vlrhub;

USE vlrhub;

/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY,
	nome VARCHAR(50),
	email VARCHAR(50),
	nickname VARCHAR(50),
	senha VARCHAR(50)
);