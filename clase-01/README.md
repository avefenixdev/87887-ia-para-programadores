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



```prompt
Actuá como un desarrollar front junior para desarrollar una página web para mostrar mis proyectos. Usando los lenguajes de programación html, css y js. Utilizar la librería Tailwind CSS.

Necesito una página web sencilla para mostrar mis proyectos. O sea una página tipo landingpage de portfolio. Que tenga 4 secciones. Inicio, trabajos, información personal y contacto. Generar un canva para ver como quedo. En html, css y js.
```