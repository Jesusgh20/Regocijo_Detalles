<template>
  <div class="lg">
    <section class="card" aria-labelledby="t-nc">
      <p class="eyebrow">Recuperar acceso</p>
      <h1 id="t-nc" class="card-title">Crea una <em>contraseña nueva</em></h1>

      <p v-if="!lista" class="load" aria-busy="true"><span class="spinner" aria-hidden="true" /> Verificando el enlace…</p>
      <p v-else-if="!conSesion" class="errs" role="alert">
        Este enlace ya no es válido o venció. Vuelve a <NuxtLink to="/admin" class="link-inline">pedir uno nuevo</NuxtLink>.
      </p>

      <form v-else novalidate class="form" @submit.prevent="guardar">
        <div v-if="error" class="errs" role="alert">{{ error }}</div>
        <div class="field">
          <label class="field-label" for="n-pass">Contraseña nueva</label>
          <input id="n-pass" v-model="pass" class="input" type="password" autocomplete="new-password" minlength="8" required />
          <p class="field-hint">Mínimo 8 caracteres.</p>
        </div>
        <div class="field">
          <label class="field-label" for="n-pass2">Repite la contraseña</label>
          <input id="n-pass2" v-model="pass2" class="input" type="password" autocomplete="new-password" required />
        </div>
        <button type="submit" class="btn btn--wine btn--block" :disabled="cargando" :aria-busy="cargando">
          <span v-if="cargando" class="spinner" aria-hidden="true" />
          {{ cargando ? 'Guardando…' : 'Guardar contraseña' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const lista = ref(false)
const conSesion = ref(false)
const pass = ref('')
const pass2 = ref('')
const error = ref('')
const cargando = ref(false)

onMounted(async () => {
  const sb = useSupabase()
  if (!sb) { lista.value = true; return }
  // Supabase procesa el enlace de recuperación (token en la URL) y crea una sesión temporal
  await new Promise((r) => setTimeout(r, 600))
  const { data } = await sb.auth.getSession()
  conSesion.value = !!data.session
  lista.value = true
})

async function guardar() {
  error.value = ''
  if (pass.value.length < 8) { error.value = 'La contraseña debe tener al menos 8 caracteres.'; return }
  if (pass.value !== pass2.value) { error.value = 'Las dos contraseñas no coinciden.'; return }
  const sb = useSupabase()
  if (!sb) return
  cargando.value = true
  const { error: e } = await sb.auth.updateUser({ password: pass.value })
  cargando.value = false
  if (e) { error.value = 'No se pudo guardar la contraseña. Pide un enlace nuevo e inténtalo otra vez.'; return }
  await navigateTo('/admin/ramos')
}
</script>

<style scoped>
.lg { display: grid; place-items: center; padding-block: 2rem; }
.card { width: min(30rem, 100%); display: grid; gap: 1.1rem; padding: clamp(1.5rem, 4vw, 2.5rem); background: var(--paper); border: 1px solid var(--line); border-radius: 2rem; box-shadow: var(--shadow-soft); }
.card-title { font-size: clamp(2.2rem, 5vw, 3rem); }
.form { display: grid; gap: 1.1rem; }
.errs { padding: 0.8rem 1rem; background: #fdecea; border: 1px solid #f3b8b3; border-radius: 0.9rem; color: var(--danger); font-size: 0.92rem; }
.load { display: flex; align-items: center; gap: 0.7rem; }
</style>
