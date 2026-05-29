# Documentación de `main.js`

## Descripción general

Este archivo contiene una calculadora básica en JavaScript con funciones aritméticas, trigonométricas, de logaritmo, de PI y factorial, además de la exportación CommonJS de todas las funciones.

## Funcionalidades

### Operaciones básicas

- `calcularSuma(a, b)`: devuelve la suma de dos números.
- `calcularResta(a, b)`: devuelve la resta de dos números.
- `calcularMultiplicacion(a, b)`: devuelve la multiplicación de dos números.

### Operaciones trigonométricas

- `calcularTrigonometricaSeno(angle)`: calcula el seno de un ángulo usando `Math.sin()`.
- `calcularTrigonometricaCoseno(angle)`: calcula el coseno de un ángulo usando `Math.cos()`.

### Operaciones avanzadas

- `calcularDivision(a, b)`: divide dos números y maneja el caso de división por cero devolviendo un mensaje de error.
- `calcularLogaritmoBase10(num)`: calcula el logaritmo base 10 y valida que el número sea mayor que cero.
- `obtenerPiConCincoDecimales()`: devuelve el valor de PI con 5 decimales.
- `calcularFactorial(n)`: calcula el factorial de un número y valida que no sea negativo.

## Exportación

Todas las funciones se exportan mediante CommonJS en el objeto `module.exports`.

## Ejemplo de uso

```javascript
const calculadora = require('./main');

calculadora.calcularSuma(2, 3); // 5
calculadora.calcularDivision(10, 0); // "Error: División por cero no permitida"
calculadora.calcularFactorial(5); // 120
```
