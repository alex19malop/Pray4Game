<?php
$host="localhost";
$user="saniforo_alex19malop";
$password="pray4game1234";
$name="saniforo_pray4game";
$table_name="tables";

$enlace = mysqli_connect($host, $user, $password, $name) or die ("No se ha podido conectar al sistema");

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$usuario = $_COOKIE["user"];
$horaCreacionTabla = time();
$textoInput = $_COOKIE["variable"];

mysqli_query($enlace,  'INSERT INTO `' . $name . '`.`'.$table_name.'` (`username` , `tableName` , `tableDate`) VALUES ("' . $usuario . '", "' . $textoInput . '", "' . $horaCreacionTabla . '")');
mysqli_close($enlace);



?>