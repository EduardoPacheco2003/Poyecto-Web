-- Insertar valores de ejemplo en Categorias_Servicios
INSERT INTO Categorias_Servicios (Nombre) VALUES
('Categoría 1'),
('Categoría 2'),
('Categoría 3');

-- Insertar valores de ejemplo en Servicios
INSERT INTO Servicios (Nombre, Descripcion, Imagen, Id_Categoria, Disponible, Costo, NumVecesComprado) VALUES
('Servicio 1', 'Descripción del Servicio 1', 'imagen1.jpg', 1, TRUE, 50.00, 10),
('Servicio 2', 'Descripción del Servicio 2', 'imagen2.jpg', 2, TRUE, 75.00, 5),
('Servicio 3', 'Descripción del Servicio 3', 'imagen3.jpg', 1, TRUE, 60.00, 8),
('Servicio 4', 'Descripción del Servicio 4', 'imagen4.jpg', 3, TRUE, 90.00, 12),
('Servicio 5', 'Descripción del Servicio 5', 'imagen5.jpg', 3, FALSE, 99.00, 4);


SELECT Nombre, Descripcion, Costo  FROM servicios s

ALTER TABLE Usuarios
MODIFY COLUMN Password VARCHAR(300) NOT NULL;