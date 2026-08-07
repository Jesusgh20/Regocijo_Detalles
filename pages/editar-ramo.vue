<template>
  <div>

    <!-- ── HERO ──────────────────────────────────────────── -->
    <section class="editor-hero">
      <client-only><PetalCanvas /></client-only>
      <div class="editor-hero-orb editor-hero-orb--1"></div>
      <div class="editor-hero-orb editor-hero-orb--2"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-14 text-center relative z-10">
        <p class="section-label mb-3">Configurador visual</p>
        <h1 class="editor-titulo">
          Edita tu <em style="font-style:italic;color:#f25480;">Ramo</em>
        </h1>
        <p class="editor-subtitulo">
          Elige las flores que quieres, elige los colores, y ve cómo queda tu ramo en tiempo real.<br>
          El precio se actualiza automáticamente mientras construyes.
        </p>
      </div>
    </section>

    <!-- ── BARRA DE PRECIO STICKY ──────────────────────── -->
    <div class="barra-precio-sticky">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="barra-precio-inner">

          <!-- Total -->
          <div class="barra-total-group">
            <span class="barra-label">Tu ramo</span>
            <div class="barra-precio-valor">
              <span v-if="store.totalFlores === 0" class="barra-precio-cero">Agrega flores 🌸</span>
              <template v-else>
                <span class="barra-precio-numero">{{ store.formatPrecio(store.precioTotal) }}</span>
                <span v-if="store.tienePrecioIncompleto" class="barra-incompleto" title="Algunas flores no tienen precio confirmado">+ por confirmar</span>
              </template>
            </div>
          </div>

          <!-- Resumen flores -->
          <div class="barra-resumen" v-if="store.totalFlores > 0">
            <span class="barra-flores-count">{{ store.totalFlores }} flor{{ store.totalFlores !== 1 ? 'es' : '' }}</span>
            <span class="barra-tamano-badge">{{ store.tamanoAproximado.codigo }} · {{ store.tamanoAproximado.nombre }}</span>
          </div>

          <!-- Botones -->
          <div class="barra-acciones">
            <button
              v-if="store.totalFlores > 0"
              class="barra-limpiar-btn"
              @click="confirmarLimpiar"
            >Limpiar</button>
            <button
              class="barra-pedir-btn"
              :disabled="store.totalFlores === 0"
              @click="abrirResumen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
              </svg>
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── EDITOR PRINCIPAL ───────────────────────────── -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <div class="editor-grid">

        <!-- Columna izquierda: selector -->
        <div class="editor-col-selector">
          <div class="selector-card">
            <div class="selector-card-header">
              <h2 class="selector-titulo">Elige tus flores</h2>
              <p class="selector-hint">Usa + y − para ajustar la cantidad de cada flor</p>
            </div>
            <client-only>
              <EditorSelector />
            </client-only>
          </div>
        </div>

        <!-- Columna derecha: lienzo -->
        <div class="editor-col-lienzo">
          <div class="lienzo-sticky">
            <div class="lienzo-card">
              <h2 class="lienzo-titulo">Vista previa en vivo</h2>
              <client-only>
                <EditorLienzo />
              </client-only>

              <!-- Desglose de precio expandible -->
              <div v-if="store.totalFlores > 0" class="desglose-wrapper">
                <button class="desglose-toggle" @click="desgloseAbierto = !desgloseAbierto">
                  <span>Ver desglose de precio</span>
                  <svg :style="{ transform: desgloseAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }" xmlns="http://www.w3.org/2000/svg" style="height:0.85rem;width:0.85rem;" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
                <Transition name="desglose-anim">
                  <div v-if="desgloseAbierto" class="desglose-contenido">
                    <div v-for="{ flor, cantidad } in store.floresActivas" :key="flor.id" class="desglose-fila">
                      <span class="desglose-emoji">{{ flor.emoji }}</span>
                      <span class="desglose-nombre">{{ flor.nombre }} × {{ cantidad }}</span>
                      <span class="desglose-subtotal">
                        <template v-if="flor.precio_unidad !== null">
                          {{ store.formatPrecio(flor.precio_unidad * cantidad) }}
                        </template>
                        <template v-else>
                          <span style="color:#f59e0b;font-size:0.72rem;">Por confirmar</span>
                        </template>
                      </span>
                    </div>
                    <div class="desglose-fila desglose-fila--extra">
                      <span class="desglose-emoji">🎀</span>
                      <span class="desglose-nombre">{{ store.envoltura.nombre }}</span>
                      <span class="desglose-subtotal">Incluido</span>
                    </div>
                    <div class="desglose-fila desglose-fila--extra">
                      <span class="desglose-emoji">🎗️</span>
                      <span class="desglose-nombre">{{ store.mono.nombre }}</span>
                      <span class="desglose-subtotal">Incluido</span>
                    </div>
                    <div class="desglose-total-row">
                      <span>Total estimado</span>
                      <span class="desglose-total-num">{{ store.formatPrecio(store.precioTotal) }}</span>
                    </div>
                    <p v-if="store.tienePrecioIncompleto" class="desglose-aviso">
                      ⚠️ Algunas flores tienen precio por confirmar con el negocio.
                    </p>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── MODAL RESUMEN / PEDIDO ─────────────────────── -->
    <Transition name="modal-anim">
      <div v-if="modalAbierto" class="modal-overlay" @click.self="modalAbierto = false">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-titulo">Resumen de tu ramo 🌸</h3>
            <button class="modal-cerrar" @click="modalAbierto = false">×</button>
          </div>

          <div class="modal-body">
            <div class="modal-tamano">
              <span class="modal-tamano-codigo">{{ store.tamanoAproximado.codigo }}</span>
              <div>
                <p style="font-family:'Jost',sans-serif;font-weight:600;font-size:0.9rem;color:#292524;">Tamaño aproximado: {{ store.tamanoAproximado.nombre }}</p>
                <p style="font-family:'Jost',sans-serif;font-size:0.78rem;color:#78716c;">{{ store.tamanoAproximado.descripcion }}</p>
              </div>
            </div>

            <div class="modal-flores">
              <div v-for="{ flor, cantidad } in store.floresActivas" :key="flor.id" class="modal-flor-fila">
                <span>{{ flor.emoji }} {{ flor.nombre }}</span>
                <span class="modal-cantidad">× {{ cantidad }}</span>
              </div>
              <div class="modal-flor-fila modal-flor-fila--sep">
                <span>🎀 {{ store.envoltura.nombre }}</span>
                <span class="modal-cantidad">Incluido</span>
              </div>
              <div class="modal-flor-fila">
                <span>🎗️ {{ store.mono.nombre }}</span>
                <span class="modal-cantidad">Incluido</span>
              </div>
            </div>

            <div class="modal-precio-bloque">
              <span class="modal-precio-label">Total estimado</span>
              <span class="modal-precio-valor">{{ store.formatPrecio(store.precioTotal) }}</span>
            </div>
            <p v-if="store.tienePrecioIncompleto" class="modal-aviso">
              ⚠️ Algunas flores tienen precio pendiente — el negocio te dará el precio exacto al contactarte.
            </p>
          </div>

          <div class="modal-footer">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              class="modal-wa-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
              </svg>
              Pedir ahora por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '~/stores/editor'
