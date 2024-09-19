import { obtenerPalabraAleatoria } from './api.js';
import { iniciarJuego, verificarLetra, obtenerPuntuacion, obtenerTiempo, esJuegoTerminado} from './juego.js';

obtenerPalabraAleatoria()
    .then(palabra => iniciarJuego(palabra))
    .catch(error => console.error("Error al obtener palabra:", error));

    document.getElementById('adivinar').addEventListener('click', () => {
        const letra = document.getElementById('letra').value.toLowerCase();
        const juegoFinalizado = verificarLetra(letra);
        
        if (juegoFinalizado) {
            mostrarFormularioPuntaje();
        }
    });

function mostrarFormularioPuntaje() {
    const puntuacion = obtenerPuntuacion();
    document.getElementById('puntuacion').textContent = puntuacion;
    document.getElementById('guardarPuntaje').style.display = 'block';
}

document.getElementById('guardar').addEventListener('click', () => {
    const nombre = document.getElementById('nombreJugador').value;
    const puntos = obtenerPuntuacion();
    const tiempo = obtenerTiempo();

    fetch('http://localhost:3000/guardar-puntaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, puntos, tiempo }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        obtenerTablaPosiciones();
    })
    .catch(error => console.error('Error:', error));
});

function obtenerTablaPosiciones() {
    if (!esJuegoTerminado()) return; // No actualizar la tabla si el juego no ha terminado
    
    fetch('http://localhost:3000/tabla-posiciones')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tablaPosiciones tbody');
            tbody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.nombre}</td>
                    <td>${row.puntos}</td>
                    <td>${row.tiempo}</td>
                    <td>${row.fecha}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a obtenerTablaPosiciones al cargar la página
window.addEventListener('load', obtenerTablaPosiciones);