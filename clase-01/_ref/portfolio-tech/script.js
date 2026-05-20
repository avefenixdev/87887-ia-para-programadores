
AOS.init({
    duration: 1000,
    once: true
});

// Menú mobile
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Swipers
for (let i = 1; i <= 4; i++) {
    new Swiper(`.proyectoSwiper${i}`, {
        loop: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        autoplay: {
            delay: 3000
        }
    });
}

// EmailJS
emailjs.init("TU_PUBLIC_KEY");

document.getElementById("contact-form")
.addEventListener("submit", function(e) {

    e.preventDefault();

    emailjs.sendForm(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        this
    )
    .then(() => {
        alert("Mensaje enviado correctamente");
        this.reset();
    })
    .catch(() => {
        alert("Error al enviar el mensaje");
    });
});