import EditorLienzo from '~/components/EditorLienzo.vue'
import EditorSelector from '~/components/EditorSelector.vue'

const store = useEditorStore()

const desgloseAbierto = ref(false)
const modalAbierto    = ref(false)

const WHATSAPP_NUMBER = '573127506785'

const whatsappUrl = computed(() => {
  if (store.totalFlores === 0) return '#'

  let msg = '🌸 *Ramo personalizado — Regocijo Floristería*\n\n'

  for (const { flor, cantidad } of store.floresActivas) {
    msg += `• ${cantidad} ${flor.nombre}${cantidad > 1 ? 's' : ''}\n`
  }

  msg += `• Envoltura: ${store.envoltura.nombre}\n`
  msg += `• Moño: ${store.mono.nombre}\n`
  msg += `\nTamaño aproximado: *${store.tamanoAproximado.codigo} — ${store.tamanoAproximado.nombre}*\n`

  if (store.tienePrecioIncompleto) {
    msg += `\nTotal parcial: *${store.formatPrecio(store.precioTotal)}* (+ flores por cotizar)\n`
    msg += '\n⚠️ Algunas flores están pendientes de precio — me puedes confirmar el total?\n'
  } else {
    msg += `\nTotal estimado: *${store.formatPrecio(store.precioTotal)}*\n`
  }

  msg += '\n¡Gracias! 🌺'

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
})

