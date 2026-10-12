<template>
  <div>
    <header class="top">
      <div>
        <p class="eyebrow">Panel</p>
        <h1 class="display ttl">Mis <em>categorías</em></h1>
      </div>
    </header>
    <p class="aviso" role="note">
      Las categorías agrupan los ramos en el catálogo y en la portada. Una categoría sin ramos no se muestra al público.
    </p>

    <!-- Nueva -->
    <form class="nueva" novalidate @submit.prevent="crear">
      <div class="field grow">
        <label class="field-label" for="c-nueva">Nueva categoría</label>
        <input id="c-nueva" v-model="nuevaLabel" class="input" type="text" maxlength="40" placeholder="Ej: Tulipanes" autocomplete="off"
          :aria-invalid="!!errorNueva" :aria-describedby="errorNueva ? 'c-nueva-e' : undefined" />
        <p v-if="errorNueva" id="c-nueva-e" class="field-error">{{ errorNueva }}</p>
      </div>
      <button type="submit" class="btn btn--wine" :disabled="creando" :aria-busy="creando">
        <span v-if="creando" class="spinner" aria-hidden="true" />
        {{ creando ? 'Creando…' : 'Crear categoría' }}
      </button>
    </form>

    <div v-if="cargando" class="lista" aria-busy="true"><div v-for="n in 3" :key="n" class="skeleton sk" /></div>
    <div v-else-if="errorCarga" class="errs" role="alert">{{ errorCarga }} <button type="button" class="link-inline btn-link" @click="cargar">Reintentar</button></div>

    <p v-else-if="!categorias.length" class="vacio">Todavía no hay categorías. Crea la primera arriba (o importa el catálogo desde «Ramos»).</p>

    <ul v-else class="lista">
      <li v-for="c in categorias" :key="c.slug" class="fila">
        <div class="fila-campos">
          <div class="field">
            <label class="field-label" :for="`l-${c.slug}`">Nombre</label>
            <input :id="`l-${c.slug}`" v-model="c.label" class="input" type="text" maxlength="40" />
          </div>
          <div class="field">
            <label class="field-label" :for="`s-${c.slug}`">En singular <span class="opt">(para la etiqueta)</span></label>
            <input :id="`s-${c.slug}`" v-model="c.singular" class="input" type="text" maxlength="40" />
          </div>
          <div class="field orden">
            <label class="field-label" :for="`o-${c.slug}`">Orden</label>
            <input :id="`o-${c.slug}`" v-model.number="c.orden" class="input" type="number" min="0" step="1" />
          </div>
        </div>
        <p class="fila-meta">{{ conteo[c.slug] ?? 0 }} {{ (conteo[c.slug] ?? 0) === 1 ? 'ramo' : 'ramos' }} · enlace: <code>?categoria={{ c.slug }}</code></p>

        <div class="fila-acc">
          <button type="button" class="btn btn--ghost btn--sm" :disabled="ocupado === c.slug" @click="guardar(c)">
            {{ ocupado === c.slug ? 'Guardando…' : 'Guardar cambios' }}<span class="sr-only"> de {{ c.label }}</span>
          </button>
          <template v-if="confirmando !== c.slug">
            <button type="button" class="btn btn--sm btn--peligro" @click="confirmando = c.slug">Eliminar<span class="sr-only"> {{ c.label }}</span></button>
          </template>
          <div v-else class="conf" role="group" :aria-label="`Confirmar eliminación de ${c.label}`">
            <span>¿Eliminar esta categoría?</span>
            <button type="button" class="btn btn--sm btn--peligro-s" @click="eliminar(c)">Sí, eliminar</button>
            <button type="button" class="btn btn--sm btn--ghost" @click="confirmando = null">Cancelar</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { slugify, type CategoriaInfo } from '~/stores/productos'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { mostrar } = useToast()
const categorias = ref<CategoriaInfo[]>([])
const conteo = ref<Record<string, number>>({})
const cargando = ref(true)
const errorCarga = ref('')
const nuevaLabel = ref('')
const errorNueva = ref('')
const creando = ref(false)
const ocupado = ref<string | null>(null)
const confirmando = ref<string | null>(null)

