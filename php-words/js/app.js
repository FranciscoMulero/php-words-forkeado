let filtros = { texto: "", categoria: "todas" };

function aplicarFiltros() {
  const lista = document.getElementById("lista");
  const contador = document.getElementById("contador");

  if (!lista || !contador || typeof PALABRAS === "undefined") {
    return;
  }

  const textoBusqueda = (filtros.texto || "").trim().toLowerCase();
  const categoriaSeleccionada = (filtros.categoria || "todas").toLowerCase();

  const filtradas = PALABRAS.filter((item) => {
    const coincideCategoria =
      categoriaSeleccionada === "todas" ||
      item.categoria.toLowerCase() === categoriaSeleccionada;

    const coincideTexto =
      !textoBusqueda ||
      item.palabra.toLowerCase().includes(textoBusqueda) ||
      item.descripcion.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideTexto;
  });

  contador.textContent = `Mostrando ${filtradas.length} de ${PALABRAS.length} palabras`;

  lista.innerHTML = "";

  if (filtradas.length === 0) {
    const liVacio = document.createElement("li");
    liVacio.className = "item-vacio";
    liVacio.innerHTML = `
      <div class="mensaje-vacio">
        <span class="icono-vacio">🔍</span>
        <p class="titulo-vacio">No se encontraron palabras</p>
        <p class="subtitulo-vacio">No hay resultados para los filtros actuales.</p>
      </div>
    `;
    lista.appendChild(liVacio);
    return;
  }

  filtradas.forEach((item) => {
    const li = document.createElement("li");
    li.className = `palabra-card categoria-${item.categoria.toLowerCase()}`;

    const cabecera = document.createElement("div");
    cabecera.className = "palabra-cabecera";

    const palabraElem = document.createElement("code");
    palabraElem.className = "palabra-nombre";
    palabraElem.textContent = item.palabra;

    const badge = document.createElement("span");
    badge.className = `badge badge-${item.categoria.toLowerCase()}`;
    badge.textContent = item.categoria;

    cabecera.appendChild(palabraElem);
    cabecera.appendChild(badge);

    const desc = document.createElement("p");
    desc.className = "palabra-descripcion";
    desc.textContent = item.descripcion;

    li.appendChild(cabecera);
    li.appendChild(desc);
    lista.appendChild(li);
  });
}

function inicializarApp() {
  const elTitulo = document.getElementById("titulo");
  const elSubtitulo = document.getElementById("subtitulo");
  const elVersion = document.getElementById("version");

  if (elTitulo && typeof APP_TITULO !== "undefined") {
    elTitulo.textContent = APP_TITULO;
  }
  if (elSubtitulo && typeof APP_SUBTITULO !== "undefined") {
    elSubtitulo.textContent = APP_SUBTITULO;
  }
  if (elVersion && typeof APP_VERSION !== "undefined") {
    elVersion.textContent = APP_VERSION;
  }

  aplicarFiltros();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarApp);
} else {
  inicializarApp();
}
