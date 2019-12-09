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

//$db = mysqli_select_db($name, $conexion) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos");



$recaptcha = $_POST["g-recaptcha-response"];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => '6Ld6gsYUAAAAADPARNSOABLjCIn73u7VRC-eXfK5',
    'response' => $recaptcha
);
$options = array(
    'http' => array (
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success = json_decode($verify);

if ($captcha_success->success) {
    echo 'Se envía el formulario';
    $subs_name = ($_POST['nombre']);
    $subs_surname = ($_POST['apellidos']);
    $subs_email = ($_POST['email']);
    $subs_username = ($_POST['nombreUsuario']);
    $subs_password = md5(($_POST['contrasena']));
    $subs_date = ($_POST['fecha']);
    $resultado=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE username = '".$subs_username."'");
    $resultado2=mysqli_query($enlace, "SELECT * FROM ".$table_name." WHERE email = '".$subs_email."'");


    if(mysqli_num_rows($resultado)>0 or mysqli_num_rows($resultado2)>0){
        echo "Ese usuario ya existe";
        mysqli_close($enlace);
        header('Location: ../registro.html');
    }
    else{
        mysqli_query($enlace,  'INSERT INTO `' . $name . '`.`'.$table_name.'` (`username` , `password` , `name` , `surname` , `email` , `date`) VALUES ("' . $subs_username . '", "' . $subs_password . '", "' . $subs_name . '", "' . $subs_surname . '", "' . $subs_email . '", "' . $subs_date . '")');
        mysqli_close($enlace);
        header('Location: ../paginaPrincipalRegistrados.html');
    }
    mysqli_close($enlace);
    
} else {
    echo 'No se envía el formulario';
}



?>
