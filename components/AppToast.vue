<template>
  <!-- Región viva: los lectores de pantalla anuncian el aviso sin mover el foco -->
  <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
    <Transition name="toast">
      <div v-if="toast.visible" class="toast">
        <span class="toast-dot" aria-hidden="true" />
        <span class="toast-msg">{{ toast.mensaje }}</span>
        <button v-if="toast.accion" type="button" class="toast-action" @click="onAccion">
          {{ toast.accion.label }}
          <span aria-hidden="true">→</span>
        </button>
        <button type="button" class="toast-close" aria-label="Cerrar aviso" @click="ocultar">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { toast, ocultar } = useToast()

function onAccion() {
  toast.value.accion?.fn()
  ocultar()
}
</script>

<style scoped>
.toast-region {
  position: fixed;
  z-index: 9000;
  left: 0; right: 0; bottom: calc(1rem + env(safe-area-inset-bottom));
  display: flex; justify-content: center;
  padding-inline: 1rem;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  display: flex; align-items: center; gap: 0.75rem;
  max-width: 28rem;
  padding: 0.7rem 0.8rem 0.7rem 1.1rem;
  background: var(--ink);
  color: var(--cream);
  border-radius: 9999px;
  box-shadow: 0 18px 40px -12px rgba(42, 26, 31, 0.55);
  font-size: 0.92rem;
}
.toast-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--rose-soft); flex-shrink: 0; }
.toast-msg { flex: 1; }
.toast-action {
  display: inline-flex; align-items: center; gap: 0.3rem;
  min-height: 2rem; padding: 0.25rem 0.85rem;
  background: var(--cream); color: var(--ink);
  border: 0; border-radius: 9999px;
  font: 600 0.8rem var(--sans); letter-spacing: 0.04em; cursor: pointer; white-space: nowrap;
  transition: background 0.2s, transform 0.2s var(--ease-out);
}
.toast-action:hover { background: var(--blush-deep); transform: translateX(2px); }
.toast-close {
  display: grid; place-items: center; width: 2rem; height: 2rem; flex-shrink: 0;
  background: transparent; color: var(--cream); opacity: 0.75;
  border: 0; border-radius: 50%; cursor: pointer; transition: opacity 0.2s, background 0.2s;
}
.toast-close:hover { opacity: 1; background: rgba(255, 255, 255, 0.12); }
.toast :focus-visible { outline-color: var(--gold-soft); }

.toast-enter-active, .toast-leave-active { transition: opacity 0.35s var(--ease-out), transform 0.45s var(--ease-out); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(1.2rem) scale(0.96); }
</style>
