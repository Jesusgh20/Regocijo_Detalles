<template>
  <div class="ri" :class="{ 'ri--vacio': mostrarVacio, 'ri--sol': categoria === 'girasoles' }">
    <!-- Cargando: skeleton con brillo -->
    <div v-if="src && !cargada && !error" class="skeleton ri-skeleton" aria-hidden="true" />

    <img
      v-if="src && !error"
      ref="imgRef"
      :src="src"
      :alt="alt"
      :loading="prioridad ? 'eager' : 'lazy'"
      :fetchpriority="prioridad ? 'high' : 'auto'"
      decoding="async"
      class="ri-img"
      :class="{ 'ri-img--lista': cargada }"
      @load="cargada = true"
      @error="error = true"
    />

    <!-- Estado vacío: aún no hay foto (o la foto no cargó) -->
    <div v-if="mostrarVacio" class="ri-vacio" role="img" :aria-label="`${nombre ?? 'Este ramo'}: foto próximamente`">
      <Ornament :variant="categoria === 'girasoles' ? 'sunflower' : 'bloom'" class="ri-orn" />
      <p v-if="!compacto" class="ri-txt">{{ error ? 'No se pudo cargar la foto' : 'Foto próximamente' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string | null | undefined
  alt: string
  nombre?: string
  categoria?: string
  prioridad?: boolean
  /** Miniatura pequeña: el estado vacío no muestra texto */
  compacto?: boolean
}>()

const cargada = ref(false)
const error = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

const mostrarVacio = computed(() => !props.src || error.value)

// La imagen pudo terminar de cargar antes de hidratar (SSR): el evento `load` ya no se dispara.
onMounted(() => {
  if (imgRef.value?.complete) {
    if (imgRef.value.naturalWidth > 0) cargada.value = true
    else error.value = true
  }
})

watch(() => props.src, () => {
  cargada.value = false
  error.value = false
})
</script>

<style scoped>
.ri { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--blush); }
.ri-skeleton { position: absolute; inset: 0; border-radius: 0; }
.ri-img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  opacity: 0; transform: scale(1.03);
  transition: opacity 0.7s var(--ease-out), transform 1.1s var(--ease-out);
}
.ri-img--lista { opacity: 1; transform: scale(1); }

.ri--vacio {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 253, 249, 0.9), transparent 55%),
    linear-gradient(160deg, var(--blush), var(--blush-deep));
}
.ri--vacio.ri--sol {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 253, 249, 0.8), transparent 55%),
    linear-gradient(160deg, #f4e3b0, var(--gold-soft));
}
.ri-vacio {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem;
  color: var(--wine);
}
.ri-orn { width: 38%; max-width: 9rem; opacity: 0.55; }
.ri-txt {
  font-family: var(--sans); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--wine-deep); opacity: 0.85;
}
</style>
