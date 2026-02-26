﻿<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include("conexion.php");


if (
    isset($_POST['id_empleado']) &&
    isset($_POST['nombre_cliente']) &&
    isset($_POST['producto']) &&
    isset($_POST['monto']) &&
    isset($_POST['fecha'])
) {


    $id_empleado    = $_POST['id_empleado'];
    $nombre_cliente = $_POST['nombre_cliente'];
    $producto       = $_POST['producto'];
    $monto          = $_POST['monto'];
    $fecha          = $_POST['fecha'];


    $sql = "INSERT INTO atenciones
            (id_empleado, nombre_cliente, producto, monto, fecha)
            VALUES
            ('$id_empleado', '$nombre_cliente', '$producto', '$monto', '$fecha')";


    $resultado = mysqli_query($conexion, $sql);


    if ($resultado) {
        echo "<h2>ATENCIÓN REGISTRADA CORRECTAMENTE</h2>";
        echo "<p>El registro se guardó en la base de datos.</p>";
        echo "<a href='../index.html'>Volver al inicio</a>";
    } else {
        echo "<h2>ERROR AL REGISTRAR</h2>";
        echo "<p>" . mysqli_error($conexion) . "</p>";
    }

} else {

    echo "<h2>ACCESO NO VÁLIDO</h2>";
    echo "<p>Este archivo debe recibir datos desde un formulario.</p>";
    echo "<a href='../index.html'>Volver al inicio</a>";
}
?>
