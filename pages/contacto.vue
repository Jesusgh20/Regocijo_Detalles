<template>
  <div>

    <!-- ══════════════════════════════════════
         HEADER
    ══════════════════════════════════════ -->
    <section class="contacto-header">
      <div class="absolute inset-0 pointer-events-none">
        <div style="position:absolute;top:-60px;right:-60px;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(255,197,213,0.35) 0%,transparent 70%);"></div>
        <div style="position:absolute;bottom:-30px;left:5%;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(205,220,188,0.25) 0%,transparent 70%);"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <p class="section-label mb-3">Estamos para ti</p>
        <h1 class="contacto-title">Hablemos de<br><em class="text-gradient-floral">tus flores</em></h1>
        <p class="contacto-subtitle">
          Cuéntanos qué necesitas y con gusto te ayudamos a crear el arreglo perfecto para ese momento especial.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         CONTENIDO PRINCIPAL
    ══════════════════════════════════════ -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="contacto-grid">

        <!-- ── COLUMNA IZQUIERDA: Formulario ── -->
        <div class="formulario-col">

          <div class="formulario-card">
            <div style="margin-bottom:2rem;">
              <p class="section-label mb-2">Escríbenos</p>
              <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;color:#292524;line-height:1.1;">
                Envíanos un mensaje
              </h2>
            </div>

            <form @submit.prevent="enviarFormulario" novalidate>

              <!-- Nombre -->
              <div class="campo-grupo">
                <label class="campo-label" for="nombre">
                  Nombre completo <span class="campo-requerido">*</span>
                </label>
                <div class="campo-wrapper">
                  <input
                    id="nombre"
                    v-model="form.nombre"
                    type="text"
                    placeholder="Tu nombre"
                    class="campo-input"
                    :class="{ 'campo-input--error': errores.nombre }"
                    @blur="validarCampo('nombre')"
                  />
                  <span class="campo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                </div>
                <p v-if="errores.nombre" class="campo-error">{{ errores.nombre }}</p>
              </div>

              <!-- Email -->
              <div class="campo-grupo">
                <label class="campo-label" for="email">
                  Correo electrónico <span class="campo-requerido">*</span>
                </label>
                <div class="campo-wrapper">
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="tu@correo.com"
                    class="campo-input"
                    :class="{ 'campo-input--error': errores.email }"
                    @blur="validarCampo('email')"
                  />
                  <span class="campo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                </div>
                <p v-if="errores.email" class="campo-error">{{ errores.email }}</p>
              </div>

              <!-- Teléfono -->
              <div class="campo-grupo">
                <label class="campo-label" for="telefono">
                  Teléfono / WhatsApp <span class="campo-requerido">*</span>
                </label>
                <div class="campo-wrapper">
                <input
                  id="telefono"
                  v-model="form.telefono"
                  type="tel"
                  placeholder="300 000 0000"
                  class="campo-input"
                  :class="{ 'campo-input--error': errores.telefono }"
                  @blur="validarCampo('telefono')"
                />
                  <span class="campo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </span>
                </div>
                <p v-if="errores.telefono" class="campo-error">{{ errores.telefono }}</p>              
              </div>

              <!-- Asunto -->
              <div class="campo-grupo">
                <label class="campo-label">Asunto</label>
                <div class="asunto-pills">
                  <button
                    v-for="a in asuntos"
                    :key="a"
                    type="button"
                    :class="['asunto-pill', form.asunto === a ? 'asunto-pill--active' : '']"
                    @click="form.asunto = a"
                  >
                    {{ a }}
                  </button>
                </div>
              </div>

              <!-- Mensaje -->
              <div class="campo-grupo">
                <label class="campo-label" for="mensaje">
                  Mensaje <span class="campo-requerido">*</span>
                </label>
                <textarea
                  id="mensaje"
                  v-model="form.mensaje"
                  placeholder="Cuéntanos qué necesitas: tipo de flores, ocasión, fecha de entrega..."
                  class="campo-input campo-textarea"
                  :class="{ 'campo-input--error': errores.mensaje }"
                  rows="5"
                  @blur="validarCampo('mensaje')"
                />
                <div class="mensaje-footer">
                  <p v-if="errores.mensaje" class="campo-error">{{ errores.mensaje }}</p>
                  <span style="font-family:'Jost',sans-serif;font-size:0.72rem;color:#a8a29e;margin-left:auto;">
                    {{ form.mensaje.length }} / 500
                  </span>
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="submit-btn"
                :disabled="enviando || enviado"
              >
                <Transition name="fade-quick" mode="out-in">
                  <span v-if="enviado" key="enviado" style="display:flex;align-items:center;gap:0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    ¡Mensaje enviado!
                  </span>
                  <span v-else-if="enviando" key="enviando" style="display:flex;align-items:center;gap:0.5rem;">
                    <span class="spinner"></span>
                    Enviando...
                  </span>
                  <span v-else key="normal" style="display:flex;align-items:center;gap:0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Enviar mensaje
                  </span>
                </Transition>
              </button>

              <p style="font-family:'Jost',sans-serif;font-size:0.72rem;color:#a8a29e;text-align:center;margin-top:0.75rem;">
                Al enviar aceptas nuestra
                <a href="#" style="color:#f25480;text-decoration:underline;">política de privacidad</a>.
                Respondemos en menos de 24 horas.
              </p>

            </form>
          </div>
        </div>

        <!-- ── COLUMNA DERECHA: Info ── -->
        <div class="info-col">

          <!-- Tarjeta info empresa -->
          <div class="info-card">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
              <div class="brand-logo">
                <span style="font-size:2rem;">🌸</span>
              </div>
              <div>
                <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;color:#292524;line-height:1;">Regocijo Detalles</h3>
                <p style="font-family:'Jost',sans-serif;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:#f25480;margin-top:2px;">Florería artesanal</p>
              </div>
            </div>
            <p style="font-family:'Jost',sans-serif;font-size:0.85rem;color:#78716c;line-height:1.8;margin-bottom:1.5rem;">
              Creamos ramos únicos elaborados con flores frescas y mucho amor. Cada detalle importa porque cada momento merece ser especial.
            </p>

            <div class="datos-contacto">
              <a
                v-for="dato in datosContacto"
                :key="dato.label"
                :href="dato.href"
                :target="dato.target || '_self'"
                class="dato-item"
              >
                <div class="dato-icono" :style="{ background: dato.bgColor }">
                  <span style="font-size:1.1rem;">{{ dato.emoji }}</span>
                </div>
                <div>
                  <p style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#a8a29e;">{{ dato.label }}</p>
                  <p style="font-family:'Jost',sans-serif;font-size:0.85rem;color:#292524;font-weight:500;margin-top:1px;">{{ dato.valor }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Botón WhatsApp destacado -->
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-cta"
          >
            <svg style="height:1.5rem;width:1.5rem;flex-shrink:0;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
            </svg>
            <div>
              <p style="font-family:'Jost',sans-serif;font-weight:700;font-size:0.95rem;line-height:1;">Chatear por WhatsApp</p>
              <p style="font-family:'Jost',sans-serif;font-size:0.75rem;opacity:0.85;margin-top:2px;">Respuesta inmediata</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;margin-left:auto;flex-shrink:0;" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </a>

          <!-- Horario -->
          <div class="horario-card">
            <p style="font-family:'Jost',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#5c7d3f;margin-bottom:1rem;">
              🕐 Horario de atención
            </p>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
              <div v-for="h in horarios" :key="h.dia" class="horario-item">
                <span style="font-family:'Jost',sans-serif;font-size:0.82rem;color:#57534e;">{{ h.dia }}</span>
                <span style="font-family:'Jost',sans-serif;font-size:0.82rem;font-weight:600;color:#292524;">{{ h.hora }}</span>
              </div>
            </div>
          </div>

          <!-- Redes sociales -->
          <div class="redes-card">
            <p style="font-family:'Jost',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#a8a29e;margin-bottom:1rem;">
              Síguenos
            </p>
            <div style="display:flex;gap:0.75rem;">
              <a v-for="red in redes" :key="red.nombre" :href="red.href" target="_blank"
                 :style="{ background: red.color }"
                 class="red-btn" :aria-label="red.nombre">
                <span style="font-size:1.1rem;">{{ red.emoji }}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ── Formulario ─────────────────────────────────
const form = reactive({
  nombre:   '',
  email:    '',
  telefono: '',
  asunto:   'Pedido personalizado',
  mensaje:  '',
})

const errores  = reactive({ nombre: '', email: '',telefono: '', mensaje: '' })
const enviando = ref(false)
const enviado  = ref(false)

const asuntos = [
  'Pedido personalizado',
  'Consulta de precios',
  'Evento / Boda',
  'Otro',
]

// ── Validación ─────────────────────────────────
function validarCampo(campo: 'nombre' | 'email'| 'telefono' | 'mensaje') {
  if (campo === 'nombre') {
    errores.nombre = form.nombre.trim().length < 2
      ? 'Por favor ingresa tu nombre completo'
      : ''
  }
  if (campo === 'email') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    errores.email = !re.test(form.email)
      ? 'Ingresa un correo electrónico válido'
      : ''
  }
  if (campo === 'telefono') {
    const limpio = form.telefono.replace(/\s+/g, '')
    const re = /^\+?\d{7,15}$/

    errores.telefono = !re.test(limpio)
      ? 'Ingresa un número de teléfono válido'
      : ''
  }
  if (campo === 'mensaje') {
    errores.mensaje = form.mensaje.trim().length < 10
      ? 'El mensaje debe tener al menos 10 caracteres'
      : ''
  }
}

