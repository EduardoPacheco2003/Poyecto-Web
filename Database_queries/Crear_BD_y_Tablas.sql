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
-- Crear la tabla de Roles
CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Rol VARCHAR(15) NOT NULL
);

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(12) UNIQUE NOT NULL,
    Password VARCHAR(300) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Correo VARCHAR(60) UNIQUE NOT NULL
    Id_Rol INT,
    FOREIGN KEY (Id_Rol) REFERENCES Roles(Id)
);

-- Crear la tabla Venta_Servicios
CREATE TABLE Venta_Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Usuario INT,
    Tel_Contacto VARCHAR(20),
    Fecha_Compra DATETIME DEFAULT NULL,
    Pendiente TINYINT(1) DEFAULT 1,
    Total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

-- Crear la tabla Detalle_Venta_Servicios
CREATE TABLE Detalle_Venta_Servicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Venta_Servicio INT,
    Id_Servicio INT,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    Sub_Total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (Id_Venta_Servicio) REFERENCES Venta_Servicios(Id),
    FOREIGN KEY (Id_Servicio) REFERENCES Servicios(Id)
);

-- Insertar valores de ejemplo en Categorias_Servicios
INSERT INTO Categorias_Servicios (Nombre) VALUES
('Categoría 1'),
('Categoría 2'),
('Categoría 3');

-- Insertar valores de ejemplo en Servicios
INSERT INTO Servicios (Nombre, Descripcion, Imagen, Id_Categoria, Disponible, Costo, NumVecesComprado) VALUES
('Servicio 1', 'Descripción del Servicio 1', 'imagen1.jpg', 1, TRUE, 50.00, 10),
('Servicio 2', 'Descripción del Servicio 2', 'imagen2.jpg', 2, TRUE, 75.00, 5),
('Servicio 3', 'Descripción del Servicio 3', 'imagen3.jpg', 1, TRUE, 75.99, 8),
('Servicio 4', 'Descripción del Servicio 4', 'imagen4.jpg', 3, TRUE, 90.00, 12),
('Servicio 5', 'Descripción del Servicio 5', 'imagen5.jpg', 3, FALSE, 99.00, 4);

-- Insertar valores de ejemplo en Roles
INSERT INTO Roles (Nombre_Rol) VALUES
('Usuario'),
('Admin');