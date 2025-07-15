create database estoque_car;
use estoque_car;

create table marca(
	id int primary key auto_increment not null,
    nome varchar(45) not null
);

create table carro(
	id int primary key auto_increment not null,
    nome varchar(45) not null,
	ano int not null,
    classe  enum('hatch', 'sedan', 'picape', 'suv') not null,
	marca_id int not null,
    preco decimal(10,2) not null,
    modelo varchar(45) not null,

    foreign key (marca_id) references marca(id)
);

insert into marca(nome) values
("Toyota"),
("Fiat"),
("Chevrolet"),
("Nissan"),
("Volkswagen");

insert into carro(nome, ano, classe, preco, modelo, marca_id, foto, cor) values
("Toro", 2022 ,"picape", 126.000, "Ultra", 2, "/Portfolio_POO/src/main/resources/static/img/Foto_FiatToro.JPG", "Branco"),
("Sentra", 2025, "sedan", 115.000 , "Advance", 4, "/Portfolio_POO/src/main/resources/static/img/Foto_NissanSentra.jpg", "Branco"),
("T-Cross", 2025, "suv", 120.000, "Confortline", 5, "/Portfolio_POO/src/main/resources/static/img/Foto_TCross.jpg", "Prata"),
("Onix", 2025, "hatch", 110.000, "Turbo", 3, "/Portfolio_POO/src/main/resources/static/img/Foto_Onix.jpg", "Prata"),
("Hilux", 2025, "picape", 145.000, "SRX Plus AT", 1, "/Portfolio_POO/src/main/resources/static/img/Foto_Hilux.jpg", "Branco");

select * from marca;
select * from carro;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE carro
SET FOREIGN_KEY_CHECKS = 1

ALTER TABLE carro
ADD cor VARCHAR(45) NOT NULL,
ADD disponibilidade ENUM('A venda', 'Vendido') NOT NULL DEFAULT 'A venda';


ALTER TABLE carro MODIFY disponibilidade ENUM('A venda', 'A_venda', 'Vendido') NOT NULL DEFAULT 'A_venda';
UPDATE carro SET disponibilidade = 'A_venda' WHERE disponibilidade = 'A venda';
ALTER TABLE carro MODIFY disponibilidade ENUM('A_venda', 'Vendido') NOT NULL DEFAULT 'A_venda';

