<template>
  <div>
    <!-- Cargando -->
    <div v-if="cargando" class="cargando" aria-busy="true"><span class="spinner" aria-hidden="true" /> Cargando…</div>

    <!-- No existe -->
    <div v-else-if="noExiste" class="errs" role="alert">
      No encontramos ese ramo. <NuxtLink to="/admin/ramos" class="link-inline">Volver a la lista</NuxtLink>
    </div>

    <form v-else novalidate class="ed" aria-labelledby="ed-t" @submit.prevent="guardar">
      <header class="ed-top">
        <div>
          <NuxtLink to="/admin/ramos" class="volver">← Volver a mis ramos</NuxtLink>
          <h1 id="ed-t" class="display ttl">{{ esNuevo ? 'Nuevo' : 'Editar' }} <em>ramo</em></h1>
        </div>
        <div class="ed-top-btns">
          <NuxtLink to="/admin/ramos" class="btn btn--ghost">Cancelar</NuxtLink>
          <button type="submit" class="btn btn--wine" :class="{ 'btn--loading': guardando }" :disabled="guardando" :aria-busy="guardando">
            <span v-if="guardando" class="spinner" aria-hidden="true" />
            {{ guardando ? 'Guardando…' : 'Guardar ramo' }}
          </button>
        </div>
      </header>

      <div v-if="resumen.length" ref="resumenEl" class="errs" role="alert" tabindex="-1">
        <p><strong>Revisa estos campos para poder guardar:</strong></p>
        <ul>
          <li v-for="e in resumen" :key="e.campo"><a :href="`#${e.campo}`" @click.prevent="enfocar(e.campo)">{{ e.mensaje }}</a></li>
        </ul>
      </div>

      <div class="ed-grid">
        <div class="ed-col">
          <!-- Datos básicos -->
          <section class="bloque" aria-labelledby="b-basico">
            <h2 id="b-basico" class="b-t">Datos del ramo</h2>

            <div class="field">
              <label class="field-label" for="f-nombre">Nombre <span aria-hidden="true">*</span></label>
              <input id="f-nombre" v-model="form.nombre" class="input" type="text" maxlength="120" required
                :aria-invalid="!!errores.nombre" :aria-describedby="errores.nombre ? 'e-nombre' : undefined" placeholder="Ej: Pasión Eterna" />
              <p v-if="errores.nombre" id="e-nombre" class="field-error">{{ errores.nombre }}</p>
            </div>

            <div class="field">
              <label class="field-label" for="f-categoria">Categoría <span aria-hidden="true">*</span></label>
              <div class="cat-row">
                <select id="f-categoria" v-model="form.categoria" class="input" required
                  :aria-invalid="!!errores.categoria" :aria-describedby="errores.categoria ? 'e-categoria' : undefined">
                  <option value="" disabled>Elige una categoría…</option>
                  <option v-for="c in categorias" :key="c.slug" :value="c.slug">{{ c.label }}</option>
                </select>
                <button type="button" class="btn btn--ghost btn--sm" @click="creandoCat = !creandoCat" :aria-expanded="creandoCat">+ Nueva categoría</button>
              </div>
              <div v-if="creandoCat" class="cat-nueva">
                <label class="sr-only" for="f-cat-nueva">Nombre de la nueva categoría</label>
                <input id="f-cat-nueva" v-model="catNueva" class="input" type="text" maxlength="40" placeholder="Ej: Tulipanes" @keydown.enter.prevent="crearCategoria" />
                <button type="button" class="btn btn--wine btn--sm" :disabled="creandoCatBusy" @click="crearCategoria">Crear y elegir</button>
              </div>
              <p v-if="errores.categoria" id="e-categoria" class="field-error">{{ errores.categoria }}</p>
            </div>

            <div class="field">
              <label class="field-label" for="f-descripcion">Descripción <span aria-hidden="true">*</span></label>
              <textarea id="f-descripcion" v-model="form.descripcion" class="input" rows="3" maxlength="2000" required
                :aria-invalid="!!errores.descripcion" :aria-describedby="errores.descripcion ? 'e-descripcion' : undefined"
                placeholder="Qué flores lleva, cómo es el diseño, colores…" />
              <p v-if="errores.descripcion" id="e-descripcion" class="field-error">{{ errores.descripcion }}</p>
            </div>

            <div class="field">
              <label class="field-label" for="f-detalle">Nota importante <span class="opt">(opcional)</span></label>
              <input id="f-detalle" v-model="form.detalle" class="input" type="text" maxlength="1000" placeholder="Ej: Dos colores de rosas a partir de las 40 unidades." />
              <p class="field-hint">Aparece resaltada debajo de la descripción.</p>
            </div>

            <div class="field">
              <label class="field-label" for="f-colores">Colores disponibles <span class="opt">(opcional)</span></label>
              <input id="f-colores" v-model="form.colores" class="input" type="text" maxlength="300" placeholder="Ej: El color que prefieras" />
            </div>
          </section>

          <!-- Precio -->
          <section class="bloque" aria-labelledby="b-precio">
            <h2 id="b-precio" class="b-t">Precio</h2>

            <fieldset class="field fs">
              <legend class="field-label">¿Cómo se vende?</legend>
              <div class="chips">
                <label class="chip-radio"><input v-model="form.modoPrecio" type="radio" value="unico" class="sr-only" /><span>Un solo precio</span></label>
                <label class="chip-radio"><input v-model="form.modoPrecio" type="radio" value="variantes" class="sr-only" /><span>Varias opciones (por cantidad o tamaño)</span></label>
              </div>
            </fieldset>

            <div v-if="form.modoPrecio === 'unico'" class="precio-unico">
              <div class="field">
                <label class="field-label" for="f-tamano">Tamaño</label>
                <select id="f-tamano" v-model="form.tamanoTexto" class="input">
                  <option value="">Sin indicar</option>
                  <option v-for="(g, k) in GUIA_TAMANOS" :key="k" :value="k">{{ k }} · {{ g.nombre }}</option>
                </select>
              </div>
              <div class="field">
                <label class="field-label" for="f-precio">Precio (COP) <span aria-hidden="true">*</span></label>
                <input id="f-precio" v-model="form.precioBase" class="input" type="number" inputmode="numeric" min="0" step="500"
                  :aria-invalid="!!errores.precio" :aria-describedby="errores.precio ? 'e-precio f-precio-h' : 'f-precio-h'" placeholder="150000" />
                <p id="f-precio-h" class="field-hint">{{ num(form.precioBase) ? formatPrecio(num(form.precioBase)!) : 'Solo números, sin puntos ni signo $.' }}</p>
                <p v-if="errores.precio" id="e-precio" class="field-error">{{ errores.precio }}</p>
              </div>
            </div>

            <div v-else class="variantes">
              <p class="field-hint">Ej: «20 rosas» a $80.000, «40 rosas» a $140.000… El sitio mostrará «Desde» el menor precio.</p>
              <div v-for="(v, i) in form.variantes" :key="i" class="var-fila" role="group" :aria-label="`Opción ${i + 1}`">
                <div class="field">
                  <label class="field-label" :for="`v-et-${i}`">Opción {{ i + 1 }}</label>
                  <input :id="`v-et-${i}`" v-model="v.etiqueta" class="input" type="text" maxlength="120" placeholder="Ej: 20 rosas" />
                </div>
                <div class="field">
                  <label class="field-label" :for="`v-ta-${i}`">Tamaño</label>
                  <select :id="`v-ta-${i}`" v-model="v.tamano" class="input">
                    <option v-for="(g, k) in GUIA_TAMANOS" :key="k" :value="k">{{ k }}</option>
                  </select>
                </div>
                <div class="field">
                  <label class="field-label" :for="`v-pr-${i}`">Precio (COP)</label>
                  <input :id="`v-pr-${i}`" v-model="v.precio" class="input" type="number" inputmode="numeric" min="0" step="500" placeholder="80000" />
                </div>
                <button type="button" class="quitar" :aria-label="`Quitar la opción ${i + 1}`" :disabled="form.variantes.length === 1" @click="form.variantes.splice(i, 1)">✕</button>
              </div>
              <p v-if="errores.variantes" id="e-variantes" class="field-error">{{ errores.variantes }}</p>
              <button type="button" class="btn btn--ghost btn--sm" @click="form.variantes.push({ etiqueta: '', tamano: 'M', precio: null })">+ Agregar otra opción</button>
            </div>
          </section>

          <!-- Qué incluye / opcionales -->
          <section class="bloque" aria-labelledby="b-extra">
            <h2 id="b-extra" class="b-t">Detalles extra <span class="opt">(opcional)</span></h2>

            <div class="lista-edit">
              <p class="field-label">Qué incluye</p>
              <p class="field-hint">Cosas que vienen con el ramo (chocolates, tarjeta, peluche…).</p>
              <div v-for="(_, i) in form.incluye" :key="i" class="item-fila">
                <label class="sr-only" :for="`inc-${i}`">Incluye {{ i + 1 }}</label>
                <input :id="`inc-${i}`" v-model="form.incluye[i]" class="input" type="text" maxlength="120" />
                <button type="button" class="quitar" :aria-label="`Quitar «incluye» ${i + 1}`" @click="form.incluye.splice(i, 1)">✕</button>
              </div>
              <button type="button" class="btn btn--ghost btn--sm" @click="form.incluye.push('')">+ Agregar</button>
            </div>

            <div class="lista-edit">
              <p class="field-label">Opcionales con costo</p>
              <p class="field-hint">Extras que el cliente puede añadir. Si no tienes el valor, déjalo vacío («valor por confirmar»).</p>
              <div v-for="(e, i) in form.extras" :key="i" class="item-fila item-fila--2">
                <div class="field">
                  <label class="sr-only" :for="`ex-n-${i}`">Nombre del opcional {{ i + 1 }}</label>
                  <input :id="`ex-n-${i}`" v-model="e.nombre" class="input" type="text" maxlength="120" placeholder="Ej: Lirio adicional" />
                </div>
                <div class="field">
                  <label class="sr-only" :for="`ex-p-${i}`">Precio del opcional {{ i + 1 }}</label>
                  <input :id="`ex-p-${i}`" v-model="e.precio" class="input" type="number" inputmode="numeric" min="0" step="500" placeholder="Precio" />
                </div>
                <button type="button" class="quitar" :aria-label="`Quitar el opcional ${i + 1}`" @click="form.extras.splice(i, 1)">✕</button>
              </div>
              <button type="button" class="btn btn--ghost btn--sm" @click="form.extras.push({ nombre: '', precio: null })">+ Agregar</button>
            </div>
          </section>

          <!-- Fotos -->
          <section class="bloque" aria-labelledby="b-fotos">
            <h2 id="b-fotos" class="b-t">Fotos</h2>
            <AdminFotos v-model="form.imagenes" :carpeta="form.slug || 'ramo'" @subida="(u) => subidasNuevas.push(u)" @quitada="(u) => fotosQuitadas.push(u)" />
          </section>

          <!-- Estado -->
          <section class="bloque" aria-labelledby="b-estado">
            <h2 id="b-estado" class="b-t">Cómo se muestra</h2>
            <label class="check"><input v-model="form.publicado" type="checkbox" /><span><strong>Visible en el sitio.</strong> Si lo desmarcas queda como borrador y nadie lo ve.</span></label>
            <label class="check"><input v-model="form.disponible" type="checkbox" /><span><strong>Disponible.</strong> Si lo desmarcas, se muestra como «No disponible por ahora» y no se puede agregar al carrito.</span></label>
            <label class="check"><input v-model="form.destacado" type="checkbox" /><span><strong>Destacado.</strong> Puede aparecer en la portada.</span></label>
            <label class="check"><input v-model="form.insignia" type="checkbox" /><span><strong>Ramo insignia.</strong> Muestra la etiqueta «Insignia».</span></label>
          </section>

          <!-- Avanzado -->
          <details class="bloque avanzado" :open="abrirAvanzado">
            <summary>Opciones avanzadas</summary>
            <div class="field">
              <label class="field-label" for="f-tags">Palabras para la búsqueda <span class="opt">(opcional)</span></label>
              <input id="f-tags" v-model="form.tags" class="input" type="text" placeholder="rosas, romántico, aniversario" />
              <p class="field-hint">Separadas por comas. Ayudan a que el buscador del catálogo encuentre este ramo.</p>
            </div>
            <div class="field">
              <label class="field-label" for="f-slug">Enlace del ramo</label>
              <input id="f-slug" v-model="form.slug" class="input" type="text" maxlength="80" autocomplete="off"
                :aria-invalid="!!errores.slug" :aria-describedby="errores.slug ? 'e-slug f-slug-h' : 'f-slug-h'" @input="form.slugEditado = true" />
              <p id="f-slug-h" class="field-hint">/producto/{{ form.slug || '…' }} — se genera solo desde el nombre. Cámbialo solo si sabes lo que haces: los enlaces antiguos dejarían de funcionar.</p>
              <p v-if="errores.slug" id="e-slug" class="field-error">{{ errores.slug }}</p>
            </div>
          </details>
        </div>

        <!-- Vista previa -->
        <aside class="ed-prev" aria-labelledby="prev-t">
          <h2 id="prev-t" class="b-t">Así se verá</h2>
          <div class="prev-card" inert>
            <CatalogCard :ramo="preview" />
          </div>
          <p class="field-hint">Vista previa de la tarjeta en el catálogo.</p>
        </aside>
      </div>

      <div class="ed-foot">
        <NuxtLink to="/admin/ramos" class="btn btn--ghost">Cancelar</NuxtLink>
        <button type="submit" class="btn btn--wine" :class="{ 'btn--loading': guardando }" :disabled="guardando" :aria-busy="guardando">
          <span v-if="guardando" class="spinner" aria-hidden="true" />
          {{ guardando ? 'Guardando…' : 'Guardar ramo' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { baseToRow, type CategoriaRow, type RamoRow, rowToBase } from '~/utils/catalogoDb'
import { GUIA_TAMANOS, makeRamo, slugify, type CategoriaInfo, type RamoBase } from '~/stores/productos'
import { rutaEnBucket } from '~/utils/imagenes'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { mostrar } = useToast()

const idParam = String(route.params.id)
const esNuevo = idParam === 'nuevo'

const cargando = ref(true)
const noExiste = ref(false)
const guardando = ref(false)
const categorias = ref<CategoriaInfo[]>([])
const creandoCat = ref(false)
const creandoCatBusy = ref(false)
const catNueva = ref('')
const resumenEl = ref<HTMLElement | null>(null)
const abrirAvanzado = ref(false)

const form = reactive({
  nombre: '',
  slug: '',
  slugEditado: false,
  categoria: '',
  descripcion: '',
  detalle: '',
  modoPrecio: 'unico' as 'unico' | 'variantes',
  tamanoTexto: 'M',
  precioBase: null as number | string | null,
  variantes: [{ etiqueta: '', tamano: 'M', precio: null as number | string | null }],
  colores: '',
  incluye: [] as string[],
  extras: [] as { nombre: string; precio: number | string | null }[],
  imagenes: [] as string[],
  tags: '',
  disponible: true,
  destacado: false,
  insignia: false,
  publicado: true,
})

const errores = reactive({ nombre: '', categoria: '', descripcion: '', precio: '', variantes: '', slug: '' })

// Fotos subidas en esta sesión y fotos quitadas (se borran del almacenamiento solo al guardar)
const subidasNuevas = ref<string[]>([])
const fotosQuitadas = ref<string[]>([])
let guardado = false
let cambios = false

/** '' → null; "80000" → 80000 */
function num(v: number | string | null | undefined): number | null {
  if (v === null || v === undefined || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

// El enlace se genera solo desde el nombre (hasta que se edite a mano o si el ramo ya existe)
watch(() => form.nombre, (n) => { if (!form.slugEditado) form.slug = slugify(n) })

onMounted(async () => {
  const sb = useSupabase()
  if (!sb) return
  const { data: cats } = await sb.from('categorias').select('*').order('orden')
  categorias.value = (cats ?? []).map((c: CategoriaRow) => ({ slug: c.slug, label: c.label, singular: c.singular || c.label, orden: c.orden }))

  if (!esNuevo) {
    const { data, error } = await sb.from('ramos').select('*').eq('id', Number(idParam)).maybeSingle()
    if (error || !data) { noExiste.value = true; cargando.value = false; return }
    rellenar(rowToBase(data as RamoRow), (data as RamoRow).publicado)
  } else if (route.query.categoria) {
    form.categoria = String(route.query.categoria)
  }
  cargando.value = false
  await nextTick()
  watch(form, () => { cambios = true }, { deep: true })
})

function rellenar(b: RamoBase, publicado: boolean) {
  form.nombre = b.nombre
  form.slug = b.slug
  form.slugEditado = true // no cambiar el enlace de un ramo existente por accidente
  form.categoria = b.categoria
  form.descripcion = b.descripcion
  form.detalle = b.detalle ?? ''
  form.colores = b.colores_disponibles ?? ''
  form.incluye = [...(b.incluye ?? [])]
  form.extras = (b.extras_opcionales ?? []).map((e) => ({ nombre: e.nombre, precio: e.precio }))
  form.imagenes = [...b.imagenes]
  form.tags = (b.tags_busqueda ?? []).join(', ')
  form.disponible = b.disponible
  form.destacado = !!b.destacado
  form.insignia = !!b.insignia
  form.publicado = publicado
  if (b.variantes_precio?.length) {
    form.modoPrecio = 'variantes'
    form.variantes = b.variantes_precio.map((v) => ({ etiqueta: v.etiqueta, tamano: v.tamano, precio: v.precio }))
  } else {
    form.modoPrecio = 'unico'
    form.tamanoTexto = b.tamanoTexto ?? ''
    form.precioBase = b.precio_base ?? null
  }
}

function construirBase(): Omit<RamoBase, 'id'> {
  const variantes = form.modoPrecio === 'variantes'
    ? form.variantes.filter((v) => v.etiqueta.trim() && num(v.precio) !== null).map((v) => ({ etiqueta: v.etiqueta.trim(), tamano: v.tamano, precio: num(v.precio)! }))
    : []
  return {
    slug: form.slug.trim() || slugify(form.nombre),
    nombre: form.nombre.trim(),
    categoria: form.categoria,
    descripcion: form.descripcion.trim(),
    detalle: form.detalle.trim() || undefined,
    incluye: form.incluye.map((x) => x.trim()).filter(Boolean),
    tamanoTexto: form.modoPrecio === 'unico' ? form.tamanoTexto || undefined : undefined,
    precio_base: form.modoPrecio === 'unico' ? num(form.precioBase) ?? undefined : undefined,
    variantes_precio: variantes.length ? variantes : undefined,
    colores_disponibles: form.colores.trim() || undefined,
    extras_opcionales: form.extras.filter((e) => e.nombre.trim()).map((e) => ({ nombre: e.nombre.trim(), precio: num(e.precio) })),
    imagenes: [...form.imagenes],
    disponible: form.disponible,
    destacado: form.destacado,
    insignia: form.insignia,
    tags_busqueda: form.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 20),
  }
}

// Vista previa en vivo (con valores de relleno mientras el formulario está incompleto)
const preview = computed(() => {
  const b = construirBase()
  const sinPrecio = b.precio_base === undefined && !b.variantes_precio?.length
  return makeRamo({
    ...b,
    id: 0,
    nombre: b.nombre || 'Nombre del ramo',
    descripcion: b.descripcion || 'Aquí aparecerá la descripción del ramo.',
    categoria: b.categoria || 'rosas',
    precio_base: sinPrecio ? 0 : b.precio_base,
    incluye: b.incluye?.length ? b.incluye : undefined,
  })
})

const resumen = computed(() =>
  (Object.keys(errores) as (keyof typeof errores)[]).filter((k) => errores[k]).map((k) => ({
    campo: { nombre: 'f-nombre', categoria: 'f-categoria', descripcion: 'f-descripcion', precio: 'f-precio', variantes: 'v-et-0', slug: 'f-slug' }[k],
    mensaje: errores[k],
  })),
)

function validar(): boolean {
  errores.nombre = form.nombre.trim().length < 2 ? 'Escribe el nombre del ramo.' : ''
  errores.categoria = form.categoria ? '' : 'Elige una categoría (o crea una nueva).'
  errores.descripcion = form.descripcion.trim().length < 5 ? 'Escribe una descripción.' : ''
  const slugFinal = form.slug.trim() || slugify(form.nombre)
  errores.slug = !slugFinal && !form.nombre.trim() ? '' // sin nombre ya se avisa arriba
    : /^[a-z0-9-]{1,80}$/.test(slugFinal) ? '' : 'El enlace solo puede tener letras minúsculas sin tildes, números y guiones.'
  errores.precio = ''
  errores.variantes = ''
  if (form.modoPrecio === 'unico') {
    const p = num(form.precioBase)
    if (p === null || p <= 0) errores.precio = 'Escribe el precio (mayor a 0).'
  } else {
    const validas = form.variantes.filter((v) => v.etiqueta.trim() && (num(v.precio) ?? 0) > 0)
    if (!validas.length) errores.variantes = 'Agrega al menos una opción con nombre y precio.'
    else if (form.variantes.some((v) => (v.etiqueta.trim() && !((num(v.precio) ?? 0) > 0)) || (!v.etiqueta.trim() && num(v.precio) !== null)))
      errores.variantes = 'Cada opción necesita nombre y precio (o quítala).'
  }
  if (errores.slug) abrirAvanzado.value = true
  return !resumen.value.length
}

async function enfocar(id: string) {
  await nextTick()
  const el = document.getElementById(id)
  el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  el?.focus()
}

async function crearCategoria() {
  const sb = useSupabase()
  const label = catNueva.value.trim()
  if (!sb || !label) return
  const slug = slugify(label)
  if (!slug) return
  if (categorias.value.some((c) => c.slug === slug)) {
    form.categoria = slug; creandoCat.value = false; catNueva.value = ''
    return
  }
  creandoCatBusy.value = true
  const orden = Math.max(0, ...categorias.value.map((c) => c.orden)) + 1
  const { error } = await sb.from('categorias').insert({ slug, label, singular: label, orden })
  creandoCatBusy.value = false
  if (error) { mostrar('No se pudo crear la categoría. Inténtalo de nuevo.'); return }
  categorias.value.push({ slug, label, singular: label, orden })
  form.categoria = slug
  creandoCat.value = false
  catNueva.value = ''
  mostrar(`Categoría «${label}» creada`)
}

async function guardar() {
  if (!validar()) {
    await nextTick()
    resumenEl.value?.focus()
    return
  }
  const sb = useSupabase()
  if (!sb) return
  guardando.value = true

  const base = construirBase()
  let error: { code?: string } | null = null
  if (esNuevo) {
    const { data: maxRow } = await sb.from('ramos').select('orden').order('orden', { ascending: false }).limit(1).maybeSingle()
    const orden = ((maxRow as { orden: number } | null)?.orden ?? 0) + 1
    ;({ error } = await sb.from('ramos').insert(baseToRow(base, { publicado: form.publicado, orden })))
  } else {
    ;({ error } = await sb.from('ramos').update(baseToRow(base, { publicado: form.publicado })).eq('id', Number(idParam)))
  }
  guardando.value = false

  if (error) {
    if (error.code === '23505') {
      errores.slug = 'Ya existe un ramo con ese enlace. Cambia el nombre o el enlace.'
      abrirAvanzado.value = true
    } else {
      errores.nombre = errores.nombre || ''
    }
    mostrar(error.code === '23505' ? 'Ya existe un ramo con ese nombre.' : 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.')
    await nextTick()
    resumenEl.value?.focus()
    return
  }

  // Borra del almacenamiento las fotos que se quitaron (solo las subidas por el panel)
  const rutas = fotosQuitadas.value.filter((u) => !form.imagenes.includes(u)).map(rutaEnBucket).filter((x): x is string => !!x)
  if (rutas.length) await sb.storage.from('ramos').remove(rutas)

  guardado = true
  mostrar(esNuevo ? `«${base.nombre}» se creó` : `«${base.nombre}» se guardó`)
  await navigateTo('/admin/ramos')
}

// Si se sale sin guardar: confirmar y borrar las fotos que se subieron para nada
onBeforeRouteLeave(async () => {
  if (guardado || !cambios) return true
  if (!window.confirm('Tienes cambios sin guardar. ¿Salir de todos modos?')) return false
  const rutas = subidasNuevas.value.map(rutaEnBucket).filter((x): x is string => !!x)
  if (rutas.length) await useSupabase()?.storage.from('ramos').remove(rutas)
  return true
})

function avisarSalida(e: BeforeUnloadEvent) {
  if (cambios && !guardado) { e.preventDefault(); e.returnValue = '' }
}
onMounted(() => window.addEventListener('beforeunload', avisarSalida))
onBeforeUnmount(() => window.removeEventListener('beforeunload', avisarSalida))
</script>

<style scoped>
.cargando { display: flex; align-items: center; gap: 0.7rem; padding: 3rem 0; }
.errs { padding: 0.9rem 1.1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); font-size: 0.92rem; margin-bottom: 1rem; }
.errs ul { margin: 0.4rem 0 0; padding-left: 1.1rem; list-style: disc; }
.errs a { color: var(--danger); text-decoration: underline; }

.ed-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.volver { font-size: 0.9rem; color: var(--muted); text-decoration: none; }
.volver:hover { color: var(--wine); text-decoration: underline; }
.ttl { font-size: clamp(2.4rem, 5vw, 3.6rem); margin-top: 0.4rem; }
.ed-top-btns, .ed-foot { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.ed-foot { justify-content: flex-end; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }

.ed-grid { display: grid; gap: 2rem; grid-template-columns: minmax(0, 1fr); align-items: start; }
@media (min-width: 1000px) { .ed-grid { grid-template-columns: minmax(0, 1fr) 20rem; } .ed-prev { position: sticky; top: 6rem; } }
.ed-col { display: grid; gap: 1.5rem; }

.bloque { display: grid; gap: 1.1rem; padding: clamp(1.1rem, 3vw, 1.75rem); background: var(--paper); border: 1px solid var(--line); border-radius: 1.5rem; }
.b-t { font-size: 1.8rem; }
.b-t .opt { font: 400 0.9rem var(--sans); color: var(--muted); }

.cat-row { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.cat-row .input { flex: 1; min-width: 12rem; }
.cat-nueva { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.4rem; }
.cat-nueva .input { flex: 1; min-width: 12rem; }

.fs { border: 0; padding: 0; margin: 0; }
.fs legend { padding: 0; margin-bottom: 0.5rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chip-radio span { display: inline-flex; align-items: center; min-height: 2.5rem; padding: 0.4rem 1rem; border: 1.5px solid var(--line-strong); border-radius: 9999px; background: var(--paper); font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
.chip-radio:hover span { border-color: var(--wine); color: var(--wine); }
.chip-radio input:checked + span { background: var(--wine); border-color: var(--wine); color: #fff; }
.chip-radio input:focus-visible + span { outline: 3px solid var(--wine); outline-offset: 3px; }

.precio-unico { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 560px) { .precio-unico { grid-template-columns: 1fr 1fr; } }
.variantes { display: grid; gap: 0.9rem; }
.var-fila { display: grid; gap: 0.6rem; grid-template-columns: 1fr 5rem 1fr 2.6rem; align-items: end; }
@media (max-width: 600px) { .var-fila { grid-template-columns: 1fr 1fr; } .var-fila .field:first-child { grid-column: 1 / -1; } .var-fila .quitar { justify-self: end; } }
.quitar { width: 2.6rem; height: 2.6rem; border: 1.5px solid var(--line-strong); background: var(--paper); border-radius: 50%; color: var(--muted); cursor: pointer; transition: all 0.2s; }
.quitar:hover:not(:disabled) { border-color: var(--danger); color: var(--danger); background: #fdecea; }
.quitar:disabled { opacity: 0.35; cursor: not-allowed; }

.lista-edit { display: grid; gap: 0.6rem; }
.item-fila { display: grid; gap: 0.5rem; grid-template-columns: 1fr 2.6rem; align-items: center; }
.item-fila--2 { grid-template-columns: 1fr 9rem 2.6rem; }

.avanzado summary { cursor: pointer; font: 400 1.5rem var(--serif); color: var(--ink); }
.avanzado[open] summary { margin-bottom: 1rem; }
.avanzado { display: block; }
.avanzado .field + .field { margin-top: 1rem; }

.prev-card { max-width: 20rem; }
.ed-prev { display: grid; gap: 0.75rem; }
.field-hint { font-size: 0.82rem; color: var(--muted); }
</style>
