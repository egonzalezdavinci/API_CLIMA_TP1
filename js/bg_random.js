let inicioBg = document.getElementById('principal');
let fondo = Math.floor((Math.random() * 10) + 1);
console.log(fondo);

if(	fondo >= 6 && fondo <= 8){
	inicioBg.className= "body-container fondoUno";
} else if(fondo >= 1 && fondo <= 2){
	inicioBg.className= "body-container fondoDos";
} else if(fondo => 3 && fondo <= 5){
	inicioBg.className= "body-container fondoTres";
} else if(fondo >= 9){
	inicioBg.className = 'body-container fondoCuatro'; 
}