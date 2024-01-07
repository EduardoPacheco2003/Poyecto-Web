CREATE PROCEDURE sp_InsertarNuevoServicio(
  IN v_nombre VARCHAR(100),
  IN v_descripcion VARCHAR(300),
  IN v_imgLink VARCHAR(300),
  IN v_idCategoria INT,
  IN v_precio DECIMAL(10,2),
  IN v_disponible TINYINT
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
      INSERT INTO servicios(nombre, descripcion, imagen, Id_Categoria, costo, disponible, numVecesComprado)
      VALUES(v_nombre, v_descripcion, v_imgLink, v_idCategoria, v_precio, v_disponible, 0);

    -- Confirmar la transacción si no hay errores
    IF done = 0 THEN
        COMMIT;
        SET exito = 1;
        SELECT 'Usuario insertado exitosamente.' AS Mensaje, exito;
    END IF;
END