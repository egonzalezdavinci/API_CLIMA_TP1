const API_KEY = '015cb7ec61970f61ed29c3fef4976400';
const URL_SEARCH = 'https://api.openweathermap.org/data/2.5/weather';
let API_KEY_YOUTUBE = 'AIzaSyCp5iwALfr9OHxn81fj1e4_3V0G8GwUTmw';
let URL_YOUTUBE = 'https://www.googleapis.com/youtube/v3/videos?';

//const LENGUAGE = 'en';
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const button = document.getElementById('sendButton');
const inputPais = document.getElementById('searchPais');
const inputCiudad = document.getElementById('searchCiudad');
const unidadCelcius = '°C';
const unidadHumedad = '%';
const unidadPresion = 'hPa';
const unidadVel = 'm/s';
const msjCamposObligatorios = 'Los campos Datos son obligatorios.';
const msjBusquedaNoEncontrada = 'No encontramos tu busqueda.';

let resultadosDeclimaTem = document.getElementById('climaTemp');
let resultadosDeclimaDatos = document.getElementById('tableDatosClima');
let resultadosDeUbicacion = document.getElementById('zona');
let errorBusqueda = document.getElementById('errorSearch');
let contentMensaje = document.getElementById('msjVal');

let histPais;
let histCiudad;
let tengoHistoria = false;


if (localStorage.histPais && localStorage.histCiudad){
  histPais = JSON.parse(localStorage.histPais);
  histCiudad = JSON.parse(localStorage.histCiudad);
  buscaClima(histPais,histCiudad);
}


button.addEventListener("click", ()=>{
	const valorPais = inputPais.value;
	const valorCiudad = inputCiudad.value;
	if(!isNaN(valorPais) || !isNaN(valorCiudad)){
		console.log('error');
		errorBusqueda.className = 'errorSearch';
		contentMensaje.innerHTML = msjCamposObligatorios;

	}else{
		errorBusqueda.className = 'sinError';
		contentMensaje.innerHTML = '';
		buscaClima(valorPais,valorCiudad);
	}
});

function buscaClima(valorPais,valorCiudad){

	let a = `${URL_SEARCH}?q=${valorCiudad},${valorPais}&appid=${API_KEY}&units=metric`;
	console.log(a);	
	fetch(`${URL_SEARCH}?q=${valorCiudad},${valorPais}&appid=${API_KEY}&units=metric`)
	.then(function(response){
		return response.json();

	}).then(function(json){
		verClima(json);
		validaciondatos(valorPais,valorCiudad);
	}).then(function(){

	}).catch(function(err){
		nosPerdimos();
		console.log('pasate por aca');
	})

}

function verClima(json){
		let temperatura = json.main.temp;
			temperatura = Math.trunc(temperatura);
		let lat = json.coord.lat;
		let lon = json.coord.lon;
		let temperaturaMin = json.main.temp_min;
			temperaturaMin = Math.trunc(temperaturaMin);
		let temperaturaMax = json.main.temp_max;
			temperaturaMax = Math.trunc(temperaturaMax);
		let temperaturaHumedad = json.main.humidity;
		let temperaturaPresion = json.main.pressure;
		let sensacionTermica = json.main.feels_like;
			sensacionTermica = Math.trunc(sensacionTermica);
		let velViento = json.wind.speed;
		let ciudadJson = json.name;
		let paisJson = json.sys.country;
		let arrayTemperatura = json.weather;
		

		localStorage.latitud = JSON.stringify(lat);
		localStorage.longitud = JSON.stringify(lon);
		
		console.log('Temperatura: ', temperatura, unidadCelcius);
		console.log('minima: ', temperaturaMin);
		console.log('maxima: ', temperaturaMax);
		console.log('humedad: ', temperaturaHumedad);
		console.log('presion: ', temperaturaPresion);
		console.log('sensacion termica: ', sensacionTermica);
		
		resultadosDeUbicacion.innerHTML = `<h2 class="contentZonaCiudad">${ciudadJson}, ${paisJson}</h2>`;
		resultadosDeclimaDatos.innerHTML = `<ul>
				<li>Min: ${temperaturaMin} ${unidadCelcius}</li>
				<li>Max: ${temperaturaMax} ${unidadCelcius}</li>
				<li>Humedad: ${temperaturaHumedad} ${unidadHumedad}</li>
				<li>Presión: ${temperaturaPresion} ${unidadPresion}</li>
				<li>Termica: ${sensacionTermica} ${unidadCelcius}</li>
				<li>Velocidad del viento: ${velViento} ${unidadVel}</li>
			</ul>`;
		
		for(let i = 0; i < arrayTemperatura.length; i++){
			let iconoTemp = arrayTemperatura[i].icon;
			let iconoTempdescrition = arrayTemperatura[i].description;
			console.log('El icono es: ', iconoTemp);
			
		    //https://openweathermap.org/img/wn/01d@2x.png
			let mostrarImagen = `https://openweathermap.org/img/wn/${iconoTemp}@2x.png`;
			    resultadosDeclimaTem.innerHTML = `
				<img src="${mostrarImagen}" alt="${iconoTempdescrition}" />
				<p>${temperatura} ${unidadCelcius}</p>`;
		}
}

function nosPerdimos(){
		errorBusqueda.className = 'errorSearch';
		contentMensaje.innerHTML = msjBusquedaNoEncontrada;
};

function validaciondatos(valorPais,valorCiudad){
		errorBusqueda.className = 'sinError';
		contentMensaje.innerHTML = '';
		localStorage.histPais = JSON.stringify(valorPais);
		localStorage.histCiudad = JSON.stringify(valorCiudad);
		console.log('No hay error');
}