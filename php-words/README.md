# PHP Words

Aplicación interactiva y ligera para consultar las palabras reservadas del lenguaje **PHP**. Desarrollada con estándares modernos de JavaScript vanilla (sin frameworks, sin módulos, sin librerías externas ni peticiones `fetch`), optimizada para abrirse directamente con doble clic en cualquier navegador web.

---

## Prueba dos

## 📁 Estructura del Proyecto, esta edicion es una prueba

```text
php-words/
├── index.html
├── README.md
├── css/
│   └── estilos.css
└── js/
    ├── config.js
    ├── palabras.js
    └── app.js
```

---

## 📄 Descripción de los Archivos

### 1. `index.html`
- **Estructura semántica:** Contiene los elementos requeridos con sus identificadores exactos:
  - `#titulo` (`h1`): Título de la aplicación.
  - `#subtitulo` (`p`): Descripción o subtítulo.
  - `#version` (`span`): Indicador de versión.
  - `#controles` (`div`): Contenedor vacío reservado para la inyección de futuros componentes interactivos.
  - `#contador` (`p`): Estado reactivo del total de palabras mostradas.
  - `#lista` (`ul`): Rejilla donde se renderizan las tarjetas de palabras.
- **Carga de scripts:** Al final del `<body>`, en orden estricto uno por línea:
  1. `js/config.js`
  2. `js/palabras.js`
  3. `js/app.js`

### 2. `js/config.js`
Define exactamente tres constantes globales en tres líneas individuales:
```javascript
const APP_TITULO = "PHP Words";
const APP_SUBTITULO = "Palabras reservadas de PHP";
const APP_VERSION = "0.1.0";
```

### 3. `js/palabras.js`
Define una única constante global `PALABRAS`, compuesta por un array de objetos (`palabra`, `categoria`, `descripcion`), con cada objeto ubicado en una sola línea.
- Incluye **38 palabras clave** distribuidas en 5 categorías oficiales:
  - `control`: `if`, `else`, `elseif`, `switch`, `match`, `while`, `for`, `foreach`, `return`, `break`, `continue`.
  - `funciones`: `function`, `fn`, `yield`, `array`, `list`.
  - `clases`: `class`, `interface`, `trait`, `extends`, `implements`, `abstract`, `final`, `readonly`, `public`, `private`, `protected`, `new`.
  - `excepciones`: `try`, `catch`, `finally`, `throw`.
  - `otros`: `echo`, `require`, `include`, `namespace`, `use`, `instanceof`.

### 4. `js/app.js`
- Define la variable global reactiva:
  ```javascript
  let filtros = { texto: "", categoria: "todas" };
  ```
- Implementa `aplicarFiltros()`, que evalúa los criterios de `filtros` sobre `PALABRAS`, actualiza el texto de `#contador` con el formato `"Mostrando N de M palabras"` y renderiza las tarjetas dinámicas en `#lista`.
- En la carga de la página, inicializa `#titulo`, `#subtitulo` y `#version` a partir de `config.js` y ejecuta `aplicarFiltros()`.

### 5. `css/estilos.css`
Diseño de alta gama construido siguiendo las pautas de **Apple Design** y **Emil Kowalski's Design Engineering**:
- **Glassmorphism y jerarquía de materiales:** Fondos translúcidos con `backdrop-filter: blur()`, bordes sutiles con iluminación superior (`border-top-shine`).
- **Respuesta táctil inmediata:** Estados `:active` con retroalimentación instantánea (`transform: scale(0.98)`).
- **Tipografía y espaciado:** Uso de fuentes del sistema con ajuste óptico (`letter-spacing: -0.035em` en encabezados grandes), números tabulares en contadores y tipografía monoespaciada para palabras clave.
- **Badges semánticos:** Colores diferenciados por categoría (ámbar para `control`, esmeralda para `funciones`, índigo para `clases`, rosa para `excepciones`, azul cielo para `otros`).
- **Accesibilidad:** Soporte completo para `@media (prefers-reduced-motion: reduce)`.

---

## 🧩 Modelo de Extensibilidad (Nuevas Funciones)

El proyecto sigue una arquitectura de extensión desacoplada:
1. **Nuevos archivos independientes:** Cada nueva funcionalidad (por ejemplo, barra de búsqueda, selector de categorías, ordenación, etc.) se entrega como un archivo nuevo en la carpeta `js/` (ej. `js/buscador.js`).
2. **Archivos existentes intocables:** No se modifican los archivos base (`config.js`, `palabras.js`, `app.js`).
3. **Puntos de integración:**
   - Lectura y modificación de `filtros`.
   - Invocación de `aplicarFiltros()`.
   - Consulta de datos en `PALABRAS`.
   - Montaje de interfaz dentro del elemento `#controles`.
4. **Activación:** Se añade manualmente la etiqueta `<script src="js/nueva-funcion.js"></script>` al final de `index.html`.

---

## 🚀 Cómo Ejecutar

No requiere Node.js, servidores web locales ni dependencias de npm:
1. Tambien puedes usar live server desde un IDE como VSCode.`.
2. Haz **doble clic en `index.html`** para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

Requiere un navegador moderno



prueba


### Mejora pequeña
Esta mejora es pequeña pero importante.