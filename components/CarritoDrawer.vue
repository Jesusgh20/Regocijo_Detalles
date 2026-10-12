<template>
  <Teleport to="body">
    <Transition name="cd-backdrop">
      <div v-if="abierto" class="cd-backdrop" aria-hidden="true" @click="cerrar" />
    </Transition>

    <Transition name="cd-slide">
      <div
        v-if="abierto"
        ref="panel"
        class="cd"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-titulo"
      >
        <!-- Cabecera -->
        <div class="cd-head">
          <div>
            <h2 id="cd-titulo" class="cd-title">Tu carrito</h2>
            <p class="cd-sub" aria-live="polite">
              {{ store.cantidadCarrito }} {{ store.cantidadCarrito === 1 ? 'ramo' : 'ramos' }}
            </p>
          </div>
          <button type="button" class="icon-btn" data-autofocus aria-label="Cerrar carrito" @click="cerrar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <!-- Estado vacío -->
        <div v-if="store.carritoItems.length === 0" class="cd-empty">
          <Ornament variant="bloom" class="cd-empty-orn" />
          <h3 class="cd-empty-title">Tu carrito está vacío</h3>
          <p class="cd-empty-text">Cuando encuentres un ramo que te enamore, agrégalo y lo agendamos por WhatsApp.</p>
          <NuxtLink to="/catalogo" class="btn btn--wine" @click="cerrar">
            Explorar el catálogo <span class="btn-arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <!-- Contenido -->
        <div v-else class="cd-body">
          <ul class="cd-items">
            <TransitionGroup name="cd-item">
              <li v-for="item in store.carritoItems" :key="`${item.ramo.id}-${item.tamano.value}`" class="cd-item">
                <NuxtLink :to="`/producto/${item.ramo.slug}`" class="cd-thumb" tabindex="-1" aria-hidden="true" @click="cerrar">
                  <RamoImagen :src="item.ramo.imagen_url" alt="" :categoria="item.ramo.categoria" compacto />
                </NuxtLink>
                <div class="cd-info">
                  <NuxtLink :to="`/producto/${item.ramo.slug}`" class="cd-name" @click="cerrar">{{ item.ramo.nombre }}</NuxtLink>
                  <p class="cd-size">{{ item.tamano.label }}</p>
                  <p class="cd-price">{{ formatPrecio(item.tamano.precio * item.cantidad) }}</p>
                </div>
                <div class="cd-qty" role="group" :aria-label="`Cantidad de ${item.ramo.nombre}`">
                  <button type="button" class="cd-qbtn" :aria-label="`Quitar una unidad de ${item.ramo.nombre}`" @click="store.quitarDelCarrito(item.ramo.id, item.tamano.value)">−</button>
                  <span class="cd-qnum" aria-live="polite">{{ item.cantidad }}</span>
                  <button type="button" class="cd-qbtn" :aria-label="`Agregar una unidad de ${item.ramo.nombre}`" @click="store.agregarAlCarrito(item.ramo, item.tamano)">+</button>
                </div>
                <button type="button" class="cd-remove" :aria-label="`Eliminar ${item.ramo.nombre} del carrito`" @click="store.eliminarDelCarrito(item.ramo.id, item.tamano.value)">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" /></svg>
                </button>
              </li>
            </TransitionGroup>
          </ul>

          <div class="cd-total">
            <span>Subtotal estimado</span>
            <strong>{{ formatPrecio(store.totalCarrito) }}</strong>
          </div>
          <p class="cd-note">
            El domicilio y los extras (por ejemplo, el peluche del ramo Ternura) se confirman contigo por WhatsApp antes de pagar.
          </p>

          <!-- Formulario -->
          <form class="cd-form" novalidate aria-labelledby="cd-form-titulo" @submit.prevent="enviar">
            <h3 id="cd-form-titulo" class="cd-form-title">Datos para agendar la entrega</h3>
            <p class="cd-form-sub">Solo pedimos lo necesario para entregar tu pedido en {{ NEGOCIO.ciudad }}.</p>

            <div v-if="resumenErrores.length" ref="resumen" class="cd-errors" role="alert" tabindex="-1">
              <p><strong>Revisa estos campos:</strong></p>
              <ul>
                <li v-for="e in resumenErrores" :key="e.campo"><a :href="`#c-${e.campo}`" @click.prevent="enfocar(e.campo)">{{ e.mensaje }}</a></li>
              </ul>
            </div>

            <div class="field">
              <label class="field-label" for="c-nombre">Tu nombre <span aria-hidden="true">*</span></label>
              <input id="c-nombre" v-model.trim="form.nombre" class="input" type="text" autocomplete="name" required maxlength="80"
                :aria-invalid="!!errores.nombre" :aria-describedby="errores.nombre ? 'e-nombre' : undefined" placeholder="¿Cómo te llamas?" />
              <p v-if="errores.nombre" id="e-nombre" class="field-error">{{ errores.nombre }}</p>
            </div>

            <div class="field">
              <label class="field-label" for="c-fecha">Fecha de entrega <span aria-hidden="true">*</span></label>
              <input id="c-fecha" v-model="form.fecha" class="input" type="date" required :min="hoy"
                :aria-invalid="!!errores.fecha" :aria-describedby="errores.fecha ? 'e-fecha c-fecha-h' : 'c-fecha-h'" />
              <p id="c-fecha-h" class="field-hint">Agenda con 1 a 2 días de anticipación; el mismo día depende de la disponibilidad.</p>
              <p v-if="errores.fecha" id="e-fecha" class="field-error">{{ errores.fecha }}</p>
            </div>

            <div class="field">
              <label class="field-label" for="c-direccion">Barrio y dirección <span aria-hidden="true">*</span></label>
              <input id="c-direccion" v-model.trim="form.direccion" class="input" type="text" autocomplete="street-address" required maxlength="140"
                :aria-invalid="!!errores.direccion" :aria-describedby="errores.direccion ? 'e-direccion' : undefined" placeholder="Barrio y dirección en Montería" />
              <p v-if="errores.direccion" id="e-direccion" class="field-error">{{ errores.direccion }}</p>
            </div>

            <div class="cd-row">
              <div class="field">
                <label class="field-label" for="c-ocasion">Ocasión <span class="opt">(opcional)</span></label>
                <select id="c-ocasion" v-model="form.ocasion" class="input">
                  <option value="">Sin especificar</option>
                  <option v-for="o in OCASIONES" :key="o" :value="o">{{ o }}</option>
                </select>
              </div>
              <div class="field">
                <label class="field-label" for="c-tel">Teléfono de quien recibe <span class="opt">(opcional)</span></label>
                <input id="c-tel" v-model.trim="form.telefono" class="input" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="300 000 0000" />
              </div>
            </div>

            <div class="field">
              <label class="field-label" for="c-nota">Dedicatoria o nota <span class="opt">(opcional)</span></label>
              <textarea id="c-nota" v-model="form.nota" class="input" rows="3" maxlength="300" placeholder="Mensaje para la tarjeta, color preferido, indicaciones de entrega…" />
              <p class="field-hint">{{ form.nota.length }} / 300</p>
            </div>

            <div class="field">
              <label class="check">
                <input id="c-consent" v-model="form.consentimiento" type="checkbox" required
                  :aria-invalid="!!errores.consentimiento" :aria-describedby="errores.consentimiento ? 'e-consent' : undefined" />
                <span>
                  Autorizo a {{ NEGOCIO.nombre }} a usar estos datos para gestionar y entregar mi pedido, conforme a la
                  <NuxtLink to="/privacidad" class="link-inline" @click="cerrar">Política de Privacidad</NuxtLink>
                  y los <NuxtLink to="/terminos" class="link-inline" @click="cerrar">Términos y Condiciones</NuxtLink>.
                  <span aria-hidden="true">*</span>
                </span>
              </label>
              <p v-if="errores.consentimiento" id="e-consent" class="field-error">{{ errores.consentimiento }}</p>
            </div>

            <p class="cd-legal">
              Al pulsar el botón se abrirá WhatsApp con tu pedido ya escrito. <strong>No enviamos nada hasta que tú lo envíes</strong>
              desde WhatsApp, y esta página no guarda lo que escribes aquí.
            </p>

            <button type="submit" class="btn btn--wa btn--block" :class="{ 'btn--loading': abriendo }" :aria-busy="abriendo">
              <span v-if="abriendo" class="spinner" aria-hidden="true" />
              <IconWhatsApp v-else width="20" height="20" />
              {{ abriendo ? 'Abriendo WhatsApp…' : 'Enviar pedido por WhatsApp' }}
            </button>

            <p v-if="enviado" class="cd-ok" role="status">
              Listo. Revisa WhatsApp y pulsa «enviar» para que recibamos tu pedido.
              <button type="button" class="link-inline cd-clear" @click="vaciar">Vaciar carrito</button>
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'
import { useProductosStore } from '~/stores/productos'

