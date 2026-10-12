<template>
  <div class="lg">
    <!-- Supabase sin configurar -->
    <section v-if="!configurado" class="card" aria-labelledby="t-cfg">
      <p class="eyebrow">Falta un paso</p>
      <h1 id="t-cfg" class="card-title">El panel aún no está <em>conectado</em></h1>
      <p>
        Para poder subir y editar ramos hay que conectar el sitio con Supabase. Sigue la guía
        <strong>SUPABASE.md</strong> (están las dos variables <code>NUXT_PUBLIC_SUPABASE_URL</code> y
        <code>NUXT_PUBLIC_SUPABASE_ANON_KEY</code>) y vuelve a cargar esta página.
      </p>
      <p class="hint">Mientras tanto, el sitio público sigue funcionando con el catálogo actual.</p>
    </section>

    <!-- Cargando sesión -->
    <section v-else-if="!admin.listo.value" class="card" aria-busy="true">
      <p class="load"><span class="spinner" aria-hidden="true" /> Comprobando tu sesión…</p>
    </section>

    <!-- Inicio de sesión -->
    <section v-else class="card" aria-labelledby="t-login">
      <p class="eyebrow">Panel de administración</p>
      <h1 id="t-login" class="card-title">Entrar a <em>mis ramos</em></h1>

      <form novalidate class="form" @submit.prevent="enviar">
        <div v-if="error" class="errs" role="alert" tabindex="-1" ref="errEl">{{ error }}</div>

        <div class="field">
          <label class="field-label" for="a-email">Correo</label>
          <input id="a-email" v-model.trim="email" class="input" type="email" autocomplete="username" required inputmode="email"
            :aria-invalid="!!error && !email" />
        </div>
        <div class="field">
          <label class="field-label" for="a-pass">Contraseña</label>
          <input id="a-pass" v-model="password" class="input" type="password" autocomplete="current-password" required
            :aria-invalid="!!error && !password" />
        </div>

        <button type="submit" class="btn btn--wine btn--block" :class="{ 'btn--loading': cargando }" :aria-busy="cargando" :disabled="cargando">
          <span v-if="cargando" class="spinner" aria-hidden="true" />
          {{ cargando ? 'Entrando…' : 'Entrar' }}
        </button>

        <button type="button" class="link-inline olvide" :disabled="enviandoRecuperar" @click="recuperar">
          {{ enviandoRecuperar ? 'Enviando…' : '¿Olvidaste tu contraseña?' }}
        </button>
        <p v-if="info" class="ok" role="status">{{ info }}</p>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const admin = useAdmin()
const configurado = supabaseConfigurado()
const email = ref('')
const password = ref('')
const error = ref('')
const info = ref('')
const cargando = ref(false)
const enviandoRecuperar = ref(false)
const errEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!configurado) return
  await admin.iniciar()
  if (admin.esAdmin.value) await navigateTo('/admin/ramos')
})

async function enviar() {
  error.value = ''
  info.value = ''
  if (!email.value || !password.value) {
    error.value = 'Escribe tu correo y tu contraseña.'
    await nextTick(); errEl.value?.focus()
    return
  }
  cargando.value = true
  const r = await admin.entrar(email.value, password.value)
  cargando.value = false
  if (!r.ok) {
    error.value = r.mensaje ?? 'No se pudo entrar.'
    await nextTick(); errEl.value?.focus()
    return
  }
  await navigateTo('/admin/ramos')
}

async function recuperar() {
  error.value = ''
  info.value = ''
  if (!email.value) {
    error.value = 'Escribe tu correo arriba y vuelve a pulsar «¿Olvidaste tu contraseña?».'
    await nextTick(); errEl.value?.focus()
    return
  }
  const sb = useSupabase()
  if (!sb) return
  enviandoRecuperar.value = true
  await sb.auth.resetPasswordForEmail(email.value, { redirectTo: `${location.origin}/admin/nueva-clave` })
  enviandoRecuperar.value = false
  // Mismo mensaje exista o no el correo (no revela qué correos tienen cuenta)
  info.value = 'Si ese correo tiene una cuenta, te enviamos un enlace para crear una contraseña nueva.'
}
</script>

<style scoped>
.lg { display: grid; place-items: center; padding-block: 2rem; }
.card { width: min(30rem, 100%); display: grid; gap: 1.1rem; padding: clamp(1.5rem, 4vw, 2.5rem); background: var(--paper); border: 1px solid var(--line); border-radius: 2rem; box-shadow: var(--shadow-soft); }
.card-title { font-size: clamp(2.2rem, 5vw, 3rem); }
.form { display: grid; gap: 1.1rem; }
.errs { padding: 0.8rem 1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); font-size: 0.92rem; }
.ok { padding: 0.8rem 1rem; background: var(--sage-soft); color: var(--sage); border-radius: 0.9rem; font-size: 0.92rem; }
.olvide { background: none; border: 0; padding: 0.3rem; cursor: pointer; font: inherit; justify-self: center; }
.hint { font-size: 0.9rem; color: var(--muted); }
.load { display: flex; align-items: center; gap: 0.7rem; }
code { background: var(--blush); padding: 0.05rem 0.4rem; border-radius: 0.3rem; font-size: 0.85em; }
</style>
