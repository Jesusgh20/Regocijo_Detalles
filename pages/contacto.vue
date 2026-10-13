<template>
  <div>
    <PageHero eyebrow="Estamos para ti">
      <template #title>Hablemos de <em>tus flores</em></template>
      Cuéntanos qué necesitas y te ayudamos a elegir o a armar el ramo para ese momento especial.
    </PageHero>

    <div class="wrap section ct">
      <!-- Formulario -->
      <div class="ct-form-col">
        <form class="card" novalidate aria-labelledby="form-titulo" @submit.prevent="enviar">
          <header class="card-head">
            <p class="eyebrow">Escríbenos</p>
            <h2 id="form-titulo" class="card-title">Tu mensaje, por <em>WhatsApp</em></h2>
            <p class="card-sub">
              Completa el mensaje y se abrirá WhatsApp con todo listo. No usamos formularios que guarden tus datos en esta página.
            </p>
          </header>

          <div v-if="resumen.length" ref="resumenEl" class="errs" role="alert" tabindex="-1">
            <p><strong>Revisa estos campos:</strong></p>
            <ul>
              <li v-for="e in resumen" :key="e.campo"><a :href="`#f-${e.campo}`" @click.prevent="enfocar(e.campo)">{{ e.mensaje }}</a></li>
            </ul>
          </div>

          <div class="field">
            <label class="field-label" for="f-nombre">Tu nombre <span aria-hidden="true">*</span></label>
            <input id="f-nombre" v-model.trim="form.nombre" class="input" type="text" autocomplete="name" required maxlength="80"
              :aria-invalid="!!errores.nombre" :aria-describedby="errores.nombre ? 'e-nombre' : undefined" placeholder="¿Cómo te llamas?" @blur="validar('nombre')" />
            <p v-if="errores.nombre" id="e-nombre" class="field-error">{{ errores.nombre }}</p>
          </div>

          <fieldset class="field fs">
            <legend class="field-label">¿Sobre qué quieres hablar?</legend>
            <div class="chips" role="group">
              <button v-for="a in ASUNTOS" :key="a" type="button" class="chip" :aria-pressed="form.asunto === a" @click="form.asunto = a">{{ a }}</button>
            </div>
          </fieldset>

          <div class="field">
            <label class="field-label" for="f-mensaje">Mensaje <span aria-hidden="true">*</span></label>
            <textarea id="f-mensaje" v-model="form.mensaje" class="input" rows="5" required maxlength="500"
              :aria-invalid="!!errores.mensaje" :aria-describedby="errores.mensaje ? 'e-mensaje f-mensaje-n' : 'f-mensaje-n'"
              placeholder="Cuéntanos qué necesitas: tipo de flores, ocasión, fecha de entrega…" @blur="validar('mensaje')" />
            <div class="msg-foot">
              <p v-if="errores.mensaje" id="e-mensaje" class="field-error">{{ errores.mensaje }}</p>
              <p id="f-mensaje-n" class="field-hint msg-n">{{ form.mensaje.length }} / 500</p>
            </div>
          </div>

          <div class="field">
            <label class="check">
              <input id="f-consent" v-model="form.consentimiento" type="checkbox" required
                :aria-invalid="!!errores.consentimiento" :aria-describedby="errores.consentimiento ? 'e-consent' : undefined" />
              <span>
                Autorizo a {{ NEGOCIO.nombre }} a usar mi nombre y mi mensaje para responder esta consulta, conforme a la
                <NuxtLink to="/privacidad" class="link-inline">Política de Privacidad</NuxtLink>. <span aria-hidden="true">*</span>
              </span>
            </label>
            <p v-if="errores.consentimiento" id="e-consent" class="field-error">{{ errores.consentimiento }}</p>
          </div>

          <p class="legal">
            Al continuar, tu mensaje se enviará a través de <strong>WhatsApp</strong> (Meta), que lo trata bajo sus propias condiciones.
            Tú decides si lo envías.
          </p>

          <button type="submit" class="btn btn--wa btn--block" :class="{ 'btn--loading': abriendo }" :aria-busy="abriendo">
            <span v-if="abriendo" class="spinner" aria-hidden="true" />
            <IconWhatsApp v-else width="20" height="20" />
            {{ abriendo ? 'Abriendo WhatsApp…' : 'Continuar en WhatsApp' }}
          </button>

          <p v-if="enviado" class="ok" role="status">Listo. Revisa WhatsApp y pulsa «enviar» para que recibamos tu mensaje.</p>
        </form>
      </div>

      <!-- Información -->
      <div class="ct-info">
        <a :href="whatsappUrl('Hola, quiero información sobre sus ramos')" target="_blank" rel="noopener noreferrer" class="wa-card on-dark">
          <IconWhatsApp width="34" height="34" class="wa-ico" />
          <span class="wa-text">
            <strong>Escribir directamente</strong>
            <span>{{ NEGOCIO.whatsapp.display }}</span>
          </span>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          <span class="sr-only">(se abre en una pestaña nueva)</span>
        </a>

        <section class="card card--soft" aria-labelledby="datos-t">
          <h2 id="datos-t" class="mini-title">Datos de contacto</h2>
          <ul class="datos">
            <li>
              <span class="dato-k">Ubicación</span>
              <span>{{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }} · {{ NEGOCIO.modalidad }}</span>
            </li>
            <li>
              <span class="dato-k">Teléfono y WhatsApp</span>
              <a :href="`tel:+${NEGOCIO.whatsapp.e164}`" class="link-inline">{{ NEGOCIO.whatsapp.display }}</a>
            </li>
            <li v-if="NEGOCIO.email">
              <span class="dato-k">Correo</span>
              <a :href="`mailto:${NEGOCIO.email}`" class="link-inline">{{ NEGOCIO.email }}</a>
            </li>
            <li>
              <span class="dato-k">Instagram</span>
              <a :href="NEGOCIO.instagram.url" target="_blank" rel="noopener noreferrer" class="link-inline">
                {{ NEGOCIO.instagram.usuario }}<span class="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </section>

        <section class="card card--green" aria-labelledby="hor-t">
          <h2 id="hor-t" class="mini-title">Horario de atención</h2>
          <dl class="hor">
            <div v-for="h in NEGOCIO.horarios" :key="h.dia"><dt>{{ h.dia }}</dt><dd>{{ h.hora }}</dd></div>
            <div><dt>Entregas desde</dt><dd>{{ NEGOCIO.entregasDesde }}</dd></div>
          </dl>
        </section>

        <p class="priv-note">
          ¿Quieres consultar, corregir o eliminar tus datos? Mira cómo en la
          <NuxtLink to="/privacidad#derechos" class="link-inline">Política de Privacidad</NuxtLink>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const ASUNTOS = ['Pedido personalizado', 'Consulta de precios', 'Evento o boda', 'Otro']

