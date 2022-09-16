//const, el valor de la variable no va a cambiar a lo largo de la ejecucion del codigo
const sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton_mascota")
const botonReiniciar = document.getElementById('boton_reiniciar')

const sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
const spanMascotaJuador = document.getElementById("mascotaJugador")

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")

const spanVidasJugador = document.getElementById('vidasJugador')
const spanVidasEnemigo = document.getElementById('vidasEnemigo')

const sectionMensajes = document.getElementById('resultado')   //traemos la seccion de nuestro HTML
const ataquesDelJugador = document.getElementById('ataqueDelJugador')
const ataquesDelEnemigo = document.getElementById('ataqueDelEnemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []  //Declaramos un array
//let, el valor de la variable puede cambiar a lo largo de la ejecucion del codigo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge, inputCapipepo, inputRatagueya  //Inicializamos las variables, el valor lo asignaremos mas adelante
let botonFuego, botonAgua, botonTierra
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
    inputHipodoge = document.getElementById("Hipodoge") //Asignamos un valor a las variables inicializadas en la linea 30 ya que hasta esta funcion existen esas variables dentro del HTML
    inputCapipepo = document.getElementById("Capipepo")
    inputRatagueya = document.getElementById("Ratigueya")

    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener("click", seleecionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleecionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {  //Mediante la propiedad checked podemos validar si algun input de tipo radio esta 'chuleado', entonces:
        //si el input hipodoge esta marcado, mostrara un...
        //alert("Seleccionaste a Hipodoge")
        spanMascotaJuador.innerHTML = inputHipodoge.id   //Mediante innerHTML estamos manipulando el span que esta en nuestro HTML almacenado en una variable
        mascotaJugador = inputHipodoge.id   //Almacenamos el nombre de la mascota dentro de esta varible para utilizarlo en otras funciones
        //Estamos escribiendo Hipodogue en el HTML
    } else if (inputCapipepo.checked) {
        //alert("Seleccionaste a Capipepo")
        spanMascotaJuador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatagueya.checked) {
        //alert("Seleccionaste a Ratigueya")
        spanMascotaJuador.innerHTML = inputRatagueya.id
        mascotaJugador = inputRatagueya.id
    }
    else {
        alert("Selecciona una mascota")
        sectionSeleccionarMascota.style.display = 'flex'
        sectionSeleccionarAtaque.style.display = 'none'
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {   //Funcion para extraer el ataque de una mascota automaticamente
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton_ataque BAtaque">${ataque.nombre}</button>
        `
        //                                              Las clases separadas por espacios seran interpretadas como clases diferentes
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton_fuego")
    botonAgua = document.getElementById("boton_agua")
    botonTierra = document.getElementById("boton_tierra")
    botones = document.querySelectorAll('.BAtaque') //Entonces, el arreglo almacenara todos lo elementos que tengan la calse BAtaque (Que en este caso serian todos los botones)
    //.querySelectorAll Selecciona todos los elementos que tengan algo, como una clase

    /*
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    */
}

function secuenciaAtaque() {
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {    //e es basicamente nuestro evento como tal que nos permitira acceder a las propidades del elemento al que le demos click (en este caso, a los botones a los que les demos click)
            if (e.target.textContent === '🔥') {    //Cuando la propiedad del elemento al que le hallamos dado click sea igual a... entonces...
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1) //Modificamos esta variable para que segun la longitud o tamaño de nuestro array mokepones automaticamente tengamos el numero de mascotas (inicia en 0 ya que el indice de los arrays inicia en 0 y va hasta mokepones.lenght - 1 ya que realmente hay 3 mokepones, pero los indices van hasta el dos siendo entonces el rango final de 0 a 2)

    /*
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
    */

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre    //Entonces, nuestro span seria igual a nuestro array de mokepones en el indice generado por nuestra variable mascotaAleatoria
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

/*
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
*/

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function ataqueAleatorioEnemigo() {
    ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
        ataqueEnemigo.push('AGUA')
    }
    else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATE')
        } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO' || ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            vidasEnemigo--
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
        } else {
            vidasJugador--
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
        }
    }
    /*
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
    }*/
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
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

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