const store = useProductosStore()
const { abierto, cerrar } = useCarritoUI()
const panel = ref<HTMLElement | null>(null)
const resumen = ref<HTMLElement | null>(null)
useFocusTrap(abierto, panel, cerrar)

const route = useRoute()
watch(() => route.fullPath, cerrar)

const OCASIONES = ['Cumpleaños', 'Aniversario', 'San Valentín', 'Día de la Madre', 'Amor y Amistad', 'Graduación', 'Otra']

const hoy = computed(() => fechaLocalISO(0))
const form = reactive({ nombre: '', fecha: '', direccion: '', ocasion: '', telefono: '', nota: '', consentimiento: false })
const errores = reactive({ nombre: '', fecha: '', direccion: '', consentimiento: '' })
const abriendo = ref(false)
const enviado = ref(false)

const resumenErrores = computed(() =>
  (Object.keys(errores) as (keyof typeof errores)[])
    .filter((k) => errores[k])
    .map((k) => ({ campo: k === 'consentimiento' ? 'consent' : k, mensaje: errores[k] })),
)

function validar(): boolean {
  errores.nombre = form.nombre.length < 2 ? 'Escribe tu nombre.' : ''
  errores.fecha = !form.fecha
    ? 'Elige la fecha de entrega.'
    : form.fecha < hoy.value ? 'La fecha de entrega no puede ser anterior a hoy.' : ''
  errores.direccion = form.direccion.length < 5 ? 'Escribe el barrio y la dirección de entrega.' : ''
  errores.consentimiento = form.consentimiento ? '' : 'Debes autorizar el uso de tus datos para poder enviar el pedido.'
  return !resumenErrores.value.length
}