const form = reactive({ nombre: '', asunto: ASUNTOS[0], mensaje: '', consentimiento: false })
const errores = reactive({ nombre: '', mensaje: '', consentimiento: '' })
const abriendo = ref(false)
const enviado = ref(false)
const resumenEl = ref<HTMLElement | null>(null)

type Campo = keyof typeof errores
function validar(c: Campo) {
  if (c === 'nombre') errores.nombre = form.nombre.length < 2 ? 'Escribe tu nombre.' : ''
  if (c === 'mensaje') errores.mensaje = form.mensaje.trim().length < 10 ? 'Cuéntanos un poco más (mínimo 10 caracteres).' : ''
  if (c === 'consentimiento') errores.consentimiento = form.consentimiento ? '' : 'Debes autorizar el uso de tus datos para continuar.'
}

const resumen = computed(() =>
  (Object.keys(errores) as Campo[]).filter((k) => errores[k]).map((k) => ({
    campo: k === 'consentimiento' ? 'consent' : k,
    mensaje: errores[k],
  })),
)

async function enfocar(campo: string) {
  await nextTick()
  document.getElementById(`f-${campo}`)?.focus()
}

let timer: ReturnType<typeof setTimeout>
async function enviar() {
  enviado.value = false
  ;(['nombre', 'mensaje', 'consentimiento'] as Campo[]).forEach(validar)
  if (resumen.value.length) {
    await nextTick()
    resumenEl.value?.focus()
    return
  }
  const texto = `Hola, soy ${form.nombre}.\nAsunto: ${form.asunto}\n\n${form.mensaje.trim()}\n\nAutorizo el tratamiento de mis datos para atender esta consulta.`
  window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer') // dentro del gesto del usuario
  abriendo.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    abriendo.value = false
    enviado.value = true
  }, 1400)
}
onBeforeUnmount(() => clearTimeout(timer))

