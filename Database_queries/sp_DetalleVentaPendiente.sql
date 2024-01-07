CREATE PROCEDURE sp_DetalleVentaPendiente(
  IN v_Id_Venta INT
)
BEGIN
  SELECT 
    s.nombre, dvs.cantidad 
  FROM 
    detalle_venta_servicios dvs
    LEFT JOIN venta_servicios vs ON vs.Id = dvs.Id_Venta_Servicio
    LEFT JOIN servicios s ON s.Id = dvs.Id_Servicio 
  WHERE
  vs.Id = v_Id_Venta;
END
