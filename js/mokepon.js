//const, el resultado de la variable no va a cambiar a lo largo de la ejecucion del codigo
const sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton_mascota")
const botonFuego = document.getElementById("boton_fuego")
const botonAgua = document.getElementById("boton_agua")
const botonTierra = document.getElementById("boton_tierra")
const botonReiniciar = document.getElementById('boton_reiniciar')

const sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
const inputHipodoge = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")
const inputRatagueya = document.getElementById("ratigueya")
const spanMascotaJuador = document.getElementById("mascotaJugador")

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")

const spanVidasJugador = document.getElementById('vidasJugador')
const spanVidasEnemigo = document.getElementById('vidasEnemigo')

const sectionMensajes = document.getElementById('resultado')   //traemos la seccion de nuestro HTML
const ataquesDelJugador = document.getElementById('ataqueDelJugador')
const ataquesDelEnemigo = document.getElementById('ataqueDelEnemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []  //Declaramos un array
//let, el valor de la variable puede cambiar a lo largo de la ejecucion del codigo
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {  //los nombres de las clases inician con mayuscula
    constructor(nombre, foto, vida) {   //propiedades que usaremos en nuestra clase
        this.nombre = nombre //this hace referencia a las propiedades que tenemos dentro de nuestra clase
        //Es como, el nombre del mokepon es el nombre del constructor
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", './assets/mokepons_mokepon_hipodoge_attack.webp', 5) //Asi creamos un objeto, instancia de una clase

let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 5)

let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 5)

hipodoge.ataques.push(  //Inyectando informacion cuando algun atributo de nuestra clase es un array
    { nombre: "💧", id: "boton_agua" }, //Objeto literal, solo almacena informacion (conveniente para casos como este)
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🌱", id: "boton_tierra" }
)

capipepo.ataques.push(
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" }
)

ratigueya.ataques.push(
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🌱", id: "boton_tierra" }
)

mokepones.push(hipodoge, capipepo, ratigueya)    //Inyecta el valor dentro del array, estamos enviando estas tres variables al array mokepoones

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'  //Tosdos los elementos de html tienen una propiedad style donde por defecto ser guardan los estilos (como el color de la letra, los tamaños...)
    //Entonces, la seccion del html 'seleccionar_ataque' se ocultara cuando se ejecute la funcion iniciarJuego()

    mokepones.forEach((mokepon) => {    //forEach nos permite hacer una accion recorriendo los elementos de un array, iterar por cada uno de los elementos existan dentro de un array
        //el parametro es basicamente la forma en que se llamara el objeto durante la ejecucion del foreach
        //por cada mokepon que existe en nuestro array de mokepones hara...
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
          <p>${mokepon.nombre}</p>
          <img
            src=${mokepon.foto}
            alt=${mokepon.nombre}
          />
        </label>
        `
        //opcionDeMokepones es la estructura que teniamos en HTML para crear una tarjeta de mokepon, ${} nos permite agregar un dato interactivo, es decir, los datos de nuestro mokepon
        contenedorTarjetas.innerHTML += opcionDeMokepones   //agregamos esta estructura al HTML, con el += nos aseguramos de que se agregue esta estructura por cada objeto de nuestra clase (sin el += solo se agregaria una vez esta estructura al HTML)
    })
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener("click", seleecionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleecionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    if (inputHipodoge.checked) {  //Mediante la propiedad checked podemos validar si algun input de tipo radio esta 'chuleado', entonces:
        //si el input hipodoge esta marcado, mostrara un...
        //alert("Seleccionaste a Hipodoge")
        spanMascotaJuador.innerHTML = "Hipodogue"   //Mediante innerHTML estamos manipulando el span que esta en nuestro HTML almacenado en una variable
        //Estamos escribiendo Hipodogue en el HTML
    } else if (inputCapipepo.checked) {
        //alert("Seleccionaste a Capipepo")
        spanMascotaJuador.innerHTML = "Capipepo"
    } else if (inputRatagueya.checked) {
        //alert("Seleccionaste a Ratigueya")
        spanMascotaJuador.innerHTML = "Ratigueya"
    }
    else {
        alert("Selecciona una mascota")
        sectionSeleccionarMascota.style.display = 'flex'
        sectionSeleccionarAtaque.style.display = 'none'
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3)
    if (mascotaAleatoria == 1) {
        //Hipodogue
        spanMascotaEnemigo.innerHTML = "Hipodogue"
    } else if (mascotaAleatoria == 2) {
        //Capipepo
        spanMascotaEnemigo.innerHTML = "Capipepo"
    }
    else {
        //Ratigueya
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(params) {
    ataqueEnemigo = aleatorio(1, 3);

    if (ataqueEnemigo == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueEnemigo == 2) {
        ataqueEnemigo = 'AGUA'
    }
    else {
        ataqueEnemigo = 'TIERRA'
    }
    combate();
}

function combate() {
    if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje(' - GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    } else if (ataqueJugador == ataqueEnemigo) {
        crearMensaje(' - EMPATE')
    }
    else {
        crearMensaje(' - PERDISTE')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONSE! Ganaste :)')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {  //parametro
    //let notificacion = document.createElement('p')
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    //let parrafo = document.createElement('p')    createElement nos permite crear un elemento en HTML, como argumento le pasamos el nombre de la etiqueta HTML que queremos crear 
    //parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ' , la mascota del enemigo atacó con ' + ataqueEnemigo + resultado

    //sectionMensajes.appendChild(notificacion) //Mediante appendChild podemos meter nuestro parrafo dentro de nuestra seccion en el HTML
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    //let parrafo = document.createElement('p')
    sectionMensajes.innerHTML = resultadoFinal

    //sectionMensajes.appendChild(parrafo)

    botonFuego.disabled = true  //asi es como podemos agregar algun atributo a un elemento de HTML desde JS
    //estamos agregandio el atributo disabled, para que cada vez que se ejecute la funcion se desabilite el boton

    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()   //el objeto location se refiere a la ruta de nuestra pagina y el metodo relooad lo que hace es que recarga la ruta de la pagina en la que estemos
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego);  //Con window podemos escuchar los eventos de la pagina en si
//le agregamos el evento de que al cargarse la pagina se ejecute la funcion iniciarJuego (asi, podemos ubicar la etiqueta script en nuestro HTML donde sea)