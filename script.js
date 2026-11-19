
/* ==========================================
   MENÚ DE NAVEGACIÓN
========================================== */

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

  menuToggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");

    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = abierto ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      menu.classList.remove("abierto");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

}


/* ==========================================
   CARRUSEL AUTOMÁTICO
========================================== */

const carrusel = document.querySelector(".carrusel");

if (carrusel) {

  const slides = carrusel.querySelectorAll(".carrusel-slide");
  const puntos = carrusel.querySelectorAll(".carrusel-puntos .punto");
  const anterior = carrusel.querySelector(".anterior");
  const siguiente = carrusel.querySelector(".siguiente");

  let imagenActual = 0;
  let temporizador;
  let limpiezaAnimacion;

  function mostrarImagen(numero) {

    if (slides.length === 0) return;

    const nuevoIndice = (numero + slides.length) % slides.length;

    if (nuevoIndice === imagenActual) {
      reiniciarCarrusel();
      return;
    }

    const imagenAnterior = slides[imagenActual];

    slides.forEach((slide) => {
      slide.classList.remove("saliendo");
    });

    imagenAnterior.classList.remove("activo");
    imagenAnterior.classList.add("saliendo");

    imagenActual = nuevoIndice;

    slides[imagenActual].classList.add("activo");

    puntos.forEach((punto, indice) => {
      punto.classList.toggle(
        "seleccionado",
        indice === imagenActual
      );
    });

    clearTimeout(limpiezaAnimacion);

    limpiezaAnimacion = setTimeout(() => {
      imagenAnterior.classList.remove("saliendo");
    }, 750);

    reiniciarCarrusel();
  }


  function reiniciarCarrusel() {

    clearInterval(temporizador);

    temporizador = setInterval(() => {
      mostrarImagen(imagenActual + 1);
    }, 5000);

  }


  if (siguiente) {
    siguiente.addEventListener("click", () => {
      mostrarImagen(imagenActual + 1);
    });
  }

  if (anterior) {
    anterior.addEventListener("click", () => {
      mostrarImagen(imagenActual - 1);
    });
  }

  puntos.forEach((punto, indice) => {
    punto.addEventListener("click", () => {
      mostrarImagen(indice);
    });
  });

  if (slides.length > 0) {
    slides.forEach((slide, indice) => {
      slide.classList.toggle("activo", indice === 0);
    });

    puntos.forEach((punto, indice) => {
      punto.classList.toggle("seleccionado", indice === 0);
    });

    reiniciarCarrusel();
  }

}


/* ==========================================
   FUEGOS ARTIFICIALES PROM 2026
========================================== */

function lanzarFuegos(contenedor, cantidad) {

  if (!contenedor) return;

  const colores = [
    "#FFD700",
    "#FF5733",
    "#00E5FF",
    "#FF69B4",
    "#FFFFFF",
    "#7CFC00"
  ];

  for (let i = 0; i < cantidad; i++) {

    const chispa = document.createElement("span");

    chispa.className = "chispa";

    const angulo = Math.random() * Math.PI * 2;
    const distancia = 70 + Math.random() * 180;

    chispa.style.setProperty(
      "--x",
      `${Math.cos(angulo) * distancia}px`
    );

    chispa.style.setProperty(
      "--y",
      `${Math.sin(angulo) * distancia}px`
    );

    chispa.style.setProperty(
      "--color",
      colores[Math.floor(Math.random() * colores.length)]
    );

    contenedor.appendChild(chispa);

  }

}


/* ==========================================
   BIENVENIDA PROM 2026
========================================== */

const inicio = document.getElementById("promAnimacion");

if (inicio) {

  setTimeout(() => {

    lanzarFuegos(
      document.getElementById("fuegos"),
      80
    );

  }, 2000);

}
