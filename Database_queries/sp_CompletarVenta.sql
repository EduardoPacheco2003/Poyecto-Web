CREATE PROCEDURE sp_CompletarVenta(
  IN v_Id_Venta INT
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
        SELECT 'Error durante la transacción. Rollback realizado.' as Mensaje, error_message AS errorSQL, exito;
        SET done = 1;
    END;
  
  -- Iniciar la transacción
    START TRANSACTION;
    
      UPDATE venta_servicios  
      SET Pendiente  = 0
      WHERE Id = v_Id_Venta;
    
     -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Venta Completada Exitosamente.' AS mensaje, exito;
    END IF;
  
END

