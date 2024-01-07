DELIMITER //

CREATE PROCEDURE sp_Servicios_x_Cliente(IN v_Id_Usuario INT)
BEGIN
  SELECT
    vs.Id AS id_Venta, 
    dvs.Id AS id_detalleVenta, 
    u.Correo AS correo, 
    s.Nombre AS servicio_Comprado, 
    vs.Total AS total, 
    dvs.Sub_Total AS subTotal,  
    vs.Fecha_Compra AS fecha_Compra
  FROM
    detalle_venta_servicios dvs
    LEFT JOIN venta_servicios vs ON vs.Id = dvs.Id_Venta_Servicio
    LEFT JOIN usuarios u ON u.Id = vs.Id_Usuario
    LEFT JOIN servicios s ON s.Id = dvs.Id_Servicio
  WHERE
    u.Id = v_Id_Usuario
  ORDER BY
    vs.Fecha_Compra DESC;
END //

DELIMITER ;
