<?php
$host="localhost";
$user="saniforo_alex19malop";
$password="pray4game1234";
$name="saniforo_pray4game";
$table_name="users";

$enlace = mysqli_connect($host, $user, $password, $name) or die ("No se ha podido conectar al sistema");

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$subs_email = ($_POST['email']);
$subs_password = md5(($_POST['contrasena']));

$resultado=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE email = '".$subs_email."' and contrasena = '".$subs_password."'");

if(mysqli_num_rows($resultado)>0){
    mysqli_close($enlace);
    header('Location: paginaPrincipalRegistrados.html');
}
else{
    mysqli_close($enlace);
    header('Location: inicioSesion.html');
}
?>
