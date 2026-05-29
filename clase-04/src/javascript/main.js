// Caso 1: Generacion pasiva
// Escribo el nombre de la función que quiero que copilot me autocomplete
function calcularSuma(a, b) {
    // Copilot me sugiere el código para calcular la suma de a y b
    return a + b;
}
function calcularResta(a, b) {
    // Copilot me sugiere el código para calcular la resta de a y b
    return a - b;
}

function calcularMultiplicacion(a, b) {
    // Copilot me sugiere el código para calcular la multiplicación de a y b
    return a * b;
}

function calcularTrigonometricaSeno(angle) {
    // Copilot me sugiere el código para calcular el seno de un ángulo
    return Math.sin(angle);
}

function calcularTrigonometricaCoseno(angle) {
    // Copilot me sugiere el código para calcular el coseno de un ángulo
    return Math.cos(angle);
}

// Caso 2: Generación de código a partir de un comentario
// Estoy desarrollando una calculadra y quiero impleemtnar la funcion dividir, entonces escribo un comentario con la descripción de lo que quiero hacer y copilot me sugiere el código para implementarlo
// Función para dividir dos números, debe manejar el caso de división por cero
function calcularDivision(a, b) {
    if (b === 0) {
        return "Error: División por cero no permitida";
    }
    return a / b;
}

// Estoy desarrollando una calculara y quiero implementar la función que calcule el logaritmo en base 10 de un número.
// Función para calcular el logaritmo en base 10 de un número, debe manejar el caso de números negativos o cero
function calcularLogaritmoBase10(num) {
    if (num <= 0) {
        return "Error: El logaritmo no está definido para números negativos o cero";
    }
    return Math.log10(num);
}

// Caso 3: Utilizaición del chat inline (Ctrl + I)

function obtenerPiConCincoDecimales() {
    return parseFloat(Math.PI.toFixed(5));
}

// Caso 4: Generación de a partir de el chat (Ctrl + Shift + I)

// Función para calcular el factorial de un número, debe manejar el caso de números negativos
function calcularFactorial(n) {
    if (n < 0) {
        return "Error: El factorial no está definido para números negativos";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Exports CommonJS
module.exports = {
    calcularSuma,
    calcularResta,
    calcularMultiplicacion,
    calcularTrigonometricaSeno,
    calcularTrigonometricaCoseno,
    calcularDivision,
    calcularLogaritmoBase10,
    obtenerPiConCincoDecimales,
    calcularFactorial
};