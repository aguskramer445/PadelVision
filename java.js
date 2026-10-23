const nombrePrueba = document.getElementById("nombrePrueba");
const estadoPrueba = document.getElementById("estadoPrueba");
const resultadoPrueba = document.getElementById("resultadoPrueba");
const listaPruebas = document.getElementById("listaPruebas");

function agregarPrueba() {
    const nombre = nombrePrueba.value.trim();
    const estado = estadoPrueba.value;
    const resultado = resultadoPrueba.value.trim();

    if (nombre === "" || resultado === "") {
        alert("Completá el nombre y el resultado de la prueba.");
        return;
    }

    const prueba = {
        nombre: nombre,
        estado: estado,
        resultado: resultado
    };

    const pruebas = JSON.parse(
        localStorage.getItem("padelvisionPruebas") || "[]"
    );

    pruebas.push(prueba);

    localStorage.setItem(
        "padelvisionPruebas",
        JSON.stringify(pruebas)
    );

    mostrarPruebas();

    nombrePrueba.value = "";
    resultadoPrueba.value = "";

    alert("La prueba se guardó correctamente.");
}

function mostrarPruebas() {
    const pruebas = JSON.parse(
        localStorage.getItem("padelvisionPruebas") || "[]"
    );

    listaPruebas.innerHTML = "";

    pruebas.forEach(function(prueba) {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        const celdaResultado = document.createElement("td");
        const celdaEstado = document.createElement("td");

        celdaNombre.textContent = prueba.nombre;
        celdaResultado.textContent = prueba.resultado;
        celdaEstado.textContent = prueba.estado;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaResultado);
        fila.appendChild(celdaEstado);

        listaPruebas.appendChild(fila);
    });
}

function actualizarProgreso() {
    const tareas = document.querySelectorAll(
        '#listaTareas input[type="checkbox"]'
    );

    let completadas = 0;

    tareas.forEach(function(tarea) {
        if (tarea.checked) {
            completadas++;
        }
    });

    let porcentaje = 0;

    if (tareas.length > 0) {
        porcentaje = Math.round(
            completadas / tareas.length * 100
        );
    }

    document.getElementById("porcentaje").textContent =
        porcentaje + "%";

    document.getElementById("barraProgreso").style.width =
        porcentaje + "%";

    const estados = [];

    tareas.forEach(function(tarea) {
        estados.push(tarea.checked);
    });

    localStorage.setItem(
        "padelvisionTareas",
        JSON.stringify(estados)
    );
}

function cargarTareas() {
    const tareas = document.querySelectorAll(
        '#listaTareas input[type="checkbox"]'
    );

    const estados = JSON.parse(
        localStorage.getItem("padelvisionTareas") || "null"
    );

    if (estados !== null) {
        tareas.forEach(function(tarea, indice) {
            tarea.checked = Boolean(estados[indice]);
        });
    }

    actualizarProgreso();
}

function exportarDatos() {
    const pruebas = JSON.parse(
        localStorage.getItem("padelvisionPruebas") || "[]"
    );

    const tareas = document.querySelectorAll(
        '#listaTareas input[type="checkbox"]'
    );

    const listaTareas = [];

    tareas.forEach(function(tarea) {
        listaTareas.push({
            tarea: tarea.parentElement.textContent.trim(),
            completada: tarea.checked
        });
    });

    const datos = {
        proyecto: "PadelVision",
        descripcion:
            "Sistema de Cámara VAR Automática para Pádel",
        integrantes: [
            "Agustín Kramer",
            "Camilo Yorgovan"
        ],
        curso: "6° Año IVT",
        fechaExportacion: new Date().toLocaleString("es-AR"),
        pruebas: pruebas,
        tareas: listaTareas
    };

    const archivo = new Blob(
        [JSON.stringify(datos, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");
    const url = URL.createObjectURL(archivo);

    enlace.href = url;
    enlace.download = "PadelVision_datos.json";
    enlace.click();

    URL.revokeObjectURL(url);
}

document.querySelectorAll(
    '#listaTareas input[type="checkbox"]'
).forEach(function(tarea) {
    tarea.addEventListener("change", actualizarProgreso);
});

mostrarPruebas();
cargarTareas();