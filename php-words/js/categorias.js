/**
 * ============================================================================
 * CONTRATO DE INTEGRACIÓN - CATEGORÍAS (js/categorias.js)
 * ============================================================================
 * 
 * 1. Elemento contenedor:
 *    - Se integra dentro del contenedor con identificador `#controles`.
 * 
 * 2. Estado global (Lectura y Escritura):
 *    - Actualiza `filtros.categoria` con la opción seleccionada por el usuario.
 * 
 * 3. Funciones globales requeridas:
 *    - Invoca `aplicarFiltros()` ante cada evento 'change' para refrescar
 *      el contador (#contador) y la lista (#lista).
 * 
 * 4. Dependencias del ciclo de ejecución:
 *    - Requiere la carga previa de `js/palabras.js` (proveedor de `PALABRAS`)
 *      y `js/app.js` (proveedor de `filtros` y `aplicarFiltros`).
 * 
 * 5. Opciones del desplegable:
 *    - Opción "todas" (para mostrar palabras de cualquier categoría).
 *    - Categorías únicas existentes en `PALABRAS`.
 * ============================================================================
 */

/**
 * Crea e inserta el desplegable de categorías en #controles conectándolo con el sistema de filtros.
 *
 * @param {Object} [opciones={}] Opciones de configuración.
 * @param {string} [opciones.id] Identificador del elemento select.
 * @param {string} [opciones.className] Clase CSS aplicada al select.
 * @param {string} [opciones.ariaLabel] Etiqueta accesible para lectores de pantalla.
 * @returns {HTMLSelectElement|null} El elemento select creado o null si no existe #controles.
 */
function crearSelectorCategorias(opciones = {}) {
  const contenedor = document.getElementById("controles");
  if (!contenedor) {
    return null;
  }

  // Evita duplicación si se invoca más de una vez
  const idSelector = opciones.id || "categorias";
  let select = document.getElementById(idSelector);
  if (select) {
    return select;
  }

  select = document.createElement("select");
  select.id = idSelector;
  select.className = opciones.className !== undefined
    ? opciones.className
    : "categorias-select";

  select.setAttribute("aria-label", opciones.ariaLabel || "Filtrar por categoría");

  // Opción "todas"
  const optTodas = document.createElement("option");
  optTodas.value = "todas";
  optTodas.textContent = "todas";
  optTodas.style.backgroundColor = "#111827";
  optTodas.style.color = "#f8fafc";
  select.appendChild(optTodas);

  // Categorías existentes dinámicas a partir de PALABRAS
  if (typeof PALABRAS !== "undefined" && Array.isArray(PALABRAS)) {
    const categorias = [...new Set(PALABRAS.map((item) => item && item.categoria).filter(Boolean))];
    categorias.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      opt.style.backgroundColor = "#111827";
      opt.style.color = "#f8fafc";
      select.appendChild(opt);
    });
  }

  // Sincroniza con el estado actual de filtros si ya estuviera definido
  if (typeof filtros !== "undefined" && filtros.categoria) {
    select.value = filtros.categoria;
  }

  // Al cambiar, actualiza filtros.categoria y llama a aplicarFiltros()
  select.addEventListener("change", (evento) => {
    if (typeof filtros !== "undefined") {
      filtros.categoria = evento.target.value;
    }

    if (typeof aplicarFiltros === "function") {
      aplicarFiltros();
    }
  });

  contenedor.appendChild(select);
  return select;
}

// Alias para compatibilidad de nomenclatura
const crearCategorias = crearSelectorCategorias;

// Inicialización automática al cargar el DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => crearSelectorCategorias());
} else {
  crearSelectorCategorias();
}
