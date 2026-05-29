**Respuesta completa**

A continuación tienes una explicación paso a paso y dos implementaciones (iterativa y recursiva) de una función que calcula el *n‑ésimo* número de Fibonacci en Python.

---

## 1. ¿Qué es la sucesión de Fibonacci?

- **Definición**  
  \[
  F(0)=0,\qquad F(1)=1,\qquad F(n)=F(n-1)+F(n-2)\;(n>1)
  \]

- Cada término es la suma de los dos anteriores.

---

## 2. Enfoques para calcularlo

| Enfoque      | Ventajas                              | Desventajas                         |
|--------------|---------------------------------------|-------------------------------------|
| **Recursivo**| Código muy simple y directo           | Complejidad exponencial \(O(2^n)\)  |
| **Iterativo**| Muy eficiente (lineal \(O(n)\) y \(O(1)\) espacio) | Un poco más de código |

Para la mayoría de los casos prácticos (especialmente cuando *n* es grande) se prefiere la versión **iterativa**.

---

## 3. Implementación iterativa (recomendada)

```python
def fibonacci_iterativo(n: int) -> int:
    """
    Calcula el n‑ésimo número de Fibonacci usando un algoritmo iterativo.

    Parámetros:
        n (int): índice del número de Fibonacci (n >= 0)

    Retorna:
        int: el n‑ésimo número de Fibonacci
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1

    a, b = 0, 1          # F(0), F(1)
    for _ in range(2, n + 1):
        a, b = b, a + b  # avanza a F(i-1), F(i)
    return b
```

**Ejemplo de uso**

```python
for i in range(11):
    print(f"F({i}) = {fibonacci_iterativo(i)}")
```

Salida:

```
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34
F(10) = 55
```

---

## 4. Implementación recursiva (para referencia)

```python
def fibonacci_recursivo(n: int) -> int:
    """
    Calcula el n‑ésimo número de Fibonacci usando recursión pura.
    No es eficiente para n grande (complejidad O(2^n)).
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_recursivo(n - 1) + fibonacci_recursivo(n - 2)
```

> **Nota:** Si deseas usar recursión pero con mejor rendimiento, puedes aplicar *memoization* (por ejemplo con `functools.lru_cache`).

---

## 5. Resumen

- La **versión iterativa** (`fibonacci_iterativo`) es la más adecuada para la mayoría de los casos porque:
  - Tiempo lineal \(O(n)\)
  - Uso constante de memoria \(O(1)\)
- La **versión recursiva** es útil para entender la definición matemática, pero se vuelve impráctica rápidamente al crecer *n*.

¡Listo! Con cualquiera de estas funciones puedes obtener el número de Fibonacci que necesites.