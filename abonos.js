// Precios base
const PRECIOS = {
  general: 74.95,
  vip: 134.95,
};

// Cantidades seleccionadas
const cantidades = {
  general: 1,
  vip: 1,
};

// Actualiza el precio mostrado según la cantidad
function actualizarPrecio(tipo) {
  const cantidad = cantidades[tipo];
  const total = (PRECIOS[tipo] * cantidad).toFixed(2);
  document.querySelector(`#${tipo} .precio`).textContent = `${total}€`;
}

// Cambia la cantidad y actualiza el precio
function cambiarCantidad(tipo, delta) {
  const nueva = cantidades[tipo] + delta;
  if (nueva < 1 || nueva > 10) return;
  cantidades[tipo] = nueva;
  document.querySelector(`#${tipo} .cantidad-num`).textContent = nueva;
  actualizarPrecio(tipo);
}

// Abre el modal de compra
function abrirModal(tipo) {
  const modal = document.getElementById("modal-compra");
  const titulo = document.getElementById("modal-titulo");
  const hiddenTipo = document.getElementById("form-tipo");
  const hiddenCantidad = document.getElementById("form-cantidad");
  const resumen = document.getElementById("modal-resumen");

  const cantidad = cantidades[tipo];
  const total = (PRECIOS[tipo] * cantidad).toFixed(2);
  const nombreTipo = tipo === "general" ? "Abono General" : "Abono VIP";

  titulo.textContent = `Comprar ${nombreTipo}`;
  hiddenTipo.value = tipo;
  hiddenCantidad.value = cantidad;
  resumen.textContent = `${cantidad} x ${nombreTipo} = ${total}€`;

  // Limpiar formulario y mensajes previos
  document.getElementById("form-compra").reset();
  document.getElementById("form-exito").classList.add("oculto");
  document.getElementById("form-compra").classList.remove("oculto");

  modal.classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

// Cierra el modal
function cerrarModal() {
  document.getElementById("modal-compra").classList.add("oculto");
  document.getElementById("modal-contenido").classList.add("oculto");
  document.getElementById("modal-titulo").classList.add("oculto");
  document.getElementById("form-exito").classList.add("oculto");
  document.body.style.overflow = "";
}

// Valida el formulario y simula la compra
function procesarCompra(e) {
  e.preventDefault();

  const nombre = document.getElementById("input-nombre").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const telefono = document.getElementById("input-telefono").value.trim();

  // Limpiar errores previos
  document
    .querySelectorAll(".error-msg")
    .forEach((el) => (el.textContent = ""));

  let valido = true;

  if (nombre.length < 3) {
    document.getElementById("error-nombre").textContent =
      "Por favor, introduce tu nombre completo.";
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("error-email").textContent =
      "Introduce un email válido.";
    valido = false;
  }

  const telRegex = /^\d{9,15}$/;
  if (!telRegex.test(telefono.replace(/\s/g, ""))) {
    document.getElementById("error-telefono").textContent =
      "Introduce un teléfono válido (9-15 dígitos).";
    valido = false;
  }

  if (!valido) return;

  // Simular compra exitosa
  document.getElementById("form-compra").classList.add("oculto");
  document.getElementById("form-exito").classList.remove("oculto");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Botones de cantidad y comprar para cada tipo
  ["general", "vip"].forEach((tipo) => {
    const abono = document.getElementById(tipo);

    abono
      .querySelector(".btn-menos")
      .addEventListener("click", () => cambiarCantidad(tipo, -1));
    abono
      .querySelector(".btn-mas")
      .addEventListener("click", () => cambiarCantidad(tipo, 1));
    abono
      .querySelector("button.btn-comprar")
      .addEventListener("click", () => abrirModal(tipo));
  });

  // Cerrar modal
  document
    .getElementById("btn-cerrar-modal")
    .addEventListener("click", cerrarModal);
  document.getElementById("modal-compra").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-compra")) cerrarModal();
  });

  // Submit formulario
  document
    .getElementById("form-compra")
    .addEventListener("submit", procesarCompra);

  //Cerrar modal
  document
    .getElementById("btn-cerrar-exito")
    .addEventListener("click", cerrarModal);
});
