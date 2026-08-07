# 🌸 Regocijo Floristería — Proyecto Base Nuxt 3

Tienda online de ramos de flores artesanales construida con **Nuxt.js 3**, **Tailwind CSS** y **Pinia**.

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

---

## 📁 Estructura del proyecto

```
regocijo-detalles/
├── assets/
│   └── css/
│       └── tailwind.css        # Estilos globales + componentes utilitarios
│
├── layouts/
│   └── default.vue             # Layout principal (header + footer)
│
├── pages/
│   ├── index.vue               # Página de inicio (hero + destacados)
│   └── tienda.vue              # Catálogo con filtros por categoría
│
├── stores/
│   └── productos.ts            # Store de Pinia con 5 ramos hardcoded
│
├── app.vue                     # Raíz de la aplicación
├── nuxt.config.ts              # Configuración de Nuxt
├── tailwind.config.ts          # Paleta floral personalizada
└── package.json
```

---

## 🏪 Store de Pinia (`stores/productos.ts`)

### Estado
| Propiedad | Tipo | Descripción |
|---|---|---|
| `ramos` | `Ramo[]` | Array de 5 ramos hardcoded |
| `carritoItems` | `{ ramo, cantidad }[]` | Ítems en el carrito |
| `categoriaActiva` | `string` | Filtro de categoría activo |
| `busqueda` | `string` | Texto de búsqueda |

### Getters (computed)
- `ramosFiltrados` — Ramos según categoría y búsqueda activa
- `ramoDestacados` — Solo ramos con `destacado: true`
- `categorias` — Lista única de categorías + "Todos"
- `totalCarrito` — Suma total del carrito
- `cantidadCarrito` — Cantidad de ítems en carrito

### Actions
- `agregarAlCarrito(ramo)` — Añade o incrementa ítem
- `quitarDelCarrito(ramoId)` — Decrementa o elimina ítem
- `vaciarCarrito()` — Limpia el carrito
- `getRamoById(id)` — Busca ramo por ID
- `setCategoriaActiva(cat)` — Cambia filtro activo
- `formatPrecio(precio)` — Formatea precio en COP

---

## 🎨 Paleta de colores Tailwind

| Token | Uso |
|---|---|
| `petal-*` | Rosas y toques de acento principal |
| `sage-*` | Verdes sage para naturaleza y categorías especiales |
| `cream-*` | Ámbar cálido para detalles dorados |
| `blush` | Fondo rosado muy suave |
| `ivory` | Fondo principal blanco cálido |

---

## 🛠 Módulos instalados

| Módulo | Versión | Uso |
|---|---|---|
| `@nuxtjs/tailwindcss` | ^6.12 | Integración Tailwind CSS |
| `@pinia/nuxt` | ^0.5 | Integración Pinia para Nuxt 3 |
| `pinia` | ^2.2 | Gestión de estado |

---

## 📦 Próximos pasos sugeridos

- [ ] Crear página de detalle de producto `/tienda/[id].vue`
- [ ] Implementar sidebar/modal del carrito
- [ ] Añadir página `/contacto.vue` con formulario
- [ ] Conectar con backend / headless CMS (Strapi, Sanity, etc.)
- [ ] Añadir animaciones de entrada con `@vueuse/motion`
- [ ] Internacionalización con `@nuxtjs/i18n`