useHead({
  title: 'Contacto – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Escríbenos por WhatsApp para pedir tu ramo o resolver tus dudas. Floristería con entrega a domicilio en Montería.' }],
})
</script>

<style scoped>
.ct { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 900px) { .ct { grid-template-columns: 1.15fr 0.85fr; gap: 4rem; } }

.card { display: grid; gap: 1.25rem; padding: clamp(1.5rem, 4vw, 2.75rem); background: var(--paper); border: 1px solid var(--line); border-radius: 2rem; box-shadow: var(--shadow-soft); }
.card-title { font-size: clamp(2rem, 4vw, 2.8rem); margin-top: 0.7rem; }
.card-sub { margin-top: 0.6rem; font-size: 0.95rem; color: var(--muted); }
.card--soft { background: var(--blush); box-shadow: none; }
.card--green { background: var(--sage-soft); box-shadow: none; border-color: rgba(63, 91, 60, 0.2); }
.mini-title { font-size: 1.7rem; }

.fs { border: 0; padding: 0; margin: 0; }
.fs legend { padding: 0; margin-bottom: 0.6rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.msg-foot { display: flex; justify-content: space-between; gap: 1rem; }
.msg-n { margin-left: auto; }
.errs { padding: 0.9rem 1.1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); font-size: 0.92rem; }
.errs ul { margin: 0.4rem 0 0; padding-left: 1.1rem; list-style: disc; }
.errs a { color: var(--danger); text-decoration: underline; }
.legal { font-size: 0.85rem; color: var(--muted); }
.legal strong { color: var(--ink); font-weight: 500; }
.ok { padding: 0.9rem 1.1rem; background: var(--sage-soft); color: var(--sage); border-radius: 0.9rem; font-size: 0.92rem; }

.ct-info { display: grid; gap: 1.25rem; }
.wa-card { display: flex; align-items: center; gap: 1rem; padding: 1.4rem 1.6rem; background: var(--wa); color: #fff; border-radius: 1.6rem; text-decoration: none; box-shadow: 0 20px 40px -20px rgba(14, 97, 57, 0.7); transition: background 0.3s, transform 0.4s var(--ease-out), box-shadow 0.4s; }
.wa-card:hover { background: var(--wa-deep); transform: translateY(-4px); box-shadow: 0 28px 50px -20px rgba(14, 97, 57, 0.8); }
.wa-card:active { transform: scale(0.98); }
.wa-ico { flex-shrink: 0; }
.wa-text { display: grid; flex: 1; line-height: 1.3; }
.wa-text strong { font: 500 1.7rem/1.1 var(--serif); }
.wa-card > svg:last-of-type { transition: transform 0.4s var(--ease-out); }
.wa-card:hover > svg:last-of-type { transform: translateX(5px); }

.datos { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 0.9rem; }
.datos li { display: grid; gap: 0.1rem; }
.dato-k { font: 500 0.7rem var(--sans); letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); }
.hor { margin: 1rem 0 0; display: grid; gap: 0.5rem; }
.hor div { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 0.5rem; border-bottom: 1px dashed rgba(63, 91, 60, 0.3); }
.hor div:last-child { border-bottom: 0; }
.hor dt { color: var(--body); }
.hor dd { margin: 0; font-weight: 500; color: var(--ink); text-align: right; white-space: nowrap; }
.priv-note { font-size: 0.88rem; color: var(--muted); }
</style>
