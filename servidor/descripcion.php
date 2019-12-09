<?php
$host="localhost";
$user="saniforo_alex19malop";
$password="pray4game1234";
$name="saniforo_pray4game";
$table_name="juegos";

$enlace = mysqli_connect($host, $user, $password, $name) or die ("No se ha podido conectar al sistema");

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuracion: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuracion: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


$consultaBusqueda = $_POST['valorBusqueda'];
//Filtro anti-XSS
$caracteres_malos = array("<", ">", "\"", "'", "/", "<", ">", "'", "/");
$caracteres_buenos = array("& lt;", "& gt;", "& quot;", "& #x27;", "& #x2F;", "& #060;", "& #062;", "& #039;", "& #047;");
$consultaB = str_replace($caracteres_malos, $caracteres_buenos, $consultaBusqueda);

$consultaBusqueda = trim($consultaB);

$mensaje = "";
$nombre = "";
$imagen = "";
$descr = "";
$edad = "";


if (isset($consultaBusqueda)) {

    $consulta = mysqli_query($enlace, "SELECT * FROM juegos WHERE name LIKE '%$consultaBusqueda%'");




	//Obtiene la cantidad de filas que hay en la consulta
	$filas = mysqli_num_rows($consulta);

	//Si no existe ninguna fila que sea igual a $consultaBusqueda, entonces mostramos el siguiente mensaje
	if ($filas === 0) {
	} else {

		//La variable $resultado contiene el array que se genera en la consulta, así que obtenemos los datos y los mostramos en un bucle
		while($resultados = mysqli_fetch_array($consulta)) {

			$n = $resultados['name'];
			$i = $resultados['img'];
            $d = $resultados['descripcion'];
            $e = $resultados['pegi'];

            if($n == $consultaBusqueda){
                $nombre = $n;
                $imagen = $i;
                $descr = $d;
                $edad = $e;
            }
		
		};//Fin while $resultados

	}; //Fin else $filas

};
mysqli_close($enlace);

echo utf8_encode($descr);

?>