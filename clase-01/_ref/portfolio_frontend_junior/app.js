// APPLICATION APP.JS - PORTFOLIO INTERACTIVO CON CARGA DINÁMICA & UX AVANZADA

// 1. ARRAY DE OBJETOS: Datos dinámicos de los proyectos (Cada uno con 5 placeholders de imágenes)
const proyectos = [
    {
        id: 1,
        titulo: "Plataforma E-Commerce Cyberpunk",
        descripcion: "Una tienda virtual interactiva con diseño futurista de alto impacto visual y checkout optimizado.",
        categoria: "E-Commerce / UI",
        imagenes: [
            "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&auto=format&fit=crop&q=60", // Main view
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60", // Product List
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60", // Analytics View
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60", // Checkout UI
            "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&auto=format&fit=crop&q=60"  // Success Screen
        ]
    },
    {
        id: 2,
        titulo: "Dashboard de Criptomonedas & Web3",
        descripcion: "Panel de control avanzado enfocado en visualización de datos financieros y métricas en tiempo real.",
        categoria: "Fintech / Dashboard",
        imagenes: [
            "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&auto=format&fit=crop&q=60", // Crypto overview
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60", // Wallet connect mockup
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60", // Custom Dark UI Graphs
            "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60", // Transactions history
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60"  // Settings modal UI
        ]
    },
    {
        id: 3,
        titulo: "SaaS Platform Control Panel",
        descripcion: "Herramienta corporativa modular para la automatización y gestión de flujos de trabajo empresariales.",
        categoria: "SaaS / SaaS Design",
        imagenes: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60", // Overview landing
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60", // Interface elements
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60", // UX wireframing presentation
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60", // User profile UI
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60"  // Team collaboration module
        ]
    }
];

// Variables globales para controlar el Carrusel Activo
let proyectoActivo = null;
let indiceImagenActiva = 0;

// 2. INICIALIZADOR: DOMContentLoaded para asegurar carga segura
document.addEventListener("DOMContentLoaded", () => {
    inicializarNavegacion();
    renderizarProyectos();
    inicializarModalCarrusel();
    inicializarFormularioContacto();
});

// Menú Mobile interactivo
function inicializarNavegacion() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Cerrar menú mobile al hacer clic en un enlace
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
}

// 3. RENDER DE TARJETAS: Inyección limpia en el Grid con clases de Tailwind avanzadas
function renderizarProyectos() {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = ""; // Limpiar placeholders estáticos

    proyectos.forEach(proyecto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all duration-300 flex flex-col h-full tech-glow cursor-pointer";
        
        // Estructura HTML interna optimizada para UX/UI (Efecto zoom en Hover)
        tarjeta.innerHTML = `
            <div class="relative aspect-video overflow-hidden bg-slate-950">
                <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100">
                <div class="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded text-xs text-blue-400 border border-slate-800 font-medium">
                    ${proyecto.categoria}
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/0 to-slate-950/0 opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div class="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h3 class="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-2">${proyecto.titulo}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">${proyecto.descripcion}</p>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs text-blue-400 font-medium gap-1 group-hover:gap-2 transition-all">
                    Ver imágenes del proyecto <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
            </div>
        `;

        // Al clickear la tarjeta, abre el modal carrusel con sus 5 imágenes
        tarjeta.addEventListener("click", () => abrirCarrusel(proyecto));
        grid.appendChild(tarjeta);
    });
}

// 4. LÓGICA COMPONENTE CARRUSEL MULTI-IMAGEN
function inicializarModalCarrusel() {
    const modal = document.getElementById("carousel-modal");
    const closeBtn = document.getElementById("close-modal");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");

    closeBtn.addEventListener("click", cerrarCarrusel);
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); cambiarImagen(-1); });
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); cambiarImagen(1); });
    
    // Cerrar si hace clic fuera del contenedor principal del modal
    modal.addEventListener("click", (e) => {
        if(e.target === modal) cerrarCarrusel();
    });

    // Accesibilidad mediante teclado (Esc, Flechas)
    document.addEventListener("keydown", (e) => {
        if (modal.classList.contains("hidden")) return;
        if (e.key === "Escape") cerrarCarrusel();
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "ArrowRight") cambiarImagen(1);
    });
}

