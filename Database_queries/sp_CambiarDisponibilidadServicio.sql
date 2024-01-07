CREATE PROCEDURE sp_CambiarDisponibilidadServicio(
  IN v_Id_Servicio INT
)
BEGIN
  DECLARE exito INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;
    DECLARE error_message VARCHAR(255);
    DECLARE estado_actual INT;

    -- Manejar errores con un bloque handler
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        error_message = MESSAGE_TEXT;
        ROLLBACK;
        SELECT 'Error durante la transacción. Rollback realizado.' as Mensaje, error_message AS errorSQL, exito;
        SET done = 1;
    END;

    SET estado_actual = (SELECT Disponible FROM servicios WHERE Id = v_Id_Servicio);
  
  -- Iniciar la transacción
    START TRANSACTION;

    IF estado_actual = 1 THEN
        UPDATE servicios SET Disponible = 0 WHERE Id = v_Id_Servicio;
    ELSE
        UPDATE servicios SET Disponible = 1 WHERE Id = v_Id_Servicio;
    END IF;

    -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Disponibilidad de Servicio cambiada Exitosamente.' AS mensaje, exito;
    END IF;
END