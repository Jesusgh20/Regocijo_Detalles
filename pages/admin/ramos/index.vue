<template>
  <div>
    <header class="top">
      <div>
        <p class="eyebrow">Panel</p>
        <h1 class="display ttl">Mis <em>ramos</em></h1>
      </div>
      <NuxtLink to="/admin/ramos/nuevo" class="btn btn--wine">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        Nuevo ramo
      </NuxtLink>
    </header>

    <p class="aviso" role="note">
      Los cambios aparecen en el sitio en menos de un minuto.
    </p>

    <!-- Cargando -->
    <div v-if="cargando" class="lista" aria-busy="true" aria-label="Cargando ramos">
      <div v-for="n in 5" :key="n" class="skeleton fila-sk" />
    </div>

    <!-- Error -->
    <div v-else-if="errorCarga" class="errs" role="alert">
      {{ errorCarga }}
      <button type="button" class="link-inline" @click="cargar">Reintentar</button>
    </div>

    <!-- Estado vacío: aún no hay nada en la base de datos -->
    <section v-else-if="!ramos.length" class="vacio" aria-labelledby="t-vacio">
      <Ornament variant="bloom" class="vacio-orn" />
      <h2 id="t-vacio" class="vacio-t">Aún no hay ramos guardados aquí</h2>
      <p>
        El sitio hoy muestra el catálogo original. Puedes <strong>importarlo</strong> para editarlo desde el panel
        ({{ store.ramos.length }} ramos con sus fotos), o crear un ramo desde cero.
      </p>
      <div class="vacio-btns">
        <button type="button" class="btn btn--wine" :class="{ 'btn--loading': importando }" :disabled="importando" :aria-busy="importando" @click="importar">
          <span v-if="importando" class="spinner" aria-hidden="true" />
          {{ importando ? 'Importando…' : 'Importar el catálogo actual' }}
        </button>
        <NuxtLink to="/admin/ramos/nuevo" class="btn btn--ghost">Crear mi primer ramo</NuxtLink>
      </div>
    </section>

    <template v-else>
      <!-- Filtros -->
      <div class="filtros">
        <div class="field">
          <label for="f-q" class="field-label">Buscar</label>
          <input id="f-q" v-model="q" type="search" class="input" placeholder="Nombre del ramo…" autocomplete="off" />
        </div>
        <div class="field">
          <label for="f-cat" class="field-label">Categoría</label>
          <select id="f-cat" v-model="catFiltro" class="input">
            <option value="">Todas</option>
            <option v-for="c in categorias" :key="c.slug" :value="c.slug">{{ c.label }}</option>
          </select>
        </div>
      </div>
      <p class="cuenta" role="status" aria-live="polite">{{ filtrados.length }} de {{ ramos.length }} ramos</p>

      <ul v-if="filtrados.length" class="lista">
        <li v-for="r in filtrados" :key="r.id" class="fila" :class="{ 'fila--borrador': !r.publicado }">
          <div class="fila-img">
            <RamoImagen :src="(r.imagenes && r.imagenes[0]) || null" alt="" :categoria="r.categoria" compacto />
          </div>

          <div class="fila-info">
            <p class="fila-nombre">{{ r.nombre }}</p>
            <p class="fila-meta">
              {{ etiquetaCat(r.categoria) }} · {{ precioTexto(r) }}
            </p>
            <p class="fila-tags">
              <span v-if="!r.publicado" class="tg tg--warn">Borrador (oculto)</span>
              <span v-if="!r.disponible" class="tg tg--warn">No disponible</span>
              <span v-if="r.destacado" class="tg">Destacado</span>
              <span v-if="!(r.imagenes && r.imagenes.length)" class="tg tg--warn">Sin foto</span>
            </p>
          </div>

          <div class="fila-acc">
            <label class="sw">
              <input type="checkbox" :checked="r.publicado" :disabled="ocupado === r.id" @change="alternarPublicado(r, $event)" />
              <span class="sw-pista" aria-hidden="true" />
              <span class="sw-txt">{{ r.publicado ? 'Visible' : 'Oculto' }}</span>
              <span class="sr-only"> en el sitio: {{ r.nombre }}</span>
            </label>
            <NuxtLink :to="`/admin/ramos/${r.id}`" class="btn btn--ghost btn--sm">Editar<span class="sr-only"> {{ r.nombre }}</span></NuxtLink>

            <template v-if="confirmando !== r.id">
              <button type="button" class="btn btn--sm btn--peligro" @click="confirmando = r.id">Eliminar<span class="sr-only"> {{ r.nombre }}</span></button>
            </template>
            <div v-else class="conf" role="group" :aria-label="`Confirmar eliminación de ${r.nombre}`">
              <span>¿Eliminar para siempre?</span>
              <button type="button" class="btn btn--sm btn--peligro-s" :disabled="ocupado === r.id" @click="eliminar(r)">Sí, eliminar</button>
              <button type="button" class="btn btn--sm btn--ghost" @click="confirmando = null">Cancelar</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="sin-res">No hay ramos con ese filtro. <button type="button" class="link-inline" @click="q = ''; catFiltro = ''">Quitar filtros</button></p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatPrecio } from '~/utils/format'
