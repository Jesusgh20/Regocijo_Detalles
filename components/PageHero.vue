<template>
  <!-- Encabezado de página reutilizable (reemplaza 4 copias con estilos en línea) -->
  <section class="ph">
    <ClientOnly><PetalCanvas :cantidad="18" /></ClientOnly>
    <span class="ph-orb ph-orb--1" aria-hidden="true" />
    <span class="ph-orb ph-orb--2" aria-hidden="true" />
    <Ornament variant="sprig" class="ph-sprig ph-sprig--l" />
    <Ornament variant="sprig" class="ph-sprig ph-sprig--r" />

    <div class="wrap ph-inner">
      <p v-if="eyebrow" class="eyebrow eyebrow--center">{{ eyebrow }}</p>
      <h1 class="display ph-title"><slot name="title" /></h1>
      <p v-if="$slots.default" class="lead ph-lead"><slot /></p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ eyebrow?: string }>()
</script>

<style scoped>
.ph {
  position: relative; overflow: hidden; text-align: center;
  background: linear-gradient(170deg, var(--blush) 0%, var(--cream) 62%, #eef2e6 100%);
  border-bottom: 1px solid var(--line);
}
.ph-inner { position: relative; z-index: 2; padding-block: clamp(3.5rem, 8vw, 6.5rem); }
.ph-title { font-size: clamp(2.8rem, 8vw, 5.6rem); margin: 1rem 0; }
.ph-lead { margin-inline: auto; }
.ph-orb { position: absolute; border-radius: 50%; filter: blur(50px); pointer-events: none; }
.ph-orb--1 { width: 22rem; height: 22rem; top: -9rem; right: -5rem; background: radial-gradient(circle, rgba(233, 160, 180, 0.5), transparent 70%); }
.ph-orb--2 { width: 16rem; height: 16rem; bottom: -6rem; left: 8%; background: radial-gradient(circle, rgba(207, 222, 190, 0.6), transparent 70%); }
.ph-sprig { position: absolute; z-index: 1; bottom: -1.5rem; width: 5.5rem; color: var(--sage); opacity: 0.28; display: none; }
.ph-sprig--l { left: 4%; transform: rotate(-12deg); }
.ph-sprig--r { right: 4%; transform: rotate(12deg) scaleX(-1); }
@media (min-width: 820px) { .ph-sprig { display: block; } }
</style>
