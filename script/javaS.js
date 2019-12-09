var elementoActual;
var usuario = "";

function guardarElem(elem){
    elementoActual = elem;
    document.getElementById("buscador").style.display = "flex";
}

/*Comprueba que no hay caracteres incorrectos*/
function checkInput(input) {
    if (input === null) {
        return false;
    }

    var matched = input.match(/[A-z0-9_\-\.]{3,}/g);
    if (matched === null || matched[0] !== input){
        return false;
    }

    return true;
}

/*Crea una nueva columna a partir de un titulo que pide con un promp*/
function crearBloque(){
	var divBloque = document.createElement("div");
	divBloque.classList.add("bloque");
	
	var divTituloBocadilloConsola = document.createElement("div");
	divTituloBocadilloConsola.classList.add("tituloBocadilloConsola");

	/*var divBocadilloConsola = document.createElement("div");
	divBocadilloConsola.classList.add(bocadilloConsola);*/

	var textoInput = prompt('Ingrese el nombre de la tabla', 'Ej: Juegos jugados en 2019');
    if (textoInput === null) {return;}
    var texto = document.createTextNode(textoInput);
    
	document.cookie ='variable='+ textoInput +'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';
	document.cookie ='user=alex19malop; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/';

	var divTituloConsola = document.createElement("div");
	divTituloConsola.classList.add("tituloConsola");
	divTituloConsola.appendChild(texto);

    var divBocadillo = document.createElement("div");
    divBocadillo.classList.add("bocadilloConsola");
    divBocadillo.innerHTML = '<a class="open-hide" onclick="showMenu(this)" title="menu">Menu</a><ul class="menuDesplegable"><li onclick="archivar(this)">Archivar</li></ul>';
    
    var row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = '<a href ="#buscador" onclick="guardarElem(this)"><div class="divAnadirNuevoBloque colorAnadirNuevaCategoria" ><i class="fas fa-plus"></i>&nbsp;Añadir nueva categoría</div></a>';
	
	divTituloBocadilloConsola.appendChild(divTituloConsola);
	divTituloBocadilloConsola.appendChild(divBocadillo);
    divBloque.appendChild(divTituloBocadilloConsola);
    divBloque.appendChild(row);

	document.getElementById("bigbox").appendChild(divBloque);

	/*location.href = "introducirBloque.php"*/
	

}

/*Borra todos los hijos a partir de un elemento pasado por parametro*/
function removeAllChilds(a){
    if(document.getElementById(a)){
        var a=document.getElementById(a);
    }
    while(a.hasChildNodes())
    a.removeChild(a.firstChild);	
}


/**************************************************/
/*Budca en la base de datos un juego y en buscar.php imprime en el buscador cada uno de los juegos*/
$(document).ready(function() {
    $("#resultadoBusqueda").html('<p></p>');
});

function buscar() {
    var textoBusqueda = $("input#busqueda").val();
 
    if (textoBusqueda != "") {
        $.post("servidor/buscar.php", {valorBusqueda: textoBusqueda}, function(mensaje) {
            $("#resultadoBusqueda").html(mensaje);
        }); 
    } else { 
        $("#resultadoBusqueda").html('<p></p>');
    };
};

function mostrarEleccion(elem){
    var str = $(elem).text();
    var a = document.createTextNode(str);
    document.getElementById("muestra").appendChild(a);
}

function crearMinibloque(elem){
    
    //var datos = varMinibloque(this);
    
    
}

