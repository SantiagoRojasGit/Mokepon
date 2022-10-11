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

const sectionVerMapa = document.getElementById('verMapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let mokepones = []  //Declaramos un array
let mokeponesEnemigos = []
//let, el valor de la variable puede cambiar a lo largo de la ejecucion del codigo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge, inputCapipepo, inputRatagueya  //Inicializamos las variables, el valor lo asignaremos mas adelante
let botonFuego, botonAgua, botonTierra
let lienzo = mapa.getContext('2d')  //El lienzo es la forma en la que definimos el contexto en el que dibujaremos dentro de nuestro canvas
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaBuscada
let anchoMapa = window.innerWidth - 20 //innerWidth es un metodo del window que nos trae el ancho completo de nuestra pantalla (le restamos 20 para dar margenes)
const anchoMaximoMapa = 350

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20
}

alturaBuscada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaBuscada

class Mokepon {  //los nombres de las clases inician con mayuscula
    constructor(nombre, foto, vida, fotoMapa, /*x = 10, y = 10*/ id = null) {   //propiedades que usaremos en nuestra clase
        this.id = id
        this.nombre = nombre //this hace referencia a las propiedades que tenemos dentro de nuestra clase
        //Es como, el nombre del mokepon es el nombre del constructor
        this.foto = foto
        this.vida = vida
        this.ataques = []

        //variables para usar con canvas
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)  //El mokepon se ubicara aleatoriamente entre el punto 0 y el ancho del mapa menos el ancho del mokepon
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(   //drawImage nos permite imprimir una imagen dentro del canvas, parametros (imagenSource, posicionX, posicionY, ancho, alto)
            this.mapaFoto,  //this porque usamos los atributos del objeto
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png') //Asi creamos un objeto, instancia de una clase

let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 5, './assets/capipepo.png')

let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 5, './assets/ratigueya.png')

const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🌱", id: "boton_tierra" }
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES  //los ... hacen que en vez de almacenar una lista como tal, hace una simulacion como si literalmente hubiesemos escrito lo que esta dentro de la lista
    /*
    //Inyectando informacion cuando algun atributo de nuestra clase es un array
    { nombre: "💧", id: "boton_agua" }, //Objeto literal, solo almacena informacion (conveniente para casos como este)
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🌱", id: "boton_tierra" }
    */
)
/*
hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🌱", id: "boton_tierra" }
)*/

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" }
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES
    /*
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" }
    */
)

/*
capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "🌱", id: "boton_tierra" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🔥", id: "boton_fuego" }
)*/

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🌱", id: "boton_tierra" }
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES
    /*
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🌱", id: "boton_tierra" }
    */
)

/*
ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "🔥", id: "boton_fuego" },
    { nombre: "💧", id: "boton_agua" },
    { nombre: "🌱", id: "boton_tierra" }
)*/

mokepones.push(hipodoge, capipepo, ratigueya)    //Inyecta el valor dentro del array, estamos enviando estas tres variables al array mokepoones

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'  //Tosdos los elementos de html tienen una propiedad style donde por defecto ser guardan los estilos (como el color de la letra, los tamaños...)
    //Entonces, la seccion del html 'seleccionar_ataque' se ocultara cuando se ejecute la funcion iniciarJuego()
    sectionVerMapa.style.display = 'none'

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")//fetch nos permite realizar llamadas hacia otros servicios mediante HTTP
        //En este caso realiza una llamada get por defecto

        .then(function (res) {  //es una propiedad que tiene todas las peticiones asincronas, es lo que se ejecutara cuando se resuelva la respuesta del servidor (cuando cargue el servidor)
            if (res.ok) {   //Si la peticion es correcta entonces...
                res.text()  //.text porque lo que esperamos es un texto del node que seria el id
                    .then(function (respuesta) {    //obtenemos la respuesta lista para ser utilizada
                        console.log(respuesta)
                        jugadorId = respuesta   //almacenamos la respuesta en una variable
                    })
            }
        })
}

function seleecionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'

    //traemos la imagen del mokepon
    //let imagenCapipepo = new Image()
    //imagenCapipepo.src = capipepo.foto

    //lienzo.fillRect(5, 14, 20, 40)  //fillRecto nos permite dibujar un rectangulo, parametros (valorX, valorY, ancho, alto)

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

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        //modificamos el fetch para que se convierta en tipo POST mediante un segundo parametro
        method: "post", //indicamos que el metodo esta peticion es de tipo POST
        headers: {  //Indicamos que tipo de dato vamos a enviar al servidor
            "Content-Type": "application/json"  //Definimos el tipo de dato que estamos enviando, en este caso el valor estamos enviando un JSON
        },
        body: JSON.stringify({  //Es lo que envia nuestra peticion, convertimos el JSON en una cadena de texto
            mokepon: mascotaJugador //Enviamos al backet el nombre del mokepon
        })

        //No es necesario agregar un then ya que esta peticion no espera ninguna accion, simplemente envia informacion
    })
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
                boton.disabled = true   //Cuando se use el boton no se podra volver a clickear
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    //let mascotaAleatoria = aleatorio(0, mokepones.length - 1) //Modificamos esta variable para que segun la longitud o tamaño de nuestro array mokepones automaticamente tengamos el numero de mascotas (inicia en 0 ya que el indice de los arrays inicia en 0 y va hasta mokepones.lenght - 1 ya que realmente hay 3 mokepones, pero los indices van hasta el dos siendo entonces el rango final de 0 a 2)

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

    //spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre    //Entonces, nuestro span seria igual a nuestro array de mokepones en el indice generado por nuestra variable mascotaAleatoria
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    //ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    ataquesMokeponEnemigo = enemigo.ataques
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

function indexAmbosOponentes(jugador, enemigo) {    //Esta funcion guarda las elecciones del enemigo y el jugador
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function ataqueAleatorioEnemigo() {
    console.log(ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    /*
    if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == '🔥') {
        ataqueEnemigo.push('FUEGO')
    } else if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == '💧') {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    */

    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
        ataqueEnemigo.push('AGUA')
    }
    else {
        ataqueEnemigo.push('TIERRA')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
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
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
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
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal('Esto fue un Empate!!')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITACIONSE! Ganaste :)')
    } else {
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

    /*
    botonFuego.disabled = true  //asi es como podemos agregar algun atributo a un elemento de HTML desde JS
    //estamos agregandio el atributo disabled, para que cada vez que se ejecute la funcion se desabilite el boton

    botonAgua.disabled = true
    botonTierra.disabled = true
    */
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()   //el objeto location se refiere a la ruta de nuestra pagina y el metodo relooad lo que hace es que recarga la ruta de la pagina en la que estemos
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {    //La funcion crear el personaje dentro del canvas

    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height) //clearRect limpia el canvas, parametro (posicionInicialX, posicionInicialY, posicionFinalAncho, posicionFinalAlto) en la posicionFinalAncho pusimos el ancho de nuestro mapa e igual con el alto
    lienzo.drawImage(
        mapaBackground,
        0, 0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(mokepon => {
        mokepon.pintarMokepon()
    });
    /*
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.x != 0 || mascotaJugadorObjeto.y != 0) {   //se esta moviendo
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
    */
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,  //Asi le podemos decir a JS que usamos lo mismo como clave y valor, es decir eso es igual a...
            //x: x
            y
        })
    })

        .then(function (res) {
            if (res.ok) {
                //Si la peticion es correcta, leemos los datos
                res.json()
                    .then(function ({ enemigos }) {    //en los parametros extraimos directamente el valor de enemigos en nuestra respuesta
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(enemigo => {   //map funciona como forEach, la unica diferencia es que retorna una nueva lista que debemos almacenar
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge", './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.webp", 5, './assets/capipepo.png')
                            } else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.webp", 5, './assets/ratigueya.png')
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })
            }
        })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {   //muchas veces los eventListenners devuelven un evento, dandonos la informacion necesaria para hacer manejo de dicho evento
    switch (event.key) {    //evaluamos el valor de nuestro evento
        case "ArrowUp":
            moverArriba();
            break

        case "ArrowDown":
            moverAbajo();
            break

        case "ArrowRight":
            moverDerecha();
            break

        case "ArrowLeft":
            moverIzquierda();
            break
        default:
            break
    }
    //console.log(event.key);   mostrara el valor de la tecla que presionemos
}

function iniciarMapa() {
    /*
    mapa.width = 320
    mapa.height = 240
    */
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)    //setInterval es una funcion que llama a una funcion constantemente con un intervalo de tiempo entre llamado, parametros (funcionARepetir, tiempoEnMilisegundos) cada cuando ejecutara la funcion
    //Cada 50 milisegundos se ejecutara la funcion pintarCanvas

    window.addEventListener('keydown', teclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo) //Esta funcion hace que se detenga el ciclo en el que se ejecuta una funcion, en este caso detiene los intervalor de la variable intervalo
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    //alert("Hay colision " + enemigo.nombre)
}

window.addEventListener("load", iniciarJuego);  //Con window podemos escuchar los eventos de la pagina en si
//le agregamos el evento de que al cargarse la pagina se ejecute la funcion iniciarJuego (asi, podemos ubicar la etiqueta script en nuestro HTML donde sea)