import { baseToRow, type RamoRow } from '~/utils/catalogoDb'
import { CATEGORIAS_SEED, RAMOS_SEED, useProductosStore, type CategoriaInfo } from '~/stores/productos'
import { rutaEnBucket } from '~/utils/imagenes'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const store = useProductosStore()
const { mostrar } = useToast()

const ramos = ref<RamoRow[]>([])
const categorias = ref<CategoriaInfo[]>([])
const cargando = ref(true)
const errorCarga = ref('')
const importando = ref(false)
const ocupado = ref<number | null>(null)
const confirmando = ref<number | null>(null)
const q = ref('')
const catFiltro = ref('')

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const filtrados = computed(() =>
  ramos.value.filter((r) => (!catFiltro.value || r.categoria === catFiltro.value) && (!q.value || norm(r.nombre).includes(norm(q.value)))),
)
const etiquetaCat = (slug: string) => categorias.value.find((c) => c.slug === slug)?.label ?? slug

function precioTexto(r: RamoRow): string {
  const precios = [...(r.variantes_precio ?? []).map((v) => v.precio), ...(r.precio_base != null ? [r.precio_base] : [])]
  if (!precios.length) return 'Sin precio'
  const min = Math.min(...precios)
  return (r.variantes_precio?.length ?? 0) > 1 ? `Desde ${formatPrecio(min)}` : formatPrecio(min)
}

async function cargar() {
  const sb = useSupabase()
  if (!sb) return
  cargando.value = true
  errorCarga.value = ''
  const [r, c] = await Promise.all([
    sb.from('ramos').select('*').order('orden').order('id'),
    sb.from('categorias').select('*').order('orden'),
  ])
  if (r.error || c.error) {
    errorCarga.value = 'No se pudieron cargar los ramos. Revisa tu conexión y que hayas ejecutado supabase/setup.sql.'
  } else {
    ramos.value = (r.data ?? []) as RamoRow[]
    categorias.value = (c.data ?? []).map((x: any) => ({ slug: x.slug, label: x.label, singular: x.singular || x.label, orden: x.orden }))
  }
  cargando.value = false
}
onMounted(cargar)

async function alternarPublicado(r: RamoRow, ev: Event) {
  const sb = useSupabase()
  if (!sb) return
  const nuevo = (ev.target as HTMLInputElement).checked
  ocupado.value = r.id
  const { error } = await sb.from('ramos').update({ publicado: nuevo }).eq('id', r.id)
  ocupado.value = null
  if (error) {
    ;(ev.target as HTMLInputElement).checked = r.publicado
    mostrar('No se pudo cambiar la visibilidad. Inténtalo de nuevo.')
    return
  }
  r.publicado = nuevo
  mostrar(nuevo ? `«${r.nombre}» ahora es visible en el sitio` : `«${r.nombre}» quedó oculto (borrador)`)
}

async function eliminar(r: RamoRow) {
  const sb = useSupabase()
  if (!sb) return
  ocupado.value = r.id
  const { error } = await sb.from('ramos').delete().eq('id', r.id)
  if (error) {
    ocupado.value = null
    mostrar('No se pudo eliminar. Inténtalo de nuevo.')
    return
  }
  // Borra también las fotos subidas por el panel (las del sitio, como /foto.jpg, no se tocan)
  const rutas = (r.imagenes ?? []).map(rutaEnBucket).filter((x): x is string => !!x)
  if (rutas.length) await sb.storage.from('ramos').remove(rutas)
  ramos.value = ramos.value.filter((x) => x.id !== r.id)
  ocupado.value = null
  confirmando.value = null
  mostrar(`«${r.nombre}» fue eliminado`)
}

