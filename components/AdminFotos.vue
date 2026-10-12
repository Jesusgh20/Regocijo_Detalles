<template>
  <div class="af">
    <!-- Zona para soltar / elegir fotos -->
    <div
      class="af-drop"
      :class="{ 'af-drop--over': sobre }"
      @dragover.prevent="sobre = true"
      @dragleave.prevent="sobre = false"
      @drop.prevent="onDrop"
    >
      <Ornament variant="bloom" class="af-orn" />
      <p class="af-txt"><strong>Arrastra tus fotos aquí</strong> o</p>
      <label class="btn btn--ghost btn--sm af-btn" :class="{ 'btn--loading': subiendo }">
        <input ref="inputEl" type="file" class="sr-only" accept="image/jpeg,image/png,image/webp" multiple :disabled="subiendo" @change="onElegir" />
        <span v-if="subiendo" class="spinner" aria-hidden="true" />
        {{ subiendo ? 'Subiendo…' : 'Elegir fotos' }}
      </label>
      <p class="af-ayuda">JPG, PNG o WebP. Se reducen automáticamente (no importa si pesan mucho). La primera foto es la principal.</p>
    </div>

    <p v-if="mensaje" class="af-msg" :class="{ 'af-msg--err': hayError }" role="status" aria-live="polite">{{ mensaje }}</p>

    <!-- Fotos subiendo -->
    <ul v-if="pendientes.length" class="af-pend" aria-label="Subiendo fotos">
      <li v-for="p in pendientes" :key="p.id">
        <span class="spinner" aria-hidden="true" /> {{ p.nombre }}
      </li>
    </ul>

    <!-- Fotos actuales -->
    <ol v-if="modelValue.length" class="af-grid" aria-label="Fotos del ramo">
      <li v-for="(url, i) in modelValue" :key="url" class="af-item">
        <div class="af-thumb">
          <img :src="url" :alt="`Foto ${i + 1} de ${modelValue.length}`" loading="lazy" decoding="async" />
          <span v-if="i === 0" class="af-pri">Principal</span>
        </div>
        <div class="af-ctrls" role="group" :aria-label="`Opciones de la foto ${i + 1}`">
          <button type="button" class="af-c" :disabled="i === 0" :aria-label="`Mover la foto ${i + 1} a la izquierda`" title="Mover a la izquierda" @click="mover(i, -1)">←</button>
          <button type="button" class="af-c" :disabled="i === modelValue.length - 1" :aria-label="`Mover la foto ${i + 1} a la derecha`" title="Mover a la derecha" @click="mover(i, 1)">→</button>
          <button v-if="i !== 0" type="button" class="af-c af-c--txt" :aria-label="`Hacer principal la foto ${i + 1}`" @click="hacerPrincipal(i)">★ Principal</button>
          <button type="button" class="af-c af-c--del" :aria-label="`Quitar la foto ${i + 1}`" title="Quitar" @click="quitar(i)">✕</button>
        </div>
      </li>
    </ol>
    <p v-else class="af-vacio">Todavía no hay fotos. Sin foto, el ramo se muestra con «Foto próximamente».</p>
  </div>
</template>

<script setup lang="ts">
import { comprimirImagen, MAX_ORIGINAL_MB, TIPOS_ACEPTADOS } from '~/utils/imagenes'

const props = defineProps<{ modelValue: string[]; carpeta: string }>()
const emit = defineEmits<{
  'update:modelValue': [string[]]
  /** URLs recién subidas (por si se descarta el formulario y hay que borrarlas) */
  subida: [string]
  /** URLs quitadas de la lista (se borran del almacenamiento solo cuando se guarda) */
  quitada: [string]
}>()

const sobre = ref(false)
const subiendo = ref(false)
const mensaje = ref('')
const hayError = ref(false)
const pendientes = ref<{ id: number; nombre: string }[]>([])
const inputEl = ref<HTMLInputElement | null>(null)
let contador = 0

function onElegir(e: Event) {
  const el = e.target as HTMLInputElement
  procesar([...(el.files ?? [])])
  el.value = ''
}
function onDrop(e: DragEvent) {
  sobre.value = false
  procesar([...(e.dataTransfer?.files ?? [])])
}

