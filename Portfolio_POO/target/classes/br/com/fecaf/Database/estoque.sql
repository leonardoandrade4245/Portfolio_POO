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

insert into carro(nome, ano, classe, preco, modelo, marca_id) values
("Toro", 2022 ,"picape", 126.000, "Ultra", 2),
("Sentra", 2025, "sedan", 115.000 , "Advance", 4),
("T-Cross", 2025, "suv", 120.000, "Confortline", 5),
("Onix", 2025, "hatch", 110.000, "Turbo", 3),
("Hilux", 2025, "picape", 145.000, "SRX Plus AT", 1);

select * from marca;
select * from carro;