function formularioValido() {
  validarCampo('nombre')
  validarCampo('email')
  validarCampo('telefono')
  validarCampo('mensaje')
  return !errores.nombre && !errores.email && !errores.telefono && !errores.mensaje
}

// ── Envío (placeholder con console.log) ────────
async function enviarFormulario() {
  if (!formularioValido()) return

  enviando.value = true

  // Simula latencia de red
  await new Promise(resolve => setTimeout(resolve, 1400))

  // TODO: reemplazar con llamada real al backend o servicio de email
  console.log('[Regocijo Detalles] Nuevo mensaje de contacto:', {
    nombre:   form.nombre,
    email:    form.email,
    telefono: form.telefono || 'no indicado',
    asunto:   form.asunto,
    mensaje:  form.mensaje,
    fecha:    new Date().toISOString(),
  })

  enviando.value = false
  enviado.value  = true

  // Reset después de 4 segundos
  setTimeout(() => {
    enviado.value = false
    Object.assign(form, { nombre: '', email: '', telefono: '', asunto: 'Pedido personalizado', mensaje: '' })
    Object.assign(errores, { nombre: '', email: '', mensaje: '' })
  }, 4000)
}

// ── Datos de contacto ──────────────────────────
const WHATSAPP_NUMBER = '573127506785'
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me gustaría información sobre sus ramos de flores')}`

