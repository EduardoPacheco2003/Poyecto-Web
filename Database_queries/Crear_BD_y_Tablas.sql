CREATE DATABASE proyecto_web;

use proyecto_web;


-- Crear la tabla Categorias_Servicios
CREATE TABLE Categorias_Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla Servicios
CREATE TABLE Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(300),
    Imagen VARCHAR(300),
    Id_Categoria INT,
    Disponible BOOL,
    Costo DECIMAL,
    NumVecesComprado INT,
    FOREIGN KEY (Id_Categoria) REFERENCES Categorias_Servicios(Id)
);

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(12) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Correo VARCHAR(60) UNIQUE NOT NULL
);

-- Crear la tabla Venta_Servicios
CREATE TABLE Venta_Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Usuario INT,
    Tel_Contacto VARCHAR(20),
    Total DECIMAL NOT NULL,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

-- Crear la tabla Detalle_Venta_Servicios
CREATE TABLE Detalle_Venta_Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Venta_Servicio INT,
    Id_Servicio INT,
    Sub_Total DECIMAL NOT NULL,
    FOREIGN KEY (Id_Venta_Servicio) REFERENCES Venta_Servicios(Id),
    FOREIGN KEY (Id_Servicio) REFERENCES Servicios(Id)
);