/** Copia las categorías y los ramos del catálogo original a la base de datos (las fotos siguen siendo las del sitio) */
async function importar() {
  const sb = useSupabase()
  if (!sb) return
  importando.value = true
  const cats = await sb.from('categorias').upsert(CATEGORIAS_SEED.map((c) => ({ slug: c.slug, label: c.label, singular: c.singular, orden: c.orden })))
  if (cats.error) {
    importando.value = false
    mostrar('No se pudieron crear las categorías. ¿Ejecutaste supabase/setup.sql?')
    return
  }
  const filas = RAMOS_SEED.map(({ id: _id, ...resto }, i) => baseToRow(resto, { publicado: true, orden: i + 1 }))
  const res = await sb.from('ramos').insert(filas)
  importando.value = false
  if (res.error) {
    mostrar('No se pudo importar el catálogo. Si ya importaste antes, recarga la página.')
    return
  }
  mostrar(`Se importaron ${filas.length} ramos`)
  await cargar()
}
</script>

<style scoped>
.top { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
.ttl { font-size: clamp(2.6rem, 6vw, 4rem); margin-top: 0.5rem; }
.aviso { margin-bottom: 1.5rem; padding: 0.7rem 1rem; background: var(--sage-soft); color: var(--sage); border-radius: 0.9rem; font-size: 0.9rem; }
.errs { padding: 0.9rem 1.1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); }
.errs button { background: none; border: 0; padding: 0 0.3rem; font: inherit; cursor: pointer; }

.filtros { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-bottom: 0.75rem; }
@media (min-width: 640px) { .filtros { grid-template-columns: 2fr 1fr; } }
.cuenta { font-size: 0.88rem; color: var(--muted); margin-bottom: 1rem; }
.sin-res { padding: 2rem 0; color: var(--body); }

.lista { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
.fila-sk { height: 6.5rem; border-radius: 1.25rem; }
.fila { display: grid; grid-template-columns: 4.5rem 1fr; gap: 0.5rem 1rem; align-items: center; padding: 0.8rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.25rem; transition: box-shadow 0.3s, border-color 0.3s; }
.fila:hover { box-shadow: var(--shadow-soft); border-color: var(--blush-deep); }
.fila--borrador { background: #f6f1ea; }
.fila-img { width: 4.5rem; height: 5.6rem; border-radius: 0.8rem; overflow: hidden; }
.fila-nombre { font: 500 1.4rem/1.1 var(--serif); color: var(--ink); }
.fila-meta { font-size: 0.9rem; color: var(--body); }
.fila-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem; }
.tg { display: inline-block; padding: 0.1rem 0.6rem; border-radius: 9999px; background: var(--blush); color: var(--wine-deep); font-size: 0.72rem; font-weight: 500; }
.tg--warn { background: #fff3cd; color: #5c4400; }
.fila-acc { grid-column: 1 / -1; display: flex; align-items: center; gap: 0.6rem 0.9rem; flex-wrap: wrap; padding-top: 0.5rem; border-top: 1px dashed var(--line); }
@media (min-width: 900px) { .fila { grid-template-columns: 4.5rem 1fr auto; } .fila-acc { grid-column: auto; border: 0; padding: 0; justify-content: flex-end; } }

.btn--peligro { color: var(--danger); border-color: rgba(179, 38, 30, 0.35); background: transparent; }
.btn--peligro::before { background: #fdecea; }
.btn--peligro:hover { border-color: var(--danger); }
.btn--peligro-s { background: var(--danger); color: #fff; }
.btn--peligro-s::before { background: #8c1a14; }
.conf { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.88rem; color: var(--danger); }

/* Interruptor visible/oculto */
.sw { position: relative; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.88rem; }
.sw input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.sw-pista { position: relative; width: 2.6rem; height: 1.5rem; border-radius: 9999px; background: #c9b8bd; transition: background 0.25s; flex-shrink: 0; }
.sw-pista::after { content: ''; position: absolute; top: 0.2rem; left: 0.2rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: #fff; transition: transform 0.3s var(--ease-out); box-shadow: 0 1px 3px rgba(0,0,0,.3); }
.sw input:checked + .sw-pista { background: var(--sage); }
.sw input:checked + .sw-pista::after { transform: translateX(1.1rem); }
.sw input:focus-visible + .sw-pista { outline: 3px solid var(--wine); outline-offset: 3px; }
.sw input:disabled + .sw-pista { opacity: 0.5; }
.sw-txt { min-width: 3.2rem; color: var(--ink); }

.vacio { display: grid; justify-items: center; text-align: center; gap: 1rem; padding: 3rem 1rem; background: var(--paper); border: 1px dashed var(--line-strong); border-radius: 2rem; }
.vacio-orn { width: 5rem; color: var(--rose); opacity: 0.6; }
.vacio-t { font-size: 2rem; }
.vacio p { max-width: 32rem; }
.vacio-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
</style>
