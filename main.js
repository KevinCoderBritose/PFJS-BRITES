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
    operacionesGuardadas.push(operacion);
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
}

function mostrarOperacionesGuardadas() {
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones"));
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "<h2>Historial de Operaciones</h2>";
    if (operacionesGuardadas) {
        operacionesGuardadas.forEach((operacion, index) => {
            historialDiv.innerHTML += `<p>${operacion}</p>`;
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