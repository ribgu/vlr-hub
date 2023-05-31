
CREATE DATABASE vlrhub;

USE vlrhub;

CREATE TABLE usuario (
	id INT PRIMARY KEY,
	nome VARCHAR(50),
	email VARCHAR(50),
	nickname VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE eDPI (
	id INT PRIMARY KEY,
	sensibilidade INT,
	dpi INT,
	eDPI INT,
	fk_usuario INT,
	CONSTRAINT edpi_usuario foreign key (fk_usuario) REFERENCES usuario (id)
);