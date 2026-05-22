// =========================
// Navbar background on scroll
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(15, 23, 42, 0.98)";
  } else {
    header.style.background = "rgba(15, 23, 42, 0.9)";
  }
});

// =========================
// Simple form handling
// =========================

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Mensaje enviado correctamente.");

  form.reset();
});