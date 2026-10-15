/**
 * ============================================================================
 * CONTRATO DE INTEGRACIÓN - BUSCADOR (js/buscador.js)
 * ============================================================================
 * 
 * 1. Elemento contenedor:
 *    - Se integra dentro del contenedor con identificador `#controles`.
 * 
 * 2. Estado global (Lectura y Escritura):
 *    - Actualiza `filtros.texto` con el término introducido por el usuario.
 * 
 * 3. Funciones globales requeridas:
 *    - Invoca `aplicarFiltros()` ante cada evento 'input' para refrescar
 *      el contador (#contador) y la lista (#lista).
 * 
 * 4. Dependencias del ciclo de ejecución:
 *    - Requiere la carga previa de `js/app.js` (proveedor de `filtros` y `aplicarFiltros`).
 * 
 * 5. Flexibilidad de diseño (Placeholder y Estilos abiertos):
 *    - Placeholder: abierto a personalización mediante parámetro/opciones, con valor por defecto.
 *    - Estilos: abiertos a definición mediante clases CSS (.buscador-input) sin
 *      estilos inline restrictivos, facilitando el diseño desacoplado.
 * ============================================================================
 */

/**
 * Crea e inserta el campo de búsqueda en #controles conectándolo con el sistema de filtros.
 * Mantiene abiertos el placeholder y los estilos a través de opciones configurables.
 *
 * @param {Object} [opciones={}] Opciones para personalizar el buscador.
 * @param {string} [opciones.placeholder] Texto del placeholder (deja abierto el contenido descriptivo).
 * @param {string} [opciones.className] Clase CSS aplicada al input (deja abiertos los estilos para CSS).
 * @param {string} [opciones.id] Identificador del elemento input.
 * @param {string} [opciones.ariaLabel] Etiqueta accesible para lectores de pantalla.
 * @returns {HTMLInputElement|null} El elemento input creado o null si no existe #controles.
 */
function crearBuscador(opciones = {}) {
  const contenedor = document.getElementById("controles");
  if (!contenedor) {
    return null;
  }

  // Evita duplicación si se invoca más de una vez
  const idBuscador = opciones.id || "buscador";
  let input = document.getElementById(idBuscador);
  if (input) {
    return input;
  }

  input = document.createElement("input");
  input.type = "search";
  input.id = idBuscador;

  // Placeholder abierto (personalizable o con valor por defecto amplio)
  input.placeholder = opciones.placeholder !== undefined
    ? opciones.placeholder
    : "Buscar palabra o descripción...";

  // Estilos abiertos (clase CSS desacoplada para ser estilizada externamente)
  input.className = opciones.className !== undefined
    ? opciones.className
    : "buscador-input";

  input.setAttribute("aria-label", opciones.ariaLabel || "Buscar palabras reservadas");

  // Al escribir, actualiza filtros.texto y llama a aplicarFiltros()
  input.addEventListener("input", (evento) => {
    if (typeof filtros !== "undefined") {
      filtros.texto = evento.target.value;
    }

    if (typeof aplicarFiltros === "function") {
      aplicarFiltros();
    }
  });

  contenedor.appendChild(input);
  return input;
}

// Inicialización automática al cargar el DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => crearBuscador());
} else {
  crearBuscador();
}
