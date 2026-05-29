const test = require('node:test');
const assert = require('node:assert/strict');

const calculadora = require('./main');

test('calcularSuma suma correctamente dos números', () => {
    assert.strictEqual(calculadora.calcularSuma(2, 3), 5);
});

test('calcularResta resta correctamente dos números', () => {
    assert.strictEqual(calculadora.calcularResta(10, 4), 6);
});

test('calcularMultiplicacion multiplica correctamente dos números', () => {
    assert.strictEqual(calculadora.calcularMultiplicacion(6, 7), 42);
});

test('calcularTrigonometricaSeno calcula el seno', () => {
    assert.ok(Math.abs(calculadora.calcularTrigonometricaSeno(Math.PI / 2) - 1) < 1e-12);
});

test('calcularTrigonometricaCoseno calcula el coseno', () => {
    assert.ok(Math.abs(calculadora.calcularTrigonometricaCoseno(Math.PI) + 1) < 1e-12);
});

test('calcularDivision divide correctamente', () => {
    assert.strictEqual(calculadora.calcularDivision(8, 2), 4);
});

test('calcularDivision maneja división por cero', () => {
    assert.strictEqual(calculadora.calcularDivision(8, 0), 'Error: División por cero no permitida');
});

test('calcularLogaritmoBase10 calcula el logaritmo base 10', () => {
    assert.strictEqual(calculadora.calcularLogaritmoBase10(1000), 3);
});

test('calcularLogaritmoBase10 maneja valores no válidos', () => {
    assert.strictEqual(calculadora.calcularLogaritmoBase10(0), 'Error: El logaritmo no está definido para números negativos o cero');
});

test('obtenerPiConCincoDecimales devuelve PI con cinco decimales', () => {
    assert.strictEqual(calculadora.obtenerPiConCincoDecimales(), 3.14159);
});

test('calcularFactorial calcula el factorial de un número positivo', () => {
    assert.strictEqual(calculadora.calcularFactorial(5), 120);
});

test('calcularFactorial devuelve 1 para 0 y 1', () => {
    assert.strictEqual(calculadora.calcularFactorial(0), 1);
    assert.strictEqual(calculadora.calcularFactorial(1), 1);
});

test('calcularFactorial maneja números negativos', () => {
    assert.strictEqual(calculadora.calcularFactorial(-3), 'Error: El factorial no está definido para números negativos');
});