async function cargar() {
  const sb = useSupabase()
  if (!sb) return
  cargando.value = true
  errorCarga.value = ''
  const [c, r] = await Promise.all([
    sb.from('categorias').select('*').order('orden'),
    sb.from('ramos').select('categoria'),
  ])
  if (c.error || r.error) {
    errorCarga.value = 'No se pudieron cargar las categorías.'
  } else {
    categorias.value = (c.data ?? []).map((x: any) => ({ slug: x.slug, label: x.label, singular: x.singular || x.label, orden: x.orden }))
    const m: Record<string, number> = {}
    for (const row of (r.data ?? []) as { categoria: string }[]) m[row.categoria] = (m[row.categoria] ?? 0) + 1
    conteo.value = m
  }
  cargando.value = false
}
onMounted(cargar)

async function crear() {
  errorNueva.value = ''
  const label = nuevaLabel.value.trim()
  const slug = slugify(label)
  if (label.length < 2 || !slug) { errorNueva.value = 'Escribe un nombre para la categoría.'; return }
  if (categorias.value.some((c) => c.slug === slug)) { errorNueva.value = 'Ya existe una categoría con ese nombre.'; return }
  const sb = useSupabase()
  if (!sb) return
  creando.value = true
  const orden = Math.max(0, ...categorias.value.map((c) => c.orden)) + 1
  const { error } = await sb.from('categorias').insert({ slug, label, singular: label, orden })
  creando.value = false
  if (error) { mostrar('No se pudo crear la categoría. Inténtalo de nuevo.'); return }
  nuevaLabel.value = ''
  mostrar(`Categoría «${label}» creada`)
  await cargar()
}

async function guardar(c: CategoriaInfo) {
  const label = c.label.trim()
  if (!label) { mostrar('El nombre no puede quedar vacío.'); return }
  const sb = useSupabase()
  if (!sb) return
  ocupado.value = c.slug
  const { error } = await sb.from('categorias').update({ label, singular: c.singular.trim() || label, orden: Number(c.orden) || 0 }).eq('slug', c.slug)
  ocupado.value = null
  mostrar(error ? 'No se pudo guardar. Inténtalo de nuevo.' : `«${label}» se guardó`)
}

async function eliminar(c: CategoriaInfo) {
  if ((conteo.value[c.slug] ?? 0) > 0) {
    confirmando.value = null
    mostrar(`«${c.label}» tiene ramos. Cámbialos de categoría antes de eliminarla.`)
    return
  }
  const sb = useSupabase()
  if (!sb) return
  const { error } = await sb.from('categorias').delete().eq('slug', c.slug)
  confirmando.value = null
  if (error) { mostrar('No se pudo eliminar. Inténtalo de nuevo.'); return }
  categorias.value = categorias.value.filter((x) => x.slug !== c.slug)
  mostrar(`«${c.label}» fue eliminada`)
}
</script>

<style scoped>
.top { margin-bottom: 1rem; }
.ttl { font-size: clamp(2.6rem, 6vw, 4rem); margin-top: 0.5rem; }
.aviso { margin-bottom: 1.5rem; padding: 0.7rem 1rem; background: var(--sage-soft); color: var(--sage); border-radius: 0.9rem; font-size: 0.9rem; }
.errs { padding: 0.9rem 1.1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); }
.btn-link { background: none; border: 0; padding: 0 0.3rem; font: inherit; cursor: pointer; }
.nueva { display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap; padding: 1.25rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.4rem; margin-bottom: 1.5rem; }
.grow { flex: 1; min-width: 14rem; }
.vacio { padding: 2rem 0; }
.lista { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.9rem; }
.sk { height: 8rem; border-radius: 1.25rem; }
.fila { display: grid; gap: 0.7rem; padding: 1.1rem 1.25rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.4rem; }
.fila-campos { display: grid; gap: 0.9rem; grid-template-columns: 1fr; }
@media (min-width: 700px) { .fila-campos { grid-template-columns: 1.4fr 1.2fr 7rem; } }
.fila-meta { font-size: 0.85rem; color: var(--muted); }
code { background: var(--blush); padding: 0.05rem 0.4rem; border-radius: 0.3rem; font-size: 0.85em; }
.fila-acc { display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center; }
.btn--peligro { color: var(--danger); border-color: rgba(179, 38, 30, 0.35); background: transparent; }
.btn--peligro::before { background: #fdecea; }
.btn--peligro:hover { border-color: var(--danger); }
.btn--peligro-s { background: var(--danger); color: #fff; }
.btn--peligro-s::before { background: #8c1a14; }
.conf { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.88rem; color: var(--danger); }
</style>
