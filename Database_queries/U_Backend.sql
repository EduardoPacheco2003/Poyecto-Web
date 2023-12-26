-- Crear el usuario 'backend'
CREATE USER 'u_backend'@'localhost' IDENTIFIED BY 'Backend.10';

-- Otorgar permisos para ejecutar procedimientos almacenados en la base de datos 'proyecto_web'
GRANT EXECUTE ON proyecto_web.* TO 'u_backend'@'localhost';

SHOW GRANTS FOR 'u_backend'@'localhost';

/*Permiso de hacer select:*/ 
GRANT SELECT ON proyecto_web.* TO 'u_backend'@'localhost';