CREATE PROCEDURE sp_EliminarServicio(
  IN v_Id_Servicio INT
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
    
    DELETE FROM servicios
    WHERE servicios.Id = v_Id_Servicio;
  
    -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Servicio Eliminado exitosamente.' AS mensaje, exito;
    END IF;
  
END
