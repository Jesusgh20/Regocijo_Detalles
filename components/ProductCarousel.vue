<template>
  <div class="carrusel-col">
    <div class="main-image-wrapper glass-card" ref="wrapper">
      <Transition :name="transitionName" mode="out-in">
        <img
          :key="imagenActiva"
          :src="images[imagenActiva]"
          :alt="`Imagen ${imagenActiva + 1}`"
          class="main-image"
        />
      </Transition>
      <button v-if="images.length > 1" class="carrusel-arrow carrusel-arrow--left" @click="navigate(-1)" aria-label="Anterior">
        <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
      <button v-if="images.length > 1" class="carrusel-arrow carrusel-arrow--right" @click="navigate(1)" aria-label="Siguiente">
        <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
      <div v-if="images.length > 1" class="carrusel-dots">
        <button v-for="(_, idx) in images" :key="idx"
                :class="['carrusel-dot', imagenActiva === idx ? 'carrusel-dot--active' : '']"
                @click="goTo(idx)" />
      </div>
    </div>
    <div v-if="images.length > 1" class="thumbnails">
      <button v-for="(img, idx) in images" :key="idx"
              :class="['thumb', imagenActiva === idx ? 'thumb--active' : '']"
              @click="goTo(idx)">
        <img :src="img" :alt="`Miniatura ${idx + 1}`" style="width:100%;height:100%;object-fit:cover;" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{ images: string[] }>();

const imagenActiva = ref(0);
const transitionName = ref('slide-left');

function navigate(dir: 1 | -1) {
  transitionName.value = dir === 1 ? 'slide-left' : 'slide-right';
  imagenActiva.value = (imagenActiva.value + dir + props.images.length) % props.images.length;
}

function goTo(idx: number) {
  transitionName.value = idx > imagenActiva.value ? 'slide-left' : 'slide-right';
  imagenActiva.value = idx;
}

// Touch / pointer handling
let startX = 0;
let isSwiping = false;
const threshold = 50; // px

function onPointerDown(event: Event) {
  startX = (event as PointerEvent).clientX;
  isSwiping = true;
}
function onPointerMove(event: Event) {
  if (!isSwiping) return;
  const diff = (event as PointerEvent).clientX - startX;
  if (Math.abs(diff) > threshold) {
    navigate(diff > 0 ? -1 : 1);
    isSwiping = false;
  }
}
function onPointerUp() {
  isSwiping = false;
}

onMounted(() => {
  const wrapper = document.querySelector('.main-image-wrapper');
  if (wrapper) {
    wrapper.addEventListener('pointerdown', onPointerDown);
    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerup', onPointerUp);
    wrapper.addEventListener('pointercancel', onPointerUp);
  }
});

onBeforeUnmount(() => {
  const wrapper = document.querySelector('.main-image-wrapper');
  if (wrapper) {
    wrapper.removeEventListener('pointerdown', onPointerDown);
    wrapper.removeEventListener('pointermove', onPointerMove);
    wrapper.removeEventListener('pointerup', onPointerUp);
    wrapper.removeEventListener('pointercancel', onPointerUp);
  }
});
</script>

<style scoped>
.main-image-wrapper {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: #f5f5f4;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
}
.main-image { width: 100%; height: 100%; object-fit: cover; display: block; }
/* Reuse transition classes from page */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.35s ease; position: absolute; inset: 0;
}
.slide-left-enter-from  { transform: translateX(60px);  opacity: 0; }
.slide-left-leave-to    { transform: translateX(-60px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-60px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(60px);  opacity: 0; }
.carrusel-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #44403c; box-shadow: 0 4px 16px rgba(0,0,0,0.12); transition: all 0.15s; z-index: 10; }
.carrusel-arrow:hover { background: white; color: #f25480; }
.carrusel-arrow--left  { left: 0.75rem; }
.carrusel-arrow--right { right: 0.75rem; }
.carrusel-dots { position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.4rem; z-index: 10; }
.carrusel-dot { width: 8px; height: 8px; border-radius: 0.5rem; border: none; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; padding: 0; }
.carrusel-dot--active { background: white; width: 22px; border-radius: 0.5rem; }
.thumbnails { display: flex; gap: 0.6rem; margin-top: 0.75rem; }
.thumb { width: 72px; height: 72px; border-radius: 0.75rem; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s; padding: 0; background: none; flex-shrink: 0; }
.thumb--active { border-color: #f25480; box-shadow: 0 0 0 2px rgba(242,84,128,0.2); }
/* Glass‑morphism */
.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
@media (prefers-color-scheme: dark) {
  .glass-card {
    background: rgba(20,20,20,0.4);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
}
</style>
