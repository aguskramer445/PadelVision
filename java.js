
// PADELVISION - JavaScript

// Seleccionamos las secciones que tendrán animaciones
let elementos = document.querySelectorAll(
    '.tarjeta, .persona, .institucion, .proyecto'
);

// Activamos las animaciones
elementos.forEach(function(elemento) {

    elemento.classList.add('revelar');

});

// Detectamos cuando los elementos aparecen en pantalla
let observador = new IntersectionObserver(function(entradas) {

    entradas.forEach(function(entrada) {

        if (entrada.isIntersecting) {

            entrada.target.classList.add('visible');

        }

    });

}, {
    threshold: 0.15
});

// Observamos cada elemento
elementos.forEach(function(elemento) {

    observador.observe(elemento);

});

// Actualizamos el año automáticamente
let pie = document.querySelector('footer p');

if (pie) {
    pie.innerHTML =
        "© " + new Date().getFullYear() +
        " PADELVISION | Instituto Visión Tecnológica";
}

console.log("PadelVision iniciado correctamente");
