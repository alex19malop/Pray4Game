/*$(document).ready(function(){

	$("ul.subnav").parent().append("<span></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)

	$("ul.topnav li span").click(function() { //When trigger is clicked...

		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

		$(this).parent().hover(function() {
		}, function(){
			$(this).parent().find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() {
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});

});
*/

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

	var divAnadirBloque = document.createElement("div");
    divAnadirBloque.classList.add("divAnadirNuevoBloque");
    divAnadirBloque.classList.add("colorAnadirNuevaCategoria");
    divAnadirBloque.innerHTML = '<i class="fas fa-plus"></i>&nbsp;Añadir nueva categoría';
    
    var row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(divAnadirBloque);
	
	divTituloBocadilloConsola.appendChild(divTituloConsola);
    divBloque.appendChild(divTituloBocadilloConsola);
    divBloque.appendChild(row);

	document.getElementById("bigbox").appendChild(divBloque);

	/*location.href = "introducirBloque.php"*/
	

}

function crearMinibloque(elem){
    var divMinibloque = document.createElement("div");
    divMinibloque.classList.add("minibloque");

    var row1 = document.createElement("div");
    row1.classList.add("row");

    var imgDiv = document.createElement("div");
    var elementoImg = document.createElement("img");
    elementoImg.classList.add("image");
    if(confirm("¿Quiere añadir una imagen? (debe ingresar la URL de la imagen)")){
        imgDiv.classList.add("imgDiv");
        elementoImg.src=prompt("Ingrese url de la imagen", "http://1.bp.blogspot.com/-sP4Im83vUzk/T6zvf38AFVI/AAAAAAAACN4/Z4tAntnP26E/s1600/pokemon-elements-pokemon-hd-wallpaper-for-your-pc.jpg");
    }
    else{
        imgDiv.classList.add("imgDiv");
        elementoImg.src="img/imagen_neutra.jpg";
    }
    
    imgDiv.appendChild(elementoImg);

    var enlace=document.createElement("a");
    var textoInput = prompt('Ingrese el nombre del juego', 'Ej: Assansing creed');

    if (textoInput === null) {
        return;
    }

    var texto = document.createTextNode(textoInput);
    var textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    enlace.appendChild(texto);
    textDiv.appendChild(enlace);

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

    var addElem = elem.parentElement;
    var bloque = addElem.parentElement;

    bloque.insertBefore(divMinibloque, addElem);
}

function removeAllChilds(a){
    if(document.getElementById(a)){
        var a=document.getElementById(a);
    }
    while(a.hasChildNodes())
    a.removeChild(a.firstChild);	
}
