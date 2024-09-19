import { palabraSecreta } from './juego.js';

export function mostrarMensajeVictoria() {
    alert("¡Ganaste! La palabra era: " + palabraSecreta);
}

export function mostrarMensajeDerrota() {
    alert("¡Perdiste! La palabra era: " + palabraSecreta);
}