async function enfocar(campo: string) {
  await nextTick()
  document.getElementById(`c-${campo}`)?.focus()
}

function construirMensaje(): string {
  const l: string[] = []
  l.push('*PEDIDO – Regocijo Floristería*', '')
  l.push('*Ramos:*')
  for (const i of store.carritoItems) {
    l.push(`• ${i.ramo.nombre} – ${i.tamano.label} × ${i.cantidad} = ${formatPrecio(i.tamano.precio * i.cantidad)}`)
  }
  l.push('', `*Subtotal estimado:* ${formatPrecio(store.totalCarrito)} (domicilio y extras por confirmar)`, '')
  l.push('*Datos de entrega:*')
  l.push(`• Nombre: ${form.nombre}`)
  l.push(`• Fecha: ${fechaLarga(form.fecha)}`)
  l.push(`• Dirección: ${form.direccion}`)
  if (form.ocasion) l.push(`• Ocasión: ${form.ocasion}`)
  if (form.telefono) l.push(`• Teléfono de quien recibe: ${form.telefono}`)
  if (form.nota) l.push(`• Nota: ${form.nota}`)
  l.push('', 'Autorizo el tratamiento de mis datos para gestionar este pedido.')
  return l.join('\n')
}

let timer: ReturnType<typeof setTimeout>
async function enviar() {
  enviado.value = false
  if (!validar()) {
    await nextTick()
    resumen.value?.focus()
    return
  }
  // window.open debe ejecutarse dentro del gesto del usuario (si no, los navegadores lo bloquean)
  window.open(whatsappUrl(construirMensaje()), '_blank', 'noopener,noreferrer')
  abriendo.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { abriendo.value = false; enviado.value = true }, 1400)
}

function vaciar() {
  store.vaciarCarrito()
  Object.assign(form, { nombre: '', fecha: '', direccion: '', ocasion: '', telefono: '', nota: '', consentimiento: false })
  enviado.value = false
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.cd-backdrop { position: fixed; inset: 0; z-index: 9990; background: rgba(42, 26, 31, 0.55); backdrop-filter: blur(5px); }
.cd-backdrop-enter-active, .cd-backdrop-leave-active { transition: opacity 0.4s; }
.cd-backdrop-enter-from, .cd-backdrop-leave-to { opacity: 0; }

.cd {
  position: fixed; z-index: 9995; top: 0; right: 0; bottom: 0;
  width: min(30rem, 100vw);
  display: flex; flex-direction: column;
  background: var(--cream); color: var(--body);
  box-shadow: -20px 0 60px -20px rgba(42, 26, 31, 0.5);
}
.cd-slide-enter-active, .cd-slide-leave-active { transition: transform 0.55s var(--ease-out); }
.cd-slide-enter-from, .cd-slide-leave-to { transform: translateX(100%); }

.cd-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.4rem 1.5rem 1.1rem; border-bottom: 1px solid var(--line); background: var(--blush); }
.cd-title { font-size: 2rem; }
.cd-sub { font-size: 0.82rem; color: var(--muted); letter-spacing: 0.06em; }