async function procesar(archivos: File[]) {
  if (!archivos.length) return
  const sb = useSupabase()
  if (!sb) { aviso('El panel no está conectado a Supabase.', true); return }

  const validos = archivos.filter((f) => {
    if (!TIPOS_ACEPTADOS.includes(f.type)) { aviso(`«${f.name}» no es una imagen JPG, PNG o WebP.`, true); return false }
    if (f.size > MAX_ORIGINAL_MB * 1024 * 1024) { aviso(`«${f.name}» pesa más de ${MAX_ORIGINAL_MB} MB.`, true); return false }
    return true
  })
  if (!validos.length) return

  subiendo.value = true
  const nuevas: string[] = []
  let fallos = 0
  for (const f of validos) {
    const id = ++contador
    pendientes.value.push({ id, nombre: f.name })
    try {
      const blob = await comprimirImagen(f)
      const ruta = `${props.carpeta || 'ramo'}/${Date.now()}-${id}.jpg`
      const { error } = await sb.storage.from('ramos').upload(ruta, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false })
      if (error) throw error
      const url = sb.storage.from('ramos').getPublicUrl(ruta).data.publicUrl
      nuevas.push(url)
      emit('subida', url)
    } catch {
      fallos++
    } finally {
      pendientes.value = pendientes.value.filter((p) => p.id !== id)
    }
  }
  subiendo.value = false
  if (nuevas.length) emit('update:modelValue', [...props.modelValue, ...nuevas])
  if (fallos) aviso(`${fallos} foto${fallos > 1 ? 's' : ''} no se pudo subir. Revisa tu conexión y que hayas ejecutado supabase/setup.sql.`, true)
  else aviso(`${nuevas.length} foto${nuevas.length > 1 ? 's subidas' : ' subida'}.`, false)
}

function aviso(t: string, err: boolean) { mensaje.value = t; hayError.value = err }

function mover(i: number, d: -1 | 1) {
  const a = [...props.modelValue]
  const j = i + d
  if (j < 0 || j >= a.length) return
  ;[a[i], a[j]] = [a[j], a[i]]
  emit('update:modelValue', a)
}
function hacerPrincipal(i: number) {
  const a = [...props.modelValue]
  const [x] = a.splice(i, 1)
  a.unshift(x)
  emit('update:modelValue', a)
}
function quitar(i: number) {
  const a = [...props.modelValue]
  const [x] = a.splice(i, 1)
  emit('update:modelValue', a)
  emit('quitada', x)
  aviso('Foto quitada. Se aplicará al guardar.', false)
}
</script>

<style scoped>
.af { display: grid; gap: 1rem; }
.af-drop { display: grid; justify-items: center; gap: 0.5rem; padding: 1.5rem 1rem; text-align: center; border: 2px dashed var(--line-strong); border-radius: 1.4rem; background: var(--paper); transition: border-color 0.25s, background 0.25s; }
.af-drop--over { border-color: var(--wine); background: #fdf1f3; }
.af-orn { width: 3rem; color: var(--rose); opacity: 0.6; }
.af-txt { margin: 0; }
.af-btn { cursor: pointer; }
.af-btn:has(input:focus-visible) { outline: 3px solid var(--wine); outline-offset: 3px; }
.af-ayuda { font-size: 0.82rem; color: var(--muted); max-width: 26rem; }
.af-msg { font-size: 0.9rem; color: var(--sage); }
.af-msg--err { color: var(--danger); }
.af-pend { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.3rem; font-size: 0.88rem; color: var(--body); }
.af-pend li { display: flex; align-items: center; gap: 0.5rem; }
.af-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr)); }
.af-thumb { position: relative; aspect-ratio: 4 / 5; border-radius: 1rem; overflow: hidden; background: var(--blush); }
.af-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.af-pri { position: absolute; left: 0.5rem; top: 0.5rem; padding: 0.1rem 0.6rem; border-radius: 9999px; background: var(--ink); color: var(--gold-soft); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.af-ctrls { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem; }
.af-c { min-width: 2.4rem; height: 2.4rem; padding: 0 0.5rem; border: 1.5px solid var(--line-strong); background: var(--paper); border-radius: 0.7rem; color: var(--ink); font: 500 0.85rem var(--sans); cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.af-c:hover:not(:disabled) { border-color: var(--wine); color: var(--wine); background: var(--blush); }
.af-c:disabled { opacity: 0.35; cursor: not-allowed; }
.af-c--txt { font-size: 0.78rem; }
.af-c--del:hover:not(:disabled) { border-color: var(--danger); color: var(--danger); background: #fdecea; }
.af-vacio { font-size: 0.9rem; color: var(--muted); }
</style>