const datosContacto = [
  { label: 'Dirección',  emoji: '📍', valor: 'Solo Domicilio, Montería - Córdoba', href: 'https://maps.google.com', target: '_blank', bgColor: '#fff5f7' },
  { label: 'Teléfono',   emoji: '📞', valor: '+57 312 750 6785', href: 'tel:+573127506785', bgColor: '#f4f7f0' },
  { label: 'WhatsApp',   emoji: '💬', valor: '+57 312 750 6785', href: whatsappUrl, target: '_blank', bgColor: '#f0fdf4' },
  { label: 'Email',      emoji: '✉️', valor: 'hola@regocijodetalles.co', href: 'mailto:hola@regocijodetalles.co', bgColor: '#faf4e5' },
]

const horarios = [
  { dia: 'Lunes – Viernes', hora: '8:00 am – 7:00 pm' },
  { dia: 'Sábados',         hora: '8:00 am – 5:00 pm' },
  { dia: 'Domingos',        hora: 'Sin Toma de pedidos' },
]

const redes = [
  { nombre: 'Instagram', emoji: '📸', href: '#', color: '#fff5f7' },
  { nombre: 'Facebook',  emoji: '💙', href: '#', color: '#f0f4ff' },
  { nombre: 'TikTok',    emoji: '🎵', href: '#', color: '#f5f5f4' },
  { nombre: 'Pinterest', emoji: '📌', href: '#', color: '#fff0f0' },
]

useHead({ title: 'Contacto – Regocijo Detalles' })
</script>

