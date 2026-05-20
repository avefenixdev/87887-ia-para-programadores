# Clase 01 - IA para Programadores

## Roadmap de IA para Programadores

- Investigar cómo la IA va a transformar el diseño, la programación y la gestión de proyectos.
- Aprender a integrar herramientas de IA en nuestro flujo de trabajo para ser más eficientes y creativos.

### Prompt Engineering para Developers

- Desarrollo utilizando LLMs.
- Diseñar y utilizar prompts claros, testeables y reutilizables.
- Integrar modelos de lenguaje en el desarrollo del día a día.

### Diseño de Interfaces con IA

- Crear interfaces y prototipos visuales con modelos multimodales.
- Utilizar herramientas de IA para diseñar componentes y prototipos de pantallas.
- Potenciar el desarrollo y la creación de elementos gráficos.

### Creación de templates (scaffolding) para arrancar proyectos

- Generación inicial y automatica de tu proyecto con IA
- Carpetas, archivos base y código inicial para arrancar el proyecto
- Ganar velocidad y rapidez en el comienzo de un proyecto

# Contextos de los modelos LLMs

1. Contexto de mensaje actual.
2. Contexto de la conversación.
3. Contexto de proyecto.
4. Contexto Global.

# Artefactos (modales) en las IAs
Es la capacidad de la IA de generar una previsualización de lo que genera

```prompt
Necesito una página web sencilla para mostrar mis proyectos. O sea una página tipo landingpage de portfolio. Que tenga 4 secciones. Inicio, trabajos, información personal y contacto. Generar un canva para ver como quedo. En html, css y js.
```

> Ejemplos

* CHATGPT <https://chatgpt.com/share/6a0db58a-6c1c-83e9-91dd-5dd8d97ad944>
* GEMINI <https://gemini.google.com/share/8256d43d1959>
* CLAUDE <https://claude.ai/share/e493fd5b-87ef-46de-b0c4-13e117d8ec9c>

# ¿Qué es el prompt engineering?
Es la disciplina de diseñar instrucciones claras, completas y verificables para que una IA genere exactgamente lo que necesitás, sin suposiciones ni relleno innecesario.

## Template de Prompt (Para cualquier IA)

# 1 Rol de la IA (obligatorio)
Defini desde que lugar debe responser. Sin Rol = respuestas va a ser genéricas

```prompt
Actuá como [rol principal] 
Tenés experiencia [nivel/contexto]
Tu objetivo es [qué priorizar]
``` 

> Ejemplos

* desarrollar senior backend
* docente técnico para principantes
* arquitecto de software orientado a producción
* desarrollar frontend junior

# 2 Lenguaje, entorno y stack técnico
Tenemos que ser muy precisos incluir versión de la tecnología que se va a usar

```prompt
Lenguaje:
Framewor / Librerías
Versiones: 
Arquitectura esperada (si aplica)
```

> Ejemplos

* Lenguaje: Javascript
* Backend: Node.js 20 + Express
* Base de datos: MongoDB
* Estilos: Tailwind CSS

# 3 Objetivo principal (Medible y verificable)
Especificar claramente el objetivo principal que se persigue. Ejemplo de lo que NO: "Hacer un CRUD" No es un objetivo

```prompt
Quiero lograr:
[accion concreta]
[resultado observable]
[para qué se va usar]
```

> Ejemplo

* Quiero implementar un CRUD de productos que permita crear, listar, actualizar y eliminar productos, protegido con autenticación JWT par aun sistema administrativo

# 4 Contexto actual
Debemos decirle a la IA donde está parada.

```prompt
[Ya tengo implementado]:
- ...
[No tengo implementado]:
- ---
```

# 5 Restricciones y decisiones forzadas
Esto evita que las IAs supongan cosas.

```prompt
[Usar obligatoriamente]:
- ...
[Evitar completamente]
- ...
[Justificación de las restriciones (si aplica)]:
- ...
```

# 6 Reglas de calidad y criterios técnicos
Es fundamental para evitar respuesta no tan concretas basado en lo que espero y la calidad del código generado.

```prompt
El resultado debe:
- Seguir buenas prácticas
- Tener manejo de errores
- Ser escalable / productivo (aclarar)
- Evitar código inneceario o mágico
```

# 7 Formato de salida esperado
Si no le pido formato de salida la inteligencia lo supone. Decide por nosotros.

```prompt
Formato: 
- Código completo / fragmentos
- Expolicación breve / detallada
- Estructura de carpetas
- Ejemplo de uso
```

# 8 Nivel de detalle
Especifico con detalle el nivel de lo que necesito

```prompt
Nivel:
- Básico (para principiantes)
- Intermedio (explicar decisiones)
- Avanzado (asumir conocimientos previos)
```

# 9 Ejemplos de entrada y salida (Muy recomendable)
Le doy ejemplos que ajustan a la IA a cierta entrada y salida de datos

```prompt
Entrada de datos:
- ...
Salida de datos:
- ...
```

> Ejemplo
En un sistema de autenticación por JWT

* Tengo de entrada: correo y password
* Tengo de salida: token

# 10 Validaciones finales
Le pido a la AI que se autocorrija. Auto controle

```prompt
Antes de responder:
- Verificia coherencia
- Evita suposiciones
- Aclarar si algo no es posible
```

```prompt
Actuá como un desarrollar front junior para desarrollar una página web. Usando los lenguajes de programación html, css y js. Utilizar la librería Tailwind CSS. Para lograr mostrar mis proyectos. Debe incluir las siguientes apartados. Inicio, trabajos, información personal y contacto. Tengo 5 imagenes por proyecto para mostrar en el apartado trabajos. Usar Tailwind y evitar usar Bootstrap. Seguir buenas prácticas, utilizar lo último e diseño UX/UI. Generar en un archivo zip. El código separado por tecnología. O sea un archivo para html, otro para css y otra js. Nivel de detalle intermedio. Si consideras hacerme preguntas para evitar ambiguedades o suposiciones por favor realizalas.
```