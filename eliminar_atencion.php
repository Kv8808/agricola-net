<?php
include("conexion.php");

$id = $_GET['id'];

$sql = "DELETE FROM atenciones WHERE id_atencion='$id'";
mysqli_query($conexion, $sql);

header("Location: ver_atenciones.php");
?>
