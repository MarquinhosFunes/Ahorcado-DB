export async function obtenerPalabraAleatoria() {
    try {
        const response = await fetch('./js/data/palabras.json');
        const data = await response.json();
        const palabras = data.palabras;
        const indiceAleatorio = Math.floor(Math.random() * palabras.length);
        return palabras[indiceAleatorio];
    } catch (error) {
        throw new Error('Error al obtener palabras del archivo JSON');
    }
}