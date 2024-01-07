DELIMITER //

CREATE PROCEDURE sp_ComprarServicios(
    IN p_IdUsuario INT,
    IN p_DatosProductos TEXT,
    IN p_TelContacto VARCHAR(20),
    IN p_Total DECIMAL(10,2)
)
BEGIN
    DECLARE v_Id_Venta_Servicio INT;
    DECLARE v_Id_Servicio INT;
    DECLARE v_Cantidad INT;
    DECLARE v_Subtotal DECIMAL(10,2);
    DECLARE v_index INT DEFAULT 0;
    DECLARE v_length INT DEFAULT 0;
    -- Variables por si hay error
    DECLARE exito INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;
    DECLARE error_message VARCHAR(255);

    

    -- Manejar errores con un bloque handler
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        error_message = MESSAGE_TEXT;
        ROLLBACK;
        SELECT 'Error durante la transacción de Compra de Servicio. Rollback realizado.' as Mensaje, error_message AS ErrorSQL, exito;
        SET done = 1;
    END;
  
  -- Iniciar la transacción
    START TRANSACTION;
        -- Insertar en la tabla Venta_servicios
    INSERT INTO Venta_servicios(Id_Usuario, Tel_Contacto,Fecha_Compra, Total) VALUES (p_IdUsuario, p_TelContacto,NOW(), p_Total);
    SET v_Id_Venta_Servicio = LAST_INSERT_ID();

    -- Obtener la longitud del array JSON
    SET v_length = JSON_LENGTH(p_DatosProductos);

    -- Iterar sobre el array JSON
    WHILE v_index < v_length DO
        -- Obtener los valores del objeto JSON en el índice actual
        SET v_Id_Servicio = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].id'));
        SET v_Cantidad = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].cantidad'));
        SET v_Subtotal = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].subTotal'));

        -- Insertar en la tabla Detalle_Venta_servicios
        INSERT INTO Detalle_Venta_Servicios(Id_Venta_Servicio, Id_Servicio, Cantidad, Sub_Total) VALUES (v_Id_Venta_Servicio, v_Id_Servicio, v_Cantidad, CAST(v_Subtotal AS DECIMAL(10,2)));

        -- Incrementar el valor de NumVecesComprado en la tabla servicios
        UPDATE servicios SET NumVecesComprado = NumVecesComprado + 1 WHERE Id = v_Id_Servicio;

        SET v_index = v_index + 1;
    END WHILE;

    -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Compra de Servicio exitosa.' AS Mensaje, exito;
    END IF;
END //

DELIMITER ;


-- SP PARA MOSTRAR DATOS:
CREATE PROCEDURE sp_ParsearProductos(IN p_DatosProductos TEXT)
BEGIN
    DECLARE v_Id INT;
    DECLARE v_Cantidad INT;
    DECLARE v_Subtotal DECIMAL(10,2);
    DECLARE v_index INT DEFAULT 0;
    DECLARE v_length INT DEFAULT 0;

    -- Crear una tabla temporal para almacenar los datos
    CREATE TEMPORARY TABLE Temp_Productos(
        Id INT,
        Cantidad INT,
        Subtotal DECIMAL(10,2)
    );

    -- Obtener la longitud del array JSON
    SET v_length = JSON_LENGTH(p_DatosProductos);

    -- Iterar sobre el array JSON
    WHILE v_index < v_length DO
        -- Obtener los valores del objeto JSON en el índice actual
        SET v_Id = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].id'));
        SET v_Cantidad = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].cantidad'));
        SET v_Subtotal = JSON_EXTRACT(p_DatosProductos, CONCAT('$[', v_index, '].subTotal'));

        -- Insertar en la tabla temporal
        INSERT INTO Temp_Productos(Id, Cantidad, Subtotal) VALUES (v_Id, v_Cantidad, CAST(v_Subtotal AS DECIMAL(10,2)));

        SET v_index = v_index + 1;
    END WHILE;

    -- Devolver los datos en forma de SELECT
    SELECT *, "Si" AS Mensaje FROM Temp_Productos;

    -- Eliminar la tabla temporal
    DROP TABLE Temp_Productos;
END