function abrirResumen() {
  if (store.totalFlores === 0) return
  modalAbierto.value = true
}

function confirmarLimpiar() {
  if (confirm('¿Quieres empezar de nuevo y quitar todas las flores?')) {
    store.limpiar()
    desgloseAbierto.value = false
  }
}

useHead({
  title: 'Edita tu Ramo — Regocijo Floristería',
  meta: [{ name: 'description', content: 'Crea tu ramo personalizado eligiendo flor por flor. Ve la vista previa en tiempo real y pídelo directamente por WhatsApp.' }],
})
</script>

<style scoped>
/* Hero */
.editor-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, #ffe8ee 0%, #faf8f3 50%, #e6eedd 100%);
  padding-top: 1rem;
}
.editor-hero-orb {
  position: absolute; border-radius: 50%; pointer-events: none;
}
.editor-hero-orb--1 {
  top: -60px; right: -60px; width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(255,197,213,0.4) 0%, transparent 70%);
}
.editor-hero-orb--2 {
  bottom: -30px; left: 5%; width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(205,220,188,0.3) 0%, transparent 70%);
}
.editor-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  color: #292524; line-height: 1; margin-bottom: 1rem;
}
.editor-subtitulo {
  font-family: 'Jost', sans-serif; font-size: 0.95rem;
  color: #78716c; max-width: 500px; margin: 0 auto; line-height: 1.8;
}

/* Barra sticky */
.barra-precio-sticky {
  position: sticky; top: 72px; z-index: 40;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #ffe8ee;
  padding: 0.75rem 0;
  box-shadow: 0 4px 20px rgba(242,84,128,0.08);
}
.barra-precio-inner {
  display: flex; align-items: center; gap: 1rem;
  flex-wrap: wrap;
}
.barra-total-group { flex: 1; min-width: 0; }
.barra-label {
  font-family: 'Jost', sans-serif; font-size: 0.68rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: #a8a29e; display: block;
}
.barra-precio-cero {
  font-family: 'Jost', sans-serif; font-size: 0.9rem; color: #c4bfbb;
}
.barra-precio-numero {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem; color: #d43868; font-weight: 500;
}
.barra-incompleto {
  font-family: 'Jost', sans-serif; font-size: 0.72rem;
  color: #f59e0b; margin-left: 0.4rem;
}
.barra-resumen {
  display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
}
.barra-flores-count {
  font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #78716c;
}
.barra-tamano-badge {
  padding: 0.2rem 0.65rem;
  background: #fff5f7; color: #a8264f;
  border: 1px solid #ffc5d5; border-radius: 9999px;
  font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 600;
}
.barra-acciones { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.barra-limpiar-btn {
  font-family: 'Jost', sans-serif; font-size: 0.78rem;
  color: #a8a29e; background: none; border: none;
  cursor: pointer; text-decoration: underline;
  transition: color 0.15s;
}
.barra-limpiar-btn:hover { color: #f25480; }
.barra-pedir-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background: #25D366; color: white;
  font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.85rem;
  border-radius: 9999px; border: none; cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(37,211,102,0.3);
}
.barra-pedir-btn:hover:not(:disabled) {
  background: #1fba59; transform: translateY(-1px);
  box-shadow: 0 6px 22px rgba(37,211,102,0.35);
}
.barra-pedir-btn:disabled {
  opacity: 0.4; cursor: not-allowed; box-shadow: none;
}

/* Grid del editor */
.editor-grid {
  display: grid; grid-template-columns: 1fr; gap: 2rem;
}
@media (min-width: 768px) {
  .editor-grid { grid-template-columns: 1fr 1fr; align-items: start; gap: 2.5rem; }
}
@media (min-width: 1024px) {
  .editor-grid { grid-template-columns: 5fr 6fr; }
}

/* Selector card */
.selector-card {
  background: white; border-radius: 1.25rem;
  border: 1px solid #ffe8ee;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  overflow: hidden;
}
.selector-card-header {
  padding: 1.25rem 1.25rem 0.75rem;
  border-bottom: 1px solid #ffe8ee;
}
.selector-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; color: #292524; margin-bottom: 0.2rem;
}
.selector-hint {
  font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #a8a29e;
}
.selector-card :deep(.selector-wrapper) { padding: 1rem 1.25rem 1.25rem; }