function abrirCarrusel(proyecto) {
    proyectoActivo = proyecto;
    indiceImagenActiva = 0;

    document.getElementById("modal-project-title").textContent = proyecto.titulo;
    document.getElementById("modal-project-desc").textContent = proyecto.descripcion;

    // Renderizar los slides (las 5 imágenes)
    const slidesContainer = document.getElementById("carousel-slides");
    slidesContainer.innerHTML = "";
    
    proyecto.imagenes.forEach((imgUrl, index) => {
        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `${proyecto.titulo} - Imagen ${index + 1}`;
        img.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        img.dataset.index = index;
        slidesContainer.appendChild(img);
    });

    // Renderizar los indicadores de bolitas inferiores
    const indicatorsContainer = document.getElementById("carousel-indicators");
    indicatorsContainer.innerHTML = "";
    proyecto.imagenes.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `w-2 h-2 rounded-full transition-all ${index === 0 ? 'bg-blue-500 w-5' : 'bg-slate-600'}`;
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            irAImagen(index);
        });
        indicatorsContainer.appendChild(dot);
    });

    // Mostrar modal quitando la clase hidden
    document.getElementById("carousel-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Evitar scroll de fondo
}

function cerrarCarrusel() {
    document.getElementById("carousel-modal").classList.add("hidden");
    document.body.style.overflow = "auto"; // Rehabilitar scroll de fondo
    proyectoActivo = null;
}

function cambiarImagen(direccion) {
    if (!proyectoActivo) return;
    let nuevoIndice = indiceImagenActiva + direccion;
    
    // Efecto Loop Infinito para el carrusel
    if (nuevoIndice >= proyectoActivo.imagenes.length) nuevoIndice = 0;
    if (nuevoIndice < 0) nuevoIndice = proyectoActivo.imagenes.length - 1;
    
    irAImagen(nuevoIndice);
}

function irAImagen(nuevoIndice) {
    const slides = document.getElementById("carousel-slides").querySelectorAll("img");
    const dots = document.getElementById("carousel-indicators").querySelectorAll("button");

    slides[indiceImagenActiva].classList.replace("opacity-100", "opacity-0");
    slides[nuevoIndice].classList.replace("opacity-0", "opacity-100");

    // Actualizar indicador visual de la bolita activa
    dots[indiceImagenActiva].className = "w-2 h-2 rounded-full bg-slate-600 transition-all";
    dots[nuevoIndice].className = "w-2 h-2 rounded-full bg-blue-500 w-5 transition-all";

    indiceImagenActiva = nuevoIndice;
}

// 5. VALIDACIÓN AVANZADA DE INPUTS Y TOAST DE ÉXITO DE CONTACTO
function inicializarFormularioContacto() {
    const form = document.getElementById("contact-form");
    const toast = document.getElementById("toast-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Detener envío por defecto

        // Obtener valores limpios
        const inputs = {
            name: { el: document.getElementById("name"), errorEl: document.getElementById("error-name"), val: document.getElementById("name").value.trim() },
            email: { el: document.getElementById("email"), errorEl: document.getElementById("error-email"), val: document.getElementById("email").value.trim() },
            subject: { el: document.getElementById("subject"), errorEl: document.getElementById("error-subject"), val: document.getElementById("subject").value.trim() },
            message: { el: document.getElementById("message"), errorEl: document.getElementById("error-message"), val: document.getElementById("message").value.trim() }
        };

        let esValido = true;

        // Resetear estados de error previos
        Object.values(inputs).forEach(item => {
            item.el.classList.remove("border-red-500", "focus:border-red-500");
            item.el.classList.add("border-slate-800");
            item.errorEl.classList.add("hidden");
        });

        // Validación de Campo Nombre
        if (!inputs.name.val) {
            mostrarError(inputs.name, "El nombre es obligatorio.");
            esValido = false;
        }

        // Validación de Campo Correo con regex estándar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputs.email.val) {
            mostrarError(inputs.email, "El correo electrónico es obligatorio.");
            esValido = false;
        } else if (!emailRegex.test(inputs.email.val)) {
            mostrarError(inputs.email, "Por favor, ingresá un correo electrónico válido.");
            esValido = false;
        }

        // Validación de Asunto
        if (!inputs.subject.val) {
            mostrarError(inputs.subject, "El asunto es obligatorio.");
            esValido = false;
        }

        // Validación de Mensaje largo
        if (!inputs.message.val) {
            mostrarError(inputs.message, "El mensaje no puede estar vacío.");
            esValido = false;
        } else if (inputs.message.val.length < 10) {
            mostrarError(inputs.message, "El mensaje debe tener al menos 10 caracteres por razones de UX.");
            esValido = false;
        }

        // Si pasa todas las validaciones simulamos el éxito
        if (esValido) {
            toast.classList.remove("hidden");
            form.reset(); // Limpiar el formulario para nuevos ingresos
            
            // Auto ocultar cartel de éxito a los 5 segundos
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 5000);
            
            // Scroll suave hacia la alerta para mejorar la UX
            toast.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

function mostrarError(campoObj, mensaje) {
    campoObj.el.classList.remove("border-slate-800");
    campoObj.el.classList.add("border-red-500", "focus:border-red-500");
    campoObj.errorEl.textContent = mensaje;
    campoObj.errorEl.classList.remove("hidden");
}
