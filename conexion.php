<?php
$host = "sql207.infinityfree.com";
$user = "if0_40914253";
$pass = "lwOjtzZZPX";
$db   = "if0_40914253_atencion_clientes";

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>
