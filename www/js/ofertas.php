<?php // Cargar ofertas del usuario

if(isset($_POST['ready'])) {
	
	$rut_usuario = $_POST['rut_usuario'];

	include 'abrir_conexion.php';
	
	$sql = "SELECT * FROM app_ofertas WHERE rut_usuario = '$rut_usuario'";
	$resultados = $conexion->query($sql);
	$row_cnt = $resultados->num_rows;
	
	if($conexion->errno) {
		die($conexion->error);
		}
	
	if ($row_cnt > 0) {
		while ($row = $resultados->fetch_object()) {
			$data[] = $row;
			}
		echo json_encode($data);
		}

	else {
		$data = "NoOfertas";
		echo $data;
		}
	
	die($conexion);
	
	include 'cerrar_conexion.php'; 

} // Fin Cargar ofertas

?>

<?php // Añadir oferta

if(isset($_POST['anadir_oferta'])) {

	$rut_usuario = $_POST['rut_usuario'];
	$titulo_oferta = $_POST['titulo_oferta'];
	$tipo_oferta = $_POST['tipo_oferta'];
	$inicio_oferta = date('Y/m/d', strtotime(str_replace('-','/', $_POST['inicio_oferta'])));
	$fin_oferta = date('Y/m/d', strtotime(str_replace('-','/', $_POST['fin_oferta'])));
	$descripcion_oferta = $_POST['descripcion_oferta'];
	$requisitos_oferta = $_POST['requisitos_oferta'];
	$sueldo_oferta = $_POST['sueldo_oferta'];
	$cupos_oferta = $_POST['cupos_oferta'];
	$publico_oferta = $_POST['publico_oferta'];
	$fecha_oferta = date("Y/m/d H:i:s");
	$estado_oferta = "pendiente";
	
	include 'abrir_conexion.php';
	
	$sql = "INSERT INTO app_ofertas(rut_usuario, titulo_oferta, tipo_oferta, inicio_oferta, fin_oferta, descripcion_oferta, requisitos_oferta, sueldo_oferta, cupos_oferta, publico_oferta, fecha_oferta, estado_oferta) VALUES ('$rut_usuario', '$titulo_oferta', '$tipo_oferta', '$inicio_oferta', '$fin_oferta', '$descripcion_oferta', '$requisitos_oferta', '$sueldo_oferta', '$cupos_oferta', '$publico_oferta', '$fecha_oferta', '$estado_oferta')";
	
	//echo $sql;
	
	$resultado = $conexion->query($sql);
	
	if ($resultado) {
		echo 'succes';
		}
	else {
		echo 'failed';
		}
	
	die($conexion);
	include 'cerrar_conexion.php';
	
} // Fin Añadir oferta

?>