import { mostrarMensajeVictoria, mostrarMensajeDerrota } from './ui.js';

export let palabraSecreta;
let juegoTerminado = false;
let vidas = 6;
let letrasAdivinadas = [];
let palabraMostrada = "";
let tiempoInicio;
let tiempoTranscurrido = 0;
let intervalId;

export function iniciarJuego(palabra) {
    palabraSecreta = palabra.toLowerCase();
    letrasAdivinadas = [];
    palabraMostrada = "_".repeat(palabraSecreta.length);
    vidas = 6;
    tiempoInicio = Date.now();
    tiempoTranscurrido = 0;
    juegoTerminado = false; 

    actualizarPalabraMostrada();
    actualizarVidasMostradas();
    limpiarLetrasUsadas();
    habilitarInput();

    intervalId = setInterval(actualizarTiempo, 1000);
}


export function verificarLetra(letra) {
    if (juegoTerminado) return false;
    
    letra = letra.toLowerCase();

    if (letrasAdivinadas.includes(letra)) {
        return false;
    }

    letrasAdivinadas.push(letra);
    actualizarLetrasUsadas();

    if (palabraSecreta.includes(letra)) {
        actualizarPalabraMostrada();
        if (palabraMostrada === palabraSecreta) {
            finalizarJuego(true);
            return true;
        }
    } else {
        vidas--;
        actualizarVidasMostradas();
        if (vidas === 0) {
            finalizarJuego(false);
            return true;
        }
    }

    document.getElementById('letra').value = "";
    return false;
}

function finalizarJuego(esVictoria) {
    clearInterval(intervalId);
    juegoTerminado = true;
    deshabilitarInput();
    if (esVictoria) {
        mostrarMensajeVictoria();
    } else {
        mostrarMensajeDerrota();
    }
}

function actualizarTiempo() {
    tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    document.getElementById("tiempo").textContent = `Tiempo: ${tiempoTranscurrido} segundos`;
}

export function obtenerPuntuacion() {
    return vidas * 100 - tiempoTranscurrido;
}

export function obtenerTiempo() {
    return tiempoTranscurrido;
}

function actualizarPalabraMostrada() {
    palabraMostrada = palabraSecreta
        .split("")
        .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
        .join("");
    document.getElementById("palabra").textContent = palabraMostrada;
}

function actualizarVidasMostradas() {
    document.getElementById("vidas").textContent = `Vidas: ${vidas}`;
}

function actualizarLetrasUsadas() {
    document.getElementById("letrasUsadas").textContent = `Letras usadas: ${letrasAdivinadas.join(", ")}`;
}

function limpiarLetrasUsadas() {
    document.getElementById("letrasUsadas").textContent = "Letras usadas: ";
}

function habilitarInput() {
    document.getElementById("letra").disabled = false;
    document.getElementById("adivinar").disabled = false;
}

function deshabilitarInput() {
    document.getElementById("letra").disabled = true;
    document.getElementById("adivinar").disabled = true;
}

export function esJuegoTerminado() {
    return juegoTerminado;
}