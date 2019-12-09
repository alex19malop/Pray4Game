<?php
$host="localhost";
$user="saniforo_alex19malop";
$password="pray4game1234";
$name="saniforo_pray4game";
$table_name="users";

$enlace = mysqli_connect($host, $user, $password, $name) or die ("No se ha podido conectar al sistema");

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuracion: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuracion: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$subs_username = ($_POST['username']);
$p = md5(($_POST['contrasena']));

$d = ($_POST['fechaNew']);

$consulta=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE username = '".$subs_username."' and password ='" .$p. "'");
$consulta2=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE email = '".$e."'");

$u = "";
$p = "";
$n = "";
$s = "";
$e = "";
//$d = "";

if(mysqli_num_rows($consulta)>0 and mysqli_num_rows($consulta2)==0){
    while($resultados = mysqli_fetch_array($consulta)) {
        $u = $resultados['username'];
        $p = $resultados['password'];
        $n = $resultados['name'];
        $s = $resultados['surname'];
        $e = $resultados['email'];
        //$d = $resultados['date'];
	};
    mysqli_query($enlace, "DELETE FROM ".$table_name." WHERE username = '".$subs_username."'");
    mysqli_query($enlace,  'INSERT INTO `' . $name . '`.`'.$table_name.'` (`username` , `password` , `name` , `surname` , `email` , `date`) VALUES ("' . $u . '", "' . $p . '", "' . $n . '", "' . $s . '", "' . $e . '", "' . $d . '")');
    header('Location: ../paginaPrincipalRegistrados.html');
}
else{
    mysqli_close($enlace);
    echo 'f';
    header('Location: ../configuracion.html');
}
mysqli_close($enlace);





?>