/* Lienzo card */
.lienzo-sticky { position: sticky; top: 150px; }
.lienzo-card {
  background: white; border-radius: 1.25rem;
  border: 1px solid #ffe8ee;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  overflow: hidden; padding: 1.25rem;
}
.lienzo-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; color: #292524;
  margin-bottom: 1rem;
}

/* Desglose */
.desglose-wrapper {
  margin-top: 1.25rem;
  border-top: 1px solid #ffe8ee;
  padding-top: 0.875rem;
}
.desglose-toggle {
  display: flex; align-items: center; gap: 0.4rem;
  font-family: 'Jost', sans-serif; font-size: 0.78rem;
  color: #f25480; background: none; border: none;
  cursor: pointer; padding: 0; transition: color 0.15s;
}
.desglose-toggle:hover { color: #d43868; }
.desglose-contenido {
  margin-top: 0.75rem;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.desglose-fila {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #44403c;
}
.desglose-fila--sep { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #ffe8ee; }
.desglose-emoji { font-size: 1rem; flex-shrink: 0; }
.desglose-nombre { flex: 1; }
.desglose-subtotal { color: #d43868; font-weight: 600; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.95rem; }
.desglose-total-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 0.75rem; padding-top: 0.75rem;
  border-top: 2px solid #ffe8ee;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 600; color: #292524;
}
.desglose-total-num {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem; color: #d43868;
}
.desglose-aviso {
  font-family: 'Jost', sans-serif; font-size: 0.72rem; color: #f59e0b;
  margin-top: 0.5rem; background: #fffbeb; border-radius: 0.5rem;
  padding: 0.4rem 0.65rem;
}

/* Transición desglose */
.desglose-anim-enter-active, .desglose-anim-leave-active { transition: all 0.22s ease; }
.desglose-anim-enter-from, .desglose-anim-leave-to { opacity: 0; transform: translateY(-6px); }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.modal-box {
  background: white; border-radius: 1.5rem;
  max-width: 420px; width: 100%;
  box-shadow: 0 24px 60px rgba(0,0,0,0.2);
  overflow: hidden;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #ffe8ee;
  background: linear-gradient(135deg, #fff5f7, #faf8f3);
}
.modal-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; color: #292524;
}
.modal-cerrar {
  font-size: 1.5rem; color: #a8a29e; background: none;
  border: none; cursor: pointer; line-height: 1;
  transition: color 0.15s;
}
.modal-cerrar:hover { color: #f25480; }
.modal-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.modal-tamano {
  display: flex; align-items: center; gap: 0.875rem;
  padding: 0.875rem; background: #fff5f7;
  border-radius: 0.875rem; border: 1px solid #ffc5d5;
}
.modal-tamano-codigo {
  font-family: 'Jost', sans-serif; font-weight: 800;
  font-size: 1.3rem; color: #f25480;
}
.modal-flores {
  background: #faf8f3; border-radius: 0.875rem;
  padding: 0.875rem; display: flex; flex-direction: column; gap: 0.4rem;
}
.modal-flor-fila {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #44403c;
}
.modal-flor-fila--sep {
  margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #e7e5e4;
}
.modal-cantidad { color: #a8a29e; }
.modal-precio-bloque {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.875rem 1rem;
  border: 2px solid #ffc5d5; border-radius: 0.875rem;
}
.modal-precio-label {
  font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #78716c;
}
.modal-precio-valor {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem; color: #d43868; font-weight: 500;
}
.modal-aviso {
  font-family: 'Jost', sans-serif; font-size: 0.72rem; color: #f59e0b;
  background: #fffbeb; border-radius: 0.5rem; padding: 0.5rem 0.75rem;
}
.modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #ffe8ee; }
.modal-wa-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  width: 100%; padding: 0.875rem;
  background: #25D366; color: white;
  font-family: 'Jost', sans-serif; font-weight: 700; font-size: 0.9rem;
  border-radius: 9999px; text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(37,211,102,0.3);
}
.modal-wa-btn:hover {
  background: #1fba59; transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37,211,102,0.35);
}

/* Transición modal */
.modal-anim-enter-active, .modal-anim-leave-active { transition: all 0.25s ease; }
.modal-anim-enter-from, .modal-anim-leave-to { opacity: 0; }
.modal-anim-enter-from .modal-box, .modal-anim-leave-to .modal-box {
  transform: scale(0.94) translateY(10px);
}
</style>