<style scoped>
/* ── Header ──────────────────────────────── */
.contacto-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #ffe8ee 0%, #faf8f3 50%, #e6eedd 100%);
}
.contacto-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: #292524;
  line-height: 1.0;
  margin-bottom: 1rem;
  font-weight: 400;
}
.contacto-subtitle {
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  color: #78716c;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ── Layout ──────────────────────────────── */
.contacto-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}
@media (min-width: 768px) {
  .contacto-grid { grid-template-columns: 1fr 1fr; align-items: start; gap: 3rem; }
}
@media (min-width: 1024px) {
  .contacto-grid { grid-template-columns: 1.1fr 0.9fr; gap: 4rem; }
}

/* ── Formulario ──────────────────────────── */
.formulario-col {}

.formulario-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 40px rgba(242,84,128,0.07);
  border: 1px solid #ffe8ee;
}

/* Campos */
.campo-grupo { margin-bottom: 1.25rem; }

.campo-label {
  display: block;
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #44403c;
  margin-bottom: 0.4rem;
}
.campo-requerido { color: #f25480; }

.campo-wrapper { position: relative; }

.campo-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  background: #faf8f3;
  border: 1.5px solid #e7e5e4;
  border-radius: 0.875rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  color: #292524;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.campo-input::placeholder { color: #a8a29e; }
.campo-input:focus {
  border-color: #ffa0ba;
  background: white;
  box-shadow: 0 0 0 3px rgba(255,197,213,0.25);
}
.campo-input--error { border-color: #fca5a5 !important; background: #fff5f5 !important; }

.campo-textarea {
  padding-top: 0.75rem;
  padding-left: 1rem;
  resize: none;
  line-height: 1.7;
}

.campo-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: #d4b0bb;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.campo-error {
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  color: #ef4444;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.mensaje-footer {
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}

/* Asunto pills */
.asunto-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.asunto-pill {
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1.5px solid #e7e5e4;
  background: white;
  color: #78716c;
}
.asunto-pill:hover { border-color: #ffa0ba; color: #f25480; }
.asunto-pill--active {
  background: #fff5f7;
  border-color: #f25480;
  color: #d43868;
}

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #f25480, #d43868);
  color: white;
  font-family: 'Jost', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(242,84,128,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(242,84,128,0.38);
}
.submit-btn:disabled {
  cursor: default;
  transform: none;
  background: linear-gradient(135deg, #93b272, #5c7d3f);
  box-shadow: 0 4px 20px rgba(92,125,63,0.25);
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Fade transition */
.fade-quick-enter-active, .fade-quick-leave-active { transition: opacity 0.2s; }
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; }

/* ── Info columna ────────────────────────── */
.info-col { display: flex; flex-direction: column; gap: 1.25rem; }

.info-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid #ffe8ee;
  box-shadow: 0 4px 30px rgba(242,84,128,0.06);
}

.brand-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffe8ee, #fdf0f3);
  border: 2px solid #ffc5d5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(242,84,128,0.12);
}

.datos-contacto { display: flex; flex-direction: column; gap: 0.75rem; }

.dato-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem;
  border-radius: 0.875rem;
  text-decoration: none;
  transition: background 0.15s;
  cursor: pointer;
}
.dato-item:hover { background: #faf8f3; }

.dato-icono {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* WhatsApp CTA */
.whatsapp-cta {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1.1rem 1.5rem;
  background: #25D366;
  color: white;
  border-radius: 1.25rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(37,211,102,0.28);
}
.whatsapp-cta:hover {
  background: #1fba59;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37,211,102,0.35);
}

/* Horario */
.horario-card {
  background: linear-gradient(135deg, #f4f7f0, #e6eedd);
  border-radius: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #cddcbc;
}
.horario-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  border-bottom: 1px dashed #cddcbc;
}
.horario-item:last-child { border-bottom: none; }

/* Redes */
.redes-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #ffe8ee;
}
.red-btn {
  width: 46px;
  height: 46px;
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s;
  text-decoration: none;
  border: 1px solid #e7e5e4;
}
.red-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

/* ── Mapa placeholder ────────────────────── */
.mapa-section { padding: 0 0 2rem; }
.mapa-placeholder {
  height: 240px;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #f4f7f0 0%, #e6eedd 50%, #fff5f7 100%);
  border: 2px dashed #cddcbc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.mapa-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(205,220,188,0.15) 20px,
    rgba(205,220,188,0.15) 21px
  );
}
.mapa-overlay-content {
  position: relative;
  text-align: center;
  z-index: 1;
}
</style>