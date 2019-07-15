$(document).ready(function(e) {
	
	$('#menu_more').html('<span class="section_title">Ingresar nueva oferta</span><div><form name="index" id="anadir_oferta" method="post" action="https://www.arcos.cl/app_test2/ofertas.php"><p>Título oferta</p><input type="text" name="titulo_oferta" id="titulo_oferta" placeholder="Director de arte en práctica..."><p>Tipo de oferta</p><select name="tipo_oferta" id="tipo_oferta"><option selected disabled>Selecciona una opción</option><option value="practica">Práctica</option><option value="laboral">Laboral</option><option value="reemplazo">Reemplazo</option></select><p>Fecha de inicio</p><input type="date" name="inicio_oferta" id="inicio_oferta" placeholder="Fecha de inicio"><p>Fecha de término</p><input type="date" name="fin_oferta" id="fin_oferta" placeholder="Fecha de término"><p>Descripción anuncio</p><textarea type="text" name="descripcion_oferta" placeholder="Importante empresa del rubro..." rows="6" id="descripcion_oferta"></textarea><p>Requisitos de postulación</p><input type="text" name="requisitos_oferta" placeholder="Uno por línea" id="requisitos_oferta"><p>Sueldo</p><input type="number" name="sueldo_oferta" placeholder="Ingresar sólo números" id="sueldo_oferta"><p>Cupos</p><select name="cupos_oferta" id="cupos_oferta"><option selected disabled>Selecciona una opción</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select><p>Dirigido a</p><select name="publico_oferta" id="publico_oferta"><option selected disabled>Selecciona una escuela / carrera</option><option value="foto">Fotografía</option><option value="cine">Cine y Audiovisual</option><option value="diseno">Diseño y Multimedia</option><option value="actu">Actuación</option><option value="sonido">Sonido y Música</option><option value="territorio">Territorio y Sustentabilidad</option></select><input type="submit" name="crear_oferta" value="Crear" id="crear_oferta"><input type="reset" value="Cancelar" id="cancelar"></form>');
	
	var nList;
	
	var inicialHeight = $('body').height() * 0.5;
	
	var rut_usuario = '15479585-5';
	
	var datosUsuario = { 'rut_usuario' : rut_usuario , 'ready' : true }
	
	var dataOferta;
	
	$.post('https://www.arcos.cl/app_test2/ofertas.php', datosUsuario, obtenerUsuario, 'json');			
	//return false;
				
	function obtenerUsuario(data){ // Recibimos la respuesta 'data' del servidor
	dataOferta = data;
				
	$('#load').addClass('loading').fadeIn(200).delay(1000).fadeOut(200);
	
	//console.log(data);

	
	if(data.result == "NoOfertas") {
		$('#lista_ofertas').html('<p id="no_ofertas">Aún no tienes ofertas publicadas.</p><span>↓</span>');
		}
	
	else { // else NoOfertas
		
		$('#lista_ofertas').html('<ul></ul>');
		
		var lista_oferta = $('#lista_ofertas > ul');
		
		for(let item of data) {
			var postulaciones_oferta = item.postulaciones_oferta || 0;
			lista_oferta.append('<li><div class="section_top"><div class="titulo_oferta"><h2 id="titulo_oferta">' + item.titulo_oferta + '</h2><p id="tipo_oferta">' + item.tipo_oferta + '</p></div><div class="info"><p id="postulaciones_oferta">' + postulaciones_oferta + ' postulaciones</p><p id="count_inicio">Inicia en 5 días</p></div><div id="standby" class="edit"><div id="on_off" class="on_off"></div></div></div><div class="section_bottom"><div class="descripcion"><p id="descripcion_oferta">' + item.descripcion_oferta + '</p></div></div></li>');
	
			} // Fin for
			
			// Pausar ofertas
			$('#lista_ofertas li .on_off').on('click',onOff);
			var eOferta = 1;
			function onOff(){
				if(eOferta==-1){
					$(this).css('left','0');
					eOferta *= -1;
				}
				else {
					$(this).css('left','50%');
					eOferta *= -1;
					}
				}
			// Fin pausar ofertas
 
			
			// Editar oferta
			$('#lista_ofertas #titulo_oferta').on('click' ,function(event) {
				
				$('.container').addClass('container_sleep');
							
				event.preventDefault();
				var index = $(this).closest('li').index();
				//console.log(index);
				
				$('#edit_oferta').html('<span class="section_title">Detalles oferta</span><div><form name="detalle_oferta" id="detalle_oferta" method="post" action="https://www.arcos.cl/app_test2/ofertas.php"><p>Título oferta</p><input type="text" name="titulo_oferta" id="titulo_oferta" placeholder="' + dataOferta[index].titulo_oferta + '"><p>Tipo de oferta</p><select name="tipo_oferta" id="tipo_oferta"><option selected disabled>Selecciona una opción</option><option value="practica">Práctica</option><option value="laboral">Laboral</option><option value="reemplazo">Reemplazo</option></select><p>Fecha de inicio</p><input type="date" name="inicio_oferta" id="inicio_oferta" placeholder="' + dataOferta[index].inicio_oferta + '"><p>Fecha de término</p><input type="date" name="fin_oferta" id="fin_oferta" placeholder="' + dataOferta[index].fin_oferta + '"><p>Descripción anuncio</p><textarea type="text" name="descripcion_oferta" placeholder="' + dataOferta[index].descripcion_oferta + '" rows="6" id="descripcion_oferta"></textarea><p>Requisitos de postulación</p><input type="text" name="requisitos_oferta" placeholder="' + dataOferta[index].requisitos_oferta + '" id="requisitos_oferta"><p>Sueldo</p><input type="number" name="sueldo_oferta" placeholder="' + dataOferta[index].sueldo_oferta + '" id="sueldo_oferta"><p>Cupos</p><select name="cupos_oferta" id="cupos_oferta"><option selected disabled>Selecciona una opción</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select><p>Dirigido a</p><select name="publico_oferta" id="publico_oferta"><option selected disabled>Selecciona una escuela / carrera</option><option value="foto">Fotografía</option><option value="cine">Cine y Audiovisual</option><option value="diseno">Diseño y Multimedia</option><option value="actu">Actuación</option><option value="sonido">Sonido y Música</option><option value="territorio">Territorio y Sustentabilidad</option></select></form></div><button type="submit" id="edit_on">Habilitar edición</button>');
				//$('#edit_oferta').addClass('editar_oferta');
				$('#edit_oferta').css({'left' : '0' , 'width' : '95%'});

				$('.container').addClass('container_sleep');
				//$('#container').css('opacity','.9');
				$('#detalle_oferta > *').prop('disabled',true);
				$('#detalle_oferta > :not(p)').css('background', '#eee');
				
				$('#edit_on').click(function(e){
					var editOn;
					e.preventDefault();
					if($('#detalle_oferta > *').prop('disabled') == true) {
						$('#detalle_oferta > *').prop('disabled',false);
						$('#detalle_oferta > :not(p)').css('background', '#fff');
						$(this).html('Volver');
						$(this).prop('type','reset');
						$('#detalle_oferta').append('<input type="submit" name="editar_oferta" value="Editar" id="editar_oferta"><input type="reset" value="Cancelar" id="cancelar_edit">');
					}
					
					else {
						$('#detalle_oferta > *').prop('disabled',true);
						$('#detalle_oferta > :not(p)').css('background', '#eee');
						$(this).html('Editar');
						$(this).prop('type','submit');
						$('#detalle_oferta')[0].reset();
						$('#edit_oferta').css('left' , '-100%');
						//$('#container').css('opacity','1');
						$('.container').removeClass('container_sleep');
						}
				}); // Fin #edit_on
				
				// Enviar datos edición
				$('#editar_oferta').click(function(e){
					e.preventDefault();
					//console.log(dataOferta[index]);
					var datosOferta = { 'id_oferta' : dataOferta[index].id_oferta, 'rut_usuario' : rut_usuario , 'titulo_oferta' : $('#detalle_oferta #titulo_oferta').val() , 'tipo_oferta' : $('#detalle_oferta #tipo_oferta').val() , 'inicio_oferta' : $('#detalle_oferta #inicio_oferta').val() , 'fin_oferta' : $('#detalle_oferta #fin_oferta').val() , 'descripcion_oferta' : $('#detalle_oferta #descripcion_oferta').val() , 'requisitos_oferta' : $('#detalle_oferta #requisitos_oferta').val() , 'sueldo_oferta' : $('#detalle_oferta #sueldo_oferta').val() , 'cupos_oferta' : $('#detalle_oferta #cupos_oferta').val() , 'publico_oferta' : $('#detalle_oferta #publico_oferta').val() , 'editar_oferta' : true }
					
					//console.log(datosOferta);
					
					$.post('https://www.arcos.cl/app_test2/ofertas.php',datosOferta,confirmarEdicion,'json');
					
					function confirmarEdicion(data) {
						//console.log(data.resp);
						
						//console.log(data[0].id_oferta);
						if(data.resp == 'success') {
							$('#edit_oferta').html('<span class="success" onClick="document.location.reload();">Oferta actualizada con éxito</span>');
							}
						
						
						} // Fin confirmarEdicion
						
					}); // Fin enviar datos edición

			}); // Fin Editar oferta
			

			// Ver postulaciones
			$('#lista_ofertas #postulaciones_oferta').on('click' ,function(event) {

				event.preventDefault();
				var index = $(this).closest('li').index();
				//console.log(index);
				//console.log(dataOferta[index].id_oferta);
				
				var datosOferta = {'id_oferta':dataOferta[index].id_oferta , 'rut_usuario':rut_usuario, 'buscar_postulaciones':true}
				
				$.post('https://www.arcos.cl/app_test2/ofertas.php',datosOferta,mostrarPostulaciones,'json');
				
				function mostrarPostulaciones(data) {
					//console.log(data);
					if(data.result != 'NoPostulaciones') {
					$('.container').addClass('container_sleep');
					$('#edit_oferta').html('<span class="section_title">Postulaciones oferta<br><b style="text-transform: uppercase">' + dataOferta[index].titulo_oferta + '</b></span><div><ul id="lista_postulaciones"></ul><div id="chat"></div></div><button type="reset" id="edit_on">Volver</button>');
					$('#edit_oferta').css({'left':'0' , 'width':'95%' , 'background':'#00b3e3'});
					
					$('#edit_oferta #edit_on').on('click',function(e){
						e.preventDefault;
						$('#edit_oferta').css('left' , '-100%');
						$('.container').removeClass('container_sleep');
					});
					
					for(let item of data) { // Listar postulaciones
						$('#lista_postulaciones').append('<li><div class="section_top"><div class="postulante"><h2 id="nombre_postulante">' + item.nombre_alumno + '</h2><p id="carrera_postulante">Carrera: ' + item.carrera_alumno + '</p></div></div></div><div id="info_postulante"><p><b>Comentarios:</b></p><p style="color:#888">' + item.comentario + '</p><div><p ontouchstart="cordova.InAppBrowser.open(\'http://www.portafolio.arcos.cl/\', \'_system\', \'location:yes\');\')" id="portafolio">Ver portafolio</p><p id="contacto">Contactar</p></div></div></li>');
						
						var activeHeight = $('#edit_oferta > div').height();
						//console.log(oldHeight);
						//$('#lista_postulaciones > li').height(oldHeight)
						
										
						} // Fin for
											
						var cont = -1;
						
						// Ver postulante (acordeon)
						$('#lista_postulaciones > li h2').on('click',verPostulante);
						function verPostulante(event){
							console.log(cont);
							cont *= -1;							
							if(cont == 1) {
								event.preventDefault();
								var index = $(this).closest('li').index();
								//console.log(data[index].carrera_alumno);
								$(this).closest('li').find('#info_postulante').fadeIn(500);
								//$(this).closest('li').height(activeHeight);
								//$('#portafolio').on('click',function(){$(document).});
								$('#portafolio').on('touchstart click',function(e){window.open('http://www.portafolio.arcos.cl/');});
								//console.log(index);
								var index = $(this).closest('li').index();
									
								} //Fin if cont
								
								else {
									var index = $(this).closest('li').index();
									$(this).closest('li').find('#info_postulante').fadeOut(500);
									//$(this).closest('li').height('50px');
									$('#chat').eq(index).html('');
									$('#chat').css('left','-100%');
									setTimeout(function(){
										$('#chat').html('');},500);
									}

									
							} // Fin verPostulante
							
							
							// Mensajería
								$('#lista_postulaciones #contacto').on('click',abrirChat);
								function abrirChat(e){
									//$('#lista_postulaciones').hide(500);
									var index = $(this).closest('li').index();	
									$('.section_title').html('Enviar mensaje a<br><b style="text-transform: uppercase">' + data[index].nombre_alumno) + '</b>';
									$('#chat').html('<form name="chat_form" id="chat_form"><textarea name="mensaje" id="mensaje" rows="10"></textarea><input type="submit" value="enviar" id="enviar_mensaje"><input type="reset" value="cancelar" id="cancelar"></form>');
									$('#chat').css('left','0');
									
									
									// Ocultar Chat
								$('#chat #cancelar').on('click',function(){
										$('.section_title').html('Postulaciones oferta<br><b style="text-transform: uppercase">' + dataOferta[index].titulo_oferta + '</b>')
										$('#chat').css('left','-100%');
										setTimeout(function(){
										$('#chat').html('');},500);
										//$('#lista_postulaciones').show(500);
									});
									
		
								} // Fin mensajeria

							
							/*$(document).mouseup(function(e){ // Ocultar Postulación
								var container = $("#info_postulante");
							
								if(!container.is(e.target) && container.has(e.target).length === 0){
									container.remove();
									$('#lista_postulaciones > li').height(oldHeight);
									}
							}); // Fin ocultar postulante*/
							
							
							/*$(document).not('#info_postulante').on('click',ocultarPostulante);
							function ocultarPostulante() {
								
								$('#info_postulante').hide();
								
								}*/ // Fin ocultarPostulante
					

					} // Fin IF postulaciones

				} // Fin mostrarPostulaciones
					
				
				
			}); // Fin ver postulaciones
			

			
		} // Fin else else NoOfertas
				
	} // Fin obtenerUsuario
	

// Anadir nueva oferta

	
	$('#anadir_oferta').submit(
		function(event) {
			
			event.preventDefault();
			
			console.clear();
						
			var datosOferta = { 'rut_usuario' : rut_usuario , 'titulo_oferta' : $('#anadir_oferta #titulo_oferta').val() , 'tipo_oferta' : $('#anadir_oferta #tipo_oferta').val() , 'inicio_oferta' : $('#anadir_oferta #inicio_oferta').val() , 'fin_oferta' : $('#anadir_oferta #fin_oferta').val() , 'descripcion_oferta' : $('#anadir_oferta #descripcion_oferta').val() , 'requisitos_oferta' : $('#anadir_oferta #requisitos_oferta').val() , 'sueldo_oferta' : $('#anadir_oferta #sueldo_oferta').val() , 'cupos_oferta' : $('#anadir_oferta #cupos_oferta').val() , 'publico_oferta' : $('#anadir_oferta #publico_oferta').val() , 'anadir_oferta' : true }
			
			$.post('https://www.arcos.cl/app_test2/ofertas.php', datosOferta, obtenerOfertas, 'json');
			return false;
	
	}); // Fin Añadir oferta 
	
	function obtenerOfertas(data) {		
		//console.log(data);
		
		if (data.resp == 'success') {
			$('#menu_more').html('<span class="success" onClick="document.location.reload();">Oferta creada con éxito</span>');
			}
		if (data.resp == 'failed') {
			$('#menu_more').html('<span>Ha ocurrido un error al crear la oferta. Por favor inténte más tarde.</span>');
			//console.log(data);
			//document.location.reload();
			}
		
	} // Fin obtenerOfertas
	
	
}); // Fin document.ready