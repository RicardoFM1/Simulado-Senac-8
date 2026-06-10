-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_casamento` DEFAULT CHARACTER SET utf8 ;
USE `db_casamento` ;

-- -----------------------------------------------------
-- Table `db_casamento`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`mesa` (
  `id_mesa` INT NOT NULL AUTO_INCREMENT,
  `capacidade` INT NOT NULL,
  `restricao` VARCHAR(255) NULL,
  PRIMARY KEY (`id_mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`convidado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`convidado` (
  `id_convidado` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `confirmacao` VARCHAR(45) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `mesa_idmesa` INT NOT NULL,
  PRIMARY KEY (`id_convidado`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_convidado_mesa_idx` (`mesa_idmesa` ASC) VISIBLE,
  CONSTRAINT `fk_convidado_mesa`
    FOREIGN KEY (`mesa_idmesa`)
    REFERENCES `db_casamento`.`mesa` (`id_mesa`)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`checkin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`checkin` (
  `id_checkin` INT NOT NULL AUTO_INCREMENT,
  `data_e_hora` TIMESTAMP NULL,
  `usuario_idusuario` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'não realizado',
  PRIMARY KEY (`id_checkin`),
  INDEX `fk_checkin_usuario_idx` (`usuario_idusuario` ASC) VISIBLE,
  INDEX `fk_checkin_convidado_idx` (`convidado_idconvidado` ASC) VISIBLE,
  CONSTRAINT `fk_checkin_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `db_casamento`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_checkin_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`acompanhante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`acompanhante` (
  `id_acompanhante` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `idade` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  PRIMARY KEY (`id_acompanhante`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_acompanhante_convidado_idx` (`convidado_idconvidado` ASC) VISIBLE,
  CONSTRAINT `fk_acompanhante_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET time_zone = "-03:00";

INSERT INTO usuario (nome, email, cpf, senha, cargo) 
VALUES('Ricardo', 'ricardo@gmail.com', '05380295010', '$2a$12$WMsuteKBsfj3nQfnLurnEOhdIdA8AEGNk0vBbFX/Uu.QR1UxumbyC', 'administrador'),
('Ricardo2', 'ricardo2@gmail.com', '65530888020', '$2a$12$WMsuteKBsfj3nQfnLurnEOhdIdA8AEGNk0vBbFX/Uu.QR1UxumbyC', 'ceremonialista');

INSERT INTO mesa(capacidade, restricao)
VALUES (100, 'Nenhuma'),
(100, 'Lactose');

DELIMITER $$
CREATE PROCEDURE seed_convidados()
BEGIN
DECLARE i INT DEFAULT 1;
WHILE i <= 30 DO
INSERT INTO convidado(nome, sobrenome, email, cpf, confirmacao, categoria, telefone, mesa_idmesa)
VALUES(
	CONCAT('ricardo', i),
    CONCAT('fernandes', i),
	CONCAT('ricardo', i , '@gmail.com'),
    LPAD(i, 11, '0'),
    IF(i % 2 = 0, 'confirmado', 'cancelado'),
    IF(i % 2 = 0, 'noivos', 'amigos'),
    CONCAT('519999', LPAD(i, 4, '0')),
    1
);

SET i = i+1;
END WHILE ;
END$$

DELIMITER ;

CALL seed_convidados();



INSERT INTO checkin (data_e_hora, usuario_idusuario, convidado_idconvidado, status)
VALUES ('10-06-2026', 1, 1, 'não realizado');

INSERT INTO acompanhante (nome, sobrenome, email, cpf, idade, convidado_idconvidado)
VALUES('Gustavo', 'Fernandes', 'gustavof@gmail.com', 19, 1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