/* Vacío */
.cd-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.9rem; padding: 2rem; text-align: center; }
.cd-empty-orn { width: 6.5rem; color: var(--rose); opacity: 0.55; margin-bottom: 0.5rem; }
.cd-empty-title { font-size: 2rem; }
.cd-empty-text { max-width: 20rem; color: var(--body); margin-bottom: 0.75rem; }

/* Cuerpo */
.cd-body { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem 2rem; scrollbar-width: thin; scrollbar-color: var(--blush-deep) transparent; }
.cd-items { list-style: none; padding: 0; margin: 0 0 1.25rem; display: grid; gap: 0.75rem; }
.cd-item { display: grid; grid-template-columns: 4.5rem 1fr auto; grid-template-areas: 'thumb info remove' 'thumb qty qty'; gap: 0.35rem 0.9rem; align-items: center; padding: 0.8rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.1rem; transition: box-shadow 0.3s, border-color 0.3s; }
.cd-item:hover { box-shadow: var(--shadow-soft); border-color: var(--blush-deep); }
.cd-thumb { grid-area: thumb; display: block; width: 4.5rem; height: 5.6rem; border-radius: 0.8rem; overflow: hidden; }
.cd-info { grid-area: info; min-width: 0; }
.cd-name { display: block; font: 500 1.2rem/1.15 var(--serif); color: var(--ink); text-decoration: none; transition: color 0.2s; }
.cd-name:hover { color: var(--wine); }
.cd-size { font-size: 0.82rem; color: var(--muted); line-height: 1.35; }
.cd-price { font: 500 1.15rem var(--serif); color: var(--wine); margin-top: 0.15rem; }
.cd-qty { grid-area: qty; display: inline-flex; align-items: center; width: fit-content; border: 1.5px solid var(--line-strong); border-radius: 9999px; }
.cd-qbtn { width: 2.5rem; height: 2.5rem; border: 0; background: transparent; border-radius: 50%; color: var(--ink); font-size: 1.2rem; cursor: pointer; transition: background 0.2s, color 0.2s; }
.cd-qbtn:hover { background: var(--blush); color: var(--wine); }
.cd-qbtn:active { transform: scale(0.9); }
.cd-qnum { min-width: 1.8rem; text-align: center; font-weight: 500; color: var(--ink); }
.cd-remove { grid-area: remove; align-self: start; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 0; background: transparent; color: var(--muted); border-radius: 50%; cursor: pointer; transition: background 0.2s, color 0.2s; }
.cd-remove:hover { background: #fdecea; color: var(--danger); }

.cd-item-enter-active, .cd-item-leave-active { transition: all 0.35s var(--ease-out); }
.cd-item-enter-from, .cd-item-leave-to { opacity: 0; transform: translateX(1.5rem); }

.cd-total { display: flex; justify-content: space-between; align-items: baseline; padding: 1rem 1.1rem; background: var(--blush); border-radius: 1rem; }
.cd-total span { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--body); }
.cd-total strong { font: 500 1.9rem var(--serif); color: var(--wine-deep); }
.cd-note { margin: 0.6rem 0 1.5rem; font-size: 0.85rem; color: var(--muted); }

/* Formulario */
.cd-form { display: grid; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.cd-form-title { font-size: 1.6rem; }
.cd-form-sub { font-size: 0.88rem; color: var(--muted); margin-top: -0.6rem; }
.cd-row { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 440px) { .cd-row { grid-template-columns: 1fr 1fr; } }
.cd-errors { padding: 0.9rem 1.1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); font-size: 0.9rem; }
.cd-errors ul { margin: 0.4rem 0 0; padding-left: 1.1rem; list-style: disc; }
.cd-errors a { color: var(--danger); text-decoration: underline; }
.cd-legal { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }
.cd-legal strong { color: var(--ink); font-weight: 500; }
.cd-ok { padding: 0.9rem 1.1rem; background: var(--sage-soft); color: var(--sage); border-radius: 0.9rem; font-size: 0.9rem; }
.cd-clear { background: none; border: 0; padding: 0; cursor: pointer; font: inherit; margin-left: 0.4rem; }
</style>
