# Clase 04 - IA para programadores

## DeepWiki
    - Generar toda la documentación desde un repo de GitHub
    - Funciona con proyectos que están ya subidos.
Ingresar a la página pegar el link del repositorio de GitHub en el input y esperar que generar la documentación.

<https://deepwiki.com/>

### Aporte de Gregorio

Documentación del portfolio personal usando DeepWiki

<https://deepwiki.com/GregoJung/portfolio/>

## DeepWiki Open
Herramienta Open Source para instalar local
    - Genera documentación a partir de repos privados

<https://github.com/AsyncFuncAI/deepwiki-open?tab=readme-ov-file>
<https://github.com/AsyncFuncAI/AsyncReview/>
<https://grok-wiki.com/> (MacOS)

# Groq
Es una empresa de tecnología que se dedica a construir hardware y servicios para acelerar los modelos de IA.

<https://groq.com/>

### Proyecto sencillo utilizando Colab

1. Entrar al Colab
2. Configurar el entorno eligiendo GPU T4
3. Instalar groq
4. Ejecutar el código

> Instalar dependencia

```sh
pip install groq
```

> Ejecutamos el código

```py
from groq import Groq

api_key = input("Ingrese su Api Key")
prompt = input("Ingrese su prompt")

client = Groq(api_key=api_key)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    model="groq/compound",
    stream=False,
)

print(chat_completion.choices[0].message.content)
```

## Agregando interfaz gráfica al proyecto anterior

<https://colab.research.google.com/drive/1Bdz6hlnXDSitfKKzZaLfmp_XksSBU4GY?usp=sharing>

> Instalar gradio

```sh
pip install gradio
```

```py
import gradio as gr
from groq import Groq

# Variable global para almacenar la API key del usuario
client = None

def set_api_key(api_key):
    global client
    try:
        client = Groq(api_key=api_key)
        return "✅ API Key configurada correctamente"
    except Exception as e:
        return f"❌ Error al configurar la API Key: {e}"

def chatbot_interface(message, history):
    if not client:
        return "⚠️ Primero debes ingresar tu API Key arriba.", history

    try:
        # Construye el historial en el formato requerido por la API
        messages = [{"role": "user" if i % 2 == 0 else "assistant", "content": m} for i, (m, _) in enumerate(history)]
        messages.append({"role": "user", "content": message})

        response = client.chat.completions.create(
            messages=messages,
            model="groq/compound",
            stream=False,
        )
        reply = response.choices[0].message.content
        history.append((message, reply))
        return "", history
    except Exception as e:
        return f"❌ Error al conectar con Groq: {e}", history


# UI de Gradio
with gr.Blocks(title="Groq Chatbot") as demo:
    gr.Markdown("## 🤖 Chatbot con Groq API (Modelo Kimi K2)")

    with gr.Row():
        api_input = gr.Textbox(label="🔑 Ingresá tu API Key", type="password")
        set_key_btn = gr.Button("Guardar API Key")
        status_output = gr.Textbox(label="Estado", interactive=False)

    set_key_btn.click(fn=set_api_key, inputs=api_input, outputs=status_output)

    chatbot = gr.Chatbot(label="Chat estilo ChatGPT")
    msg = gr.Textbox(label="Escribí tu mensaje")
    send_btn = gr.Button("Enviar")

    send_btn.click(fn=chatbot_interface, inputs=[msg, chatbot], outputs=[msg, chatbot])

demo.launch()
```

## IA para generación de imagenes

Herramienta para generar imagenes que permite generar una cierta cantidad de imagenes de forma gratuita por dia.

**Tip**:
    - En cualquier programa generador de imagenes se recomienda utilizar los prompts en ingles


* <https://designer.microsoft.com/>

```prompt
Friendly teacher surrounded by happy students, modern classroom, colorful flat illustration, education technology elements, laptops, coding on screens, smiling faces, clean banner composition, soft shadows, pastel colors, minimal background, space for headline text, high resolution, 16:9 cover image
```

* <https://leonardo.ai/>

```prompt
Create a thrilling and dynamic scene of skydivers in mid-air above a breathtaking landscape during golden hour, capturing the excitement, freedom, and adrenaline of skydiving. Include a diverse group of people in colorful jumpsuits and helmets, with clear skies, soft clouds, and the earth far below, emphasizing motion and exhilaration, cinematic lighting, high detail, realistic style, no text.
```  

Analisis de Requerimientos: Minutas de reuniones

### Herramientas para grabar reuniones y generar minutas

* <https://meetgeek.ai/es>
* <https://www.notta.ai/es>
* <https://otter.ai/>
* <https://tldv.io/es/>
* <https://tactiq.io/es>
* <https://read.ai>
* <https://grain.com/>

Estás herramientas tienen 2 modos de funcionamiento

* Cargar el video o el audio de la minuta o reunión para transcribirlo y generar notas
* Tomar las notas directamente de la reunión desde Meet, Webex, Zoom, Teams

### Extensión de chrome para transcribir y resumir videos

<https://chromewebstore.google.com/detail/youtube-transcript-summar/eelolnalmpdjemddgmpnmobdhnglfpje?hl=en&utm_source=ext_sidebar>

<https://videotranscriber.ai/>


