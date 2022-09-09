let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    sectionSeleccionarAtaque.style.display = 'none'  //Tosdos los elementos de html tienen una propiedad style donde por defecto ser guardan los estilos (como el color de la letra, los tamaños...)
    //Entonces, la seccion del html 'seleccionar_ataque' se ocultara cuando se ejecute la funcion iniciarJuego()

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById("boton_mascota")
    botonMascotaJugador.addEventListener("click", seleecionarMascotaJugador)

    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton_agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton_tierra")
    botonTierra.addEventListener("click", ataqueTierra)

    let botonReiniciar = document.getElementById('boton_reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleecionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    sectionSeleccionarAtaque.style.display = 'flex'

    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatagueya = document.getElementById("ratigueya")
    let spanMascotaJuador = document.getElementById("mascotaJugador")

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
    let spanMascotaEnemigo = document.getElementById("mascotaEnemigo")

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
    let spanVidasJugador = document.getElementById('vidasJugador')
    let spanVidasEnemigo = document.getElementById('vidasEnemigo')

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

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')

    //let parrafo = document.createElement('p')
    sectionMensajes.innerHTML = resultadoFinal

    //sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.disabled = true  //asi es como podemos agregar algun atributo a un elemento de HTML desde JS
    //estamos agregandio el atributo disabled, para que cada vez que se ejecute la funcion se desabilite el boton
    let botonAgua = document.getElementById("boton_agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton_tierra")
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'block'
}

function crearMensaje(resultado) {  //parametro
    let sectionMensajes = document.getElementById('resultado')   //traemos la seccion de nuestro HTML
    let ataquesDelJugador = document.getElementById('ataqueDelJugador')
    let ataquesDelEnemigo = document.getElementById('ataqueDelEnemigo')

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

function reiniciarJuego() {
    location.reload()   //el objeto location se refiere a la ruta de nuestra pagina y el metodo relooad lo que hace es que recarga la ruta de la pagina en la que estemos
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego);  //Con window podemos escuchar los eventos de la pagina en si
//le agregamos el evento de que al cargarse la pagina se ejecute la funcion iniciarJuego (asi, podemos ubicar la etiqueta script en nuestro HTML donde sea)