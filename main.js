function calcularResultado(operacion, numero1, numero2) {
    switch (operacion) {
        case "suma":
            return numero1 + numero2;
        case "resta":
            return numero1 - numero2;
        case "multiplicacion":
            return numero1 * numero2;
        case "division":
            return numero2 !== 0 ? numero1 / numero2 : "Error: División por cero";
        default:
            return "Operación no válida";
    }
}

function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `<p>Resultado: ${resultados}</p>`;
    }

function guardarOperacionEnStorage(operacion) {
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
    const fechaHoraActual = new Date().toLocaleString();
    operacionesGuardadas.push({ operacion: operacion, favorito: false, fecha: fechaHoraActual });
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

}

function borrarResultadoDelHistorial(index) {
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];

    if (index >= 0 && index < operacionesGuardadas.length) {
        if (!operacionesGuardadas[index].favorito) {
            operacionesGuardadas.splice(index, 1);
            localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
            mostrarOperacionesGuardadas();
        } else {
            console.error('No puedes borrar una operación favorita.');
        }
    } else {
        console.error('Índice de historial no válido.');
    }
}

function marcarComoFavorito(index) {
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];

    if (index >= 0 && index < operacionesGuardadas.length) {
        operacionesGuardadas[index].favorito = !operacionesGuardadas[index].favorito || false;
        localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
        mostrarOperacionesGuardadas();
    } else {
        console.error('Índice de historial no válido.');
    }
}

function mostrarOperacionesGuardadas() {
    const filtro = document.getElementById("filtroHistorial").value;
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "<h2>Historial de Operaciones</h2>";

    if (operacionesGuardadas.length > 0) {
        operacionesGuardadas.forEach((operacion, index) => {
            if ((filtro === "normales" && !operacion.favorito) || (filtro === "favoritas" && operacion.favorito) || filtro === "todos") {
                const favorito = operacion.favorito ? 'Desmarcar' : 'Marcar';
                const operacionHTML = `<p>
                    ${operacion.operacion} 
                    <br>Fecha y Hora: ${operacion.fecha || "No disponible"}
                    <button onclick="borrarResultadoDelHistorial(${index})" ${operacion.favorito ? 'disabled' : ''}>Borrar</button>
                    <button onclick="marcarComoFavorito(${index})">${favorito} como Favorito</button>
                    </p>`;
                historialDiv.innerHTML += operacionHTML;
            }
        });
    } else {
        historialDiv.innerHTML += "<p>No hay operaciones en el historial.</p>";
    }
}


function limpiarHistorial() {
    localStorage.removeItem("operaciones");
    mostrarOperacionesGuardadas();
}

function handleCalcular(operacion) {
    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);

    if (!isNaN(numero1) && !isNaN(numero2)) {
        const resultado = calcularResultado(operacion, numero1, numero2);
        const expresion = `${numero1} ${operacion === "suma" ? "+" : operacion === "resta" ? "-" : operacion === "multiplicacion" ? "*" : "/"} ${numero2} = ${resultado}`;
        mostrarResultados(resultado);
        guardarOperacionEnStorage(expresion);
        mostrarOperacionesGuardadas();
    } else {
        alert("Ingresa números válidos.");
    }
}




document.getElementById("calcularSuma").addEventListener("click", () => handleCalcular("suma"));
document.getElementById("calcularResta").addEventListener("click", () => handleCalcular("resta"));
document.getElementById("calcularMultiplicacion").addEventListener("click", () => handleCalcular("multiplicacion"));
document.getElementById("calcularDivision").addEventListener("click", () => handleCalcular("division"));
document.getElementById("limpiarHistorial").addEventListener("click", limpiarHistorial);

mostrarOperacionesGuardadas();