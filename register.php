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

$caracteres_malos = array("<", ">", "\"", "'", "/", "<", ">", "'", "/");
$caracteres_buenos = array("& lt;", "& gt;", "& quot;", "& #x27;", "& #x2F;", "& #060;", "& #062;", "& #039;", "& #047;");

//$db = mysqli_select_db($name, $conexion) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos");


$subs_name = ($_POST['nombre']);
$subs_surname = ($_POST['apellidos']);
$subs_email = ($_POST['email']);
$subs_username = ($_POST['nombreUsuario']);
$subs_password = md5(($_POST['contrasena']));
$subs_date = ($_POST['fecha']);

$subs_name = str_replace($caracteres_malos, $caracteres_buenos, $subs_name);
$subs_surname = str_replace($caracteres_malos, $caracteres_buenos, $subs_surname);
$subs_email = str_replace($caracteres_malos, $caracteres_buenos, $subs_email);
$subs_username = str_replace($caracteres_malos, $caracteres_buenos, $subs_username);
$subs_password = str_replace($caracteres_malos, $caracteres_buenos, $subs_password);
$subs_date = str_replace($caracteres_malos, $caracteres_buenos, $subs_date);



/*
if(!checkInput($subs_name)){
    header('Location: registro.html');
}
*/

$resultado=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE username = '".$subs_username."'");

if(mysqli_num_rows($resultado)>0){
    mysqli_close($enlace);
    header('Location: registro.html');
}
else{
    mysqli_query($enlace,  'INSERT INTO `' . $name . '`.`'.$table_name.'` (`username` , `password` , `name` , `surname` , `email` , `date`) VALUES ("' . $subs_username . '", "' . $subs_password . '", "' . $subs_name . '", "' . $subs_surname . '", "' . $subs_email . '", "' . $subs_date . '")');
    mysqli_close($enlace);
    header('Location: paginaPrincipalRegistrados.html');
}
?>
