# Clase 02 - IA para programadores

# IAs

No son inteligentes en el sentido humano. No piensan. Repiten procesos estadisticos y probabilisticos muy rápidos.

1. Datos

Una IA se entrena con datos:

* Textos
* Imágenes
* Audios
* Números
* Videos

2. Modelos

Es una estrutuctura matemática (Muchas ecuaciones matemáticas conectadas entre si) Que calculan probabilidades

> Dado un texto, ¿Qué palabra es más probable que venga después?

3. Entrenamiento (aprende a base de errores)

a. Hace un predicción
b. Se equivoca
c. Calcula cuánto se equivoco
d. Ajusta números internos
e. Repite millones de veces

No razona. Optimiza

4. Uso

Una vez entredada:

* ya no 'aprende'
* solo aplica lo que ajustó
* responde según probabilidades, no vedad.

# Breve historia de la IA

### Etapas historicas

1950-1970 -> IA simbolica -> Basada en reglas lógicas y árboles de decisión.
1980-2010 -> Machine Learning clásico -> Algortimos que aprender patrones (SVM, árboles, regresión)
2010-2017 -> Deep Learning -> Redes neurolanes profundas para visión y voz.
2017-2025 -> Era de los transformers y LLMs -> Modelos gigantes que aprenden lenguaje y conocimiento del mundo.

# System Prompt

Es un prompt que voy a definir de antemano para pre configurar las respuesta del modelo LLMs (Marco mental) Una guía para orientar la respuesta y ajustar a la necesidad sin que se vuelvan tan dependiende de lo que nosotros le fuimos preguntando con anterioridad.

## Concepto de token

## ¿Qué puede ser un token?

* Una palabra completa (casa -> casa)
* Parte de una palabra (Programación -> pro + gra + ma + ción)
* Signo de putuación (. , !)
* Espacio
* Un emoji
* Un números

<https://developers.openai.com/api/docs/concepts#tokens>
<https://platform.openai.com/tokenizer>

## Conceptos matemáticos eseciales

### Estadistica y probabilidad

```py
import random

# Aprendizaje "mínimo": observar patrones
data = ["sol", "sol", "lluvia", "sol", "lluvia", "sol"]

# El modelo "aprende" cuántas veces aparece cada cosa
prob = {x: data.count(x)/len(data) for x in set(data)}

# Predicción: qué es más probable que ocurra
prediccion = max(prob, key=prob.get)
print(prob, "→ predicción:", prediccion)
```

### Algebra linea (base de redes neuronales)

```py
import numpy as np

# Entradas: horas de estudio y horas de sueño
x = np.array([5, 8])  

# Pesos: importancia de cada variable
w = np.array([0.7, 0.3])

# Resultado lineal (predicción)
y = np.dot(x, w)  # producto escalar
print("Predicción:", y)
```

### Qué es una red neuronal (conceptualmente)

```py
import numpy as np

def sigmoid(z): 
    return 1 / (1 + np.exp(-z))

x = np.array([0.6, 0.2])
w = np.array([0.8, 0.4])
b = 0.1  # sesgo

z = np.dot(x, w) + b
y = sigmoid(z)
print("Salida neuronal:", y)
```

> Neurona decide si "se activa" o no
Miles de estás forman una red que puede clasificar imagenes, traducir textos o detectar emociones.

### Que es un modelo y un dataset

* Dataset -> Conjuntos de datos para entrenar el modelo -> Fotos de gatos y perros con su etiquetas
* Modelo -> Estructura matematico que aprende de lo datos -> Red neuromal
* Entrenamiento -> Proceso de ajustar pesos para minizar el error -> Backpropagation
* Inferencias -> Uso del model para hacer predicciones nuevas -> Subir una foto de un gato -> Maxi es un gato.

# Alucionaciones (Guitarrea)
Ocurren cuando una IA responde con información falsa, inventada o incorrectaa, pero lol hace con total seguridad y coherencia aparente. No duda, no avisa, no se frena.

Las IA no saben, no entienden y no verifican la verdad.

* Predicen la siguiente palabra más probable.
* Basándose en patrones estadisticos
* Entrenadas con grandes volúmenes de texto (información)

# Creando presentaciones tipo Power Point con Gemini

NOTA: Elegir CANVA haciendo click en el +.

```prompt
Generame una presentación visual sobre las IAs más utilizadas en la actualidad. Con imagenes, iconos y diagramas.
```

<https://gemini.google.com/share/e0adbb8d2ed0>

> Compartido por Marco

* <https://gamma.app/>

# Agrupadores de IAs

## Ollama
Es un proyecto open source que permite correr modelos de lenguaje (LLMs)

<https://ollama.com/>

## Open Router

<https://openrouter.ai/>

# Interfaces gráficas
Nos permiten usar los modelos como si estuvieramos usando Chat GPT

* Open Web UI (conectarse con Ollama) <https://openwebui.com/>
    - <https://github.com/open-webui/open-webui>
* LMStudio (aplicación de escritorio) <https://lmstudio.ai/>



