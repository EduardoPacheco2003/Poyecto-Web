DELIMITER //

CREATE PROCEDURE sp_RegistrarUsuario(
    IN p_Username VARCHAR(12),
    IN p_Password VARCHAR(300),
    IN p_Nombre VARCHAR(30),
    IN p_Apellidos VARCHAR(50),
    IN p_Correo VARCHAR(60)
)
BEGIN
    DECLARE exito INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;
    DECLARE error_message VARCHAR(255);

    -- Manejar errores con un bloque handler
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        error_message = MESSAGE_TEXT;
        ROLLBACK;
        SELECT 'Error durante la transacción. Rollback realizado.' as Mensaje, error_message AS ErrorSQL, exito;
        SET done = 1;
    END;

    -- Iniciar la transacción
    START TRANSACTION;

    -- Insertar datos en la tabla Usuarios
    INSERT INTO Usuarios (Username, Password, Nombre, Apellidos, Correo)
    VALUES (p_Username, p_Password, p_Nombre, p_Apellidos, p_Correo);

    -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Usuario insertado exitosamente.' AS Mensaje, exito;
    END IF;
END//

DELIMITER ;

