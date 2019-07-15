// JavaScript Document


var checkMore = false;
var checkMenu = false;
var checkOnOff = false;

var app = {
	inicio: function() {
		this.iniciaBotones();
		this.iniciaFastClick();
		//this.iniciaHammer();
	},
	
	iniciaFastClick: function() {
		FastClick.attach(document.body);
	},
		
	iniciaBotones: function() {
		var botonMore = document.querySelector('#more').querySelector('p');
		var botonMenu = document.querySelectorAll('#menu');
		var botonContact = document.querySelector('#contactar');
		//var botonCancel = document.querySelector('#cancelar');
		var tipoOferta = document.getElementById('tipo_oferta');
		var inicioOferta = document.getElementById('inicio_oferta');
		var finOferta = document.getElementById('fin_oferta');
				
		if (botonMore) {
			botonMore.addEventListener('click',this.activarMore,false);
		}
		
		if (botonContact) {
			botonContact.addEventListener('click',this.activarMore,false);
		}
		
		/*if (botonCancel) {
			botonCancel.addEventListener('click',this.activarMore,false);
		}*/
		
		for (var i=0;i<botonMenu.length;i++) {
		botonMenu[i].addEventListener('click',this.activarMenu, false);
		}
		
		if (tipoOferta) {
			tipoOferta.addEventListener('change',this.fechaTermino,false);
		}
		
	},
		
	activarMore: function() {

		var menuMore = document.getElementById('menu_more');
		var more = document.getElementById('more').querySelector('p');
		var mainSection = document.querySelector('#main_section');
				
		if (checkMore == false) {
			menuMore.classList.add('more_active');
			if(more) {
			more.style.transform= 'rotate(45deg)';
			document.getElementById('more').classList.add('cerrar');
			//document.getElementById('no_ofertas').style.display= 'none';
			}
			mainSection.style = 'filter: blur(3px); -webkit-filter: blur(3px); opacity: .35';
			checkMore = true;
				}
		else {
			menuMore.classList.remove('more_active');
			if(more) {
			more.style.transform= 'rotate(0)';
			document.getElementById('more').classList.remove('cerrar');
			//document.getElementById('no_ofertas').style.display='table-cell';
			}
			mainSection.style = 'filter: blur(0); -webkit-filter: blur(0); opacity: 1';
			checkMore = false;
			}
	},
		
	activarMenu: function () {
		var container = document.getElementById('container');
		var menu = document.getElementById('page_menu');
			
		if (checkMenu==false) {
			container.classList.add('rotate');
			menu.classList.add('rotate_menu');
			menu.style = 'transition-delay: .25s';
			container.style = 'transition-delay: 0s';
			checkMenu = true;
			}
		else {
			container.classList.remove('rotate');
			menu.classList.remove('rotate_menu');
			menu.style = 'transition-delay: 0s';
			container.style = 'transition-delay: .25s';
			checkMenu = false;
			}			
		},
	
	
	fechaTermino: function () {
		var tipoOferta = document.getElementById('tipo_oferta').value;
		if (tipoOferta == 'laboral') {
			document.getElementById('fin_oferta').style.display = 'none';
		}
		
		else {
			document.getElementById('fin_oferta').style.display = 'block';
		}
		
		}
	};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded',function() {
		FastClick.attach(document.body);
		app.inicio();
		}, false);
	}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#homepage')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory();
       }
    }, false);
}


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
}