/*Al hacer click en un juego en el buscador, se creara un minibloque en su correspondiente tabla*/
function varMinibloque(elem){
    var juego = $(elem).text();
    var nombre;
    var imagen;
    var descr;
    var pegi;

    $.post("servidor/juegos.php", {valorBusqueda: juego}, function(data) {
        var a = JSON.parse(data);
        nombre = a.nombre;
        imagen = a.imagen;
        pegi = a.edad;
        $.post("servidor/descripcion.php", {valorBusqueda: juego}, function(dato) {
            descr = dato;

            document.getElementById("busqueda").value = "";
            document.getElementById("buscador").style.display = "none";
            $("#resultadoBusqueda").html('<p></p>');

            var divMinibloque = document.createElement("div");

            divMinibloque.classList.add("minibloque");
                
            var row1 = document.createElement("div");
            row1.classList.add("row");
                
            var imgDiv = document.createElement("div");
            var elementoImg = document.createElement("img");
            elementoImg.classList.add("image");
                
            imgDiv.classList.add("imgDiv");
            elementoImg.src="img/"+imagen;
                
            imgDiv.appendChild(elementoImg);
                
            /*var enlace=document.createElement("a");
            var textoInput = nombre;*/
                
            /*var texto = document.createTextNode(textoInput);*/
            var textDiv = document.createElement("div");
            textDiv.classList.add("textDiv");

            textDiv.innerHTML = '<a href="#popup" onclick="mostrarPopUp(this)">' + nombre + '</a>';
            
                
            var close = document.createElement("div");
            close.classList.add("close");
            close.innerHTML = '<i class="far fa-times-circle" title="cerrar" onclick="ocultar(this)"></i>';
                
                
            var row2 = document.createElement("div");
            row2.classList.add("row");
                
            var fecha = document.createElement("time");
            var fech = new Date();
            var txtfecha = document.createTextNode(fech.getDate()+"/"+(fech.getMonth()+1)+"/"+fech.getFullYear()+" "+fech.getHours()+":"+fech.getMinutes());
            fecha.appendChild(txtfecha);
            var dateDiv = document.createElement("div");
            dateDiv.classList.add("dateDiv");
            dateDiv.appendChild(fecha);
                
            var iconsDiv = document.createElement("div");
            iconsDiv.classList.add("iconsDiv");
            var iconos = document.createElement("a");
            iconos.innerHTML = '<i class="fas fa-thumbs-up" title="me gusta" onclick="cambiarLike(this)"></i> <i class="fas fa-comments" title="comentar"></i><a href="#popup2" onclick="mostrarCajaCompartir(this)"><i class="far fa-share-square" title="más información"></i>';
            iconsDiv.appendChild(iconos);
                
            row1.appendChild(imgDiv);
            row1.appendChild(textDiv);
            row1.appendChild(close);
            row2.appendChild(dateDiv);
            row2.appendChild(iconsDiv);
            divMinibloque.appendChild(row1);
            divMinibloque.appendChild(row2);
                
            var addElem = elementoActual.parentElement;
            var bloque = addElem.parentElement;
                
            bloque.insertBefore(divMinibloque, addElem);
                
        }); 
    });
}


function reiniciarChat(elem){
    document.getElementById('box').innerHTML='';
}

 


/**CHATTTTTTTTTT */
(function(){
    var pubnub = new PubNub({publishKey : 'pub-c-c0b83506-acd4-48f7-aeff-d0354ba3a3ac', subscribeKey : 'sub-c-644bb140-1873-11ea-9941-ee3e45d53e76'}); // Your PubNub keys here. Get them from https://dashboard.pubnub.com.
    var box = document.getElementById("box"), input = document.getElementById("input"), channel = 'chat';
    pubnub.subscribe({channels: [channel]}); // Subscribe to a channel.
    pubnub.addListener({message: function(m) {
        var name = localStorage.getItem('Nombre');
        box.innerHTML = box.innerHTML+ '<div class="circleName">' + name.charAt(0).toUpperCase() + '</div>'+  name + '<br><div class="popupMensaje">' +(''+m.message).replace( /[<>]/g, '' ) + '</div><br>'; // Add message to page.
      }});
    input.addEventListener('keypress', function (e) {
        (e.keyCode || e.charCode) === 13 && pubnub.publish({ // Publish new message when enter is pressed. 
            channel : channel, message : input.value, x : (input.value='')
        });
    });
  })();
  
  /*Al hacer click en un juego, se busca sus atributos en la base de datos y se rellena el popup con estos mismos atributos*/
 function mostrarPopUp(elem){
    var juego = $(elem).text();
    var nombre;
    var imagen;
    var descr;
    var pegi;

    $.post("servidor/juegos.php", {valorBusqueda: juego}, function(data) {
        var a = JSON.parse(data);
        nombre = a.nombre;
        imagen = a.imagen;
        pegi = a.edad;
        $.post("servidor/descripcion.php", {valorBusqueda: juego}, function(dato) {
            descr = dato;
            
            document.getElementById('letrasTitulo').innerHTML = nombre;
            document.getElementById('imagenPopup').src = "img/" + imagen;
            document.getElementById('descrPopup').innerHTML =descr;
            
            if(pegi == 18){document.getElementById('pegiId').src = "img/pegi18.png";}
            if(pegi == 16){document.getElementById('pegiId').src = "img/pegi16.png";}
            if(pegi == 12){document.getElementById('pegiId').src = "img/pegi12.png";}
            if(pegi == 3){document.getElementById('pegiId').src = "img/pegi3.png";}


            
        });
    });
}

