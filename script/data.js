var codropsEvents = {
	//'11-27-2019' : '<span>Islamic New Year</span>',
	'01-DD-YYYY' :'    ',
	'02-DD-YYYY' :'    ',
	'03-DD-YYYY' :'    ',
	'04-DD-YYYY' :'    ',
	'05-DD-YYYY' :'    ',
	'06-DD-YYYY' :'    ',
	'07-DD-YYYY' :'    ',
	'08-DD-YYYY' :'    ',
	'09-DD-YYYY' :'    ',
	'10-DD-YYYY' :'    ',
	'11-DD-YYYY' :'    ',
	'12-DD-YYYY' :'    ',
};


$(function() {
	$(document).on('shown.calendar.calendario', function(e, instance){
		if(!instance) instance = cal;
		var $cell = instance.getCell(new Date().getDate());
		if($cell.hasClass('fc-today')) $cell.trigger('click.calendario');
	});

	var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		$wrapper = $( '#custom-inner' ),
		$calendar = $( '#calendar' ),
		cal = $calendar.calendario({
			onDayClick : function( $el, data, dateProperties ) {

				if(data.content.length > 0 ) {
					showEvents(data.content, dateProperties );
				}

			},
			caldata : codropsEvents,
			displayWeekAbbr : true,
			events: 'click'
		} ),
		$month = $( '#custom-month' ).html( cal.getMonthName() ),
		$year = $( '#custom-year' ).html( cal.getYear() );

	$( '#custom-next' ).on( 'click', function() {
		cal.gotoNextMonth( updateMonthYear );
	} );
	$( '#custom-prev' ).on( 'click', function() {
		cal.gotoPreviousMonth( updateMonthYear );
	} );


	function updateMonthYear() {                
		$month.html( cal.getMonthName() );
		$year.html( cal.getYear() );
	}

	
	function showEvents( contentEl, dateProperties ) {
		var $events;
		var dia = document.getElementById('opcionesEvento '+dateProperties.monthname + ' ' + dateProperties.day + ' ' + dateProperties.year);
		if (dia==null) {
			$events = $( '<div id="opcionesEvento ' + dateProperties.monthname + ' ' + dateProperties.day + ' ' + dateProperties.year + '" class="custom-content-reveal"><h4>'
			+ dateProperties.monthname + ' ' + dateProperties.day + ', ' + dateProperties.year + 
			'</h4></div>'),
				$event1 = $('<button id="añadirEvento" class="añadirEvento" data-placement="top" data-toggle="tooltip" title="Añadir Evento" type="button">NUEVO</button>').on( 'click', addEvent ),
				$event2 = $('<h3 class="EventosActuales">EVENTOS ACTUALES</h3>'),
				$close = $( '<span class="custom-content-close"></span>' ).on( 'click', hideEvents );


			$events.append( contentEl.join('') , $event1 );
			$events.append( contentEl.join('') , $event2 );
			$events.append( contentEl.join('') , $close ).insertAfter( $wrapper );	
			setTimeout( function() {
				$events.css( 'top', '0%' );
			}, 25 );
		}
		else{
			dia.style.top='0%';
		}

		function addEvent(){
			var TextoInput=prompt('Ingrese el evento que desea añadir');

			var $event3 = $( '<div class="contenedorTextoEvento"><h3 class="textoEvento">'
							+ TextoInput + 
							'</h3></div>'),
				$close2 = $( '<div class="contenedorCierreEvento"><span class="custom-content-closeEvento"></span></div>' ).on( 'click', EscondeEvento );
				$contenedor=$( '<div class="contenedorEvento"></div>'),
	
			$contenedor.append( contentEl.join('') , $event3 );
			$contenedor.append( contentEl.join('') , $close2 );
			$events.append( contentEl.join('') , $contenedor ).insertAfter( $wrapper );

			function EscondeEvento(){
				this.parentElement.remove();
			}
		}
		function hideEvents() {
			var dia = document.getElementById('opcionesEvento '+dateProperties.monthname + ' ' + dateProperties.day + ' ' + dateProperties.year);
			dia.style.top='100%';
		}
	}

});