function cerrarPopUp(){
    document.getElementById("buscador").style.display = "none";
    document.getElementById("busqueda").value = "";
    $("#resultadoBusqueda").html('<p></p>');
}


function ocultar(elem){
    if(confirm("¿Seguro que quiere cerrar?")){
        return elem.parentElement.parentElement.parentElement.style.display = 'none';
    }
}

function showMenu(elem){
    elem.classList.toggle('show');
}

function archivar(elem){
    if(confirm("¿Seguro que quiere archivar la columna?")){
      return elem.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
}

function cambiarLike(elem){
    if(elem.className="fas fa-thumbs-up"){
        elem.className="far fa-grin-hearts";
    }
    else{
        elem.className="fas fa-thumbs-up";
    }
}
function userConectado(username){
    usuario = username;
}
function userDesconectado(){
    usuario = '';
}
function userSituacion(){
    if(usuario == ''){
        return false;
    }
    else{
        return true;
    }
}
function escribirUsuario(){
    var texto = document.createTextNode(localStorage.getItem('Nombre'));
    document.getElementById("nombreUsuario").appendChild(texto);
}


$( document ).ready( function() {
    var texto = document.createTextNode(localStorage.getItem('Nombre'));
    document.getElementById("nombreUsuario").appendChild(texto);
});





/*Comprueba que el usuario introdudcido al registrarse no se encuentra en la base de datos*/
$(document).ready(function() {
    $("#alerta").html('<p></p>');
});

function asignarUsuario() {
    var textoBusqueda = $("input#username").val();
    localStorage.setItem('Nombre', textoBusqueda);
    
    if (textoBusqueda != "") {
        $.post("servidor/usuarioExistente.php", {valorBusqueda: textoBusqueda}, function(mensaje) {
            $("#alerta").html(mensaje);
        }); 
    } else { 
        $("#alerta").html('<p></p>');
    };
};

$(document).ready(function() {
    $("#alerta2").html('<p></p>');
});

/*Comprueba que el email introdudcido al registrarse no se encuentra en la base de datos*/
function comprobarEmail() {
    var textoBusqueda = $("input#email").val();

    if (textoBusqueda != "") {
        $.post("servidor/emailExistente.php", {valorBusqueda: textoBusqueda}, function(mensaje) {
            $("#alerta2").html(mensaje);
        }); 
    } else { 
        $("#alerta2").html('<p></p>');
    };
};

function asignarUsuarioInicioSesion(){
    var textoBusqueda = $("input#mail").val();
    
    if (textoBusqueda != "") {
        $.post("servidor/emailDevuelveUsername.php", {valorBusqueda: textoBusqueda}, function(mensaje) {
            localStorage.setItem('Nombre', mensaje);
        }); 
    }
}


/* Objetos en movimiento con Jquery */

$(document).ready(function () {
	$('.bigbox').sortable({
	connectWith: '.bigbox'
	});
});

$(document).ready(function () {
	$('.draggable_minibloque').sortable({
	connectWith: '.draggable_minibloque'
	});
});


function cerrarSesion(){
    var a = "";
    localStorage.setItem('Nombre', a);
    window.location.href = "paginaInicial.html";
}