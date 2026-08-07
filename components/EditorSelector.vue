<template>
  <div class="selector-wrapper">

    <!-- Sección flores -->
    <div v-for="cat in categorias" :key="cat.id" class="categoria-grupo">
      <h3 class="categoria-titulo">{{ cat.label }}</h3>
      <div class="flores-grid">
        <div
          v-for="flor in florePorCategoria(cat.id)"
          :key="flor.id"
          class="flor-card"
          :class="{ 'flor-card--activa': getCantidad(flor.id) > 0 }"
        >
          <!-- Emoji / imagen -->
          <div class="flor-emoji" :style="{ background: `${flor.color}30`, borderColor: `${flor.color}60` }">
            <span class="flor-icono">{{ flor.emoji }}</span>
            <!-- Badge de pendiente -->
            <span v-if="flor.pendiente" class="pendiente-badge" title="Precio por confirmar">?</span>
          </div>

          <div class="flor-info">
            <p class="flor-nombre">{{ flor.nombre }}</p>
            <p class="flor-precio">
              <span v-if="flor.precio_unidad !== null">{{ store.formatPrecio(flor.precio_unidad) }}<span style="color:#a8a29e;font-size:0.65rem;"> / u.</span></span>
              <span v-else class="precio-pendiente">Precio por confirmar</span>
            </p>
          </div>

          <!-- Contador +/− -->
          <div class="contador">
            <button
              class="contador-btn"
              :class="{ 'contador-btn--disabled': getCantidad(flor.id) === 0 }"
              :disabled="getCantidad(flor.id) === 0"
              @click="store.decrementar(flor.id)"
              aria-label="Quitar una unidad"
            >−</button>

            <span class="contador-valor" :class="{ 'contador-valor--activo': getCantidad(flor.id) > 0 }">
              {{ getCantidad(flor.id) }}
            </span>

            <button
              class="contador-btn contador-btn--add"
              :disabled="getCantidad(flor.id) >= flor.cantidad_maxima"
              @click="store.incrementar(flor.id)"
              aria-label="Agregar una unidad"
            >+</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Envoltura -->
    <div class="categoria-grupo">
      <h3 class="categoria-titulo">Papel de envoltura</h3>
      <div class="opciones-row">
        <button
          v-for="env in ENVOLTURAS"
          :key="env.id"
          class="opcion-color"
          :class="{ 'opcion-color--activa': store.envolturaSeleccionada === env.id }"
          :style="{ background: env.color, borderColor: env.color }"
          :title="env.nombre"
          @click="store.envolturaSeleccionada = env.id"
        >
          <span v-if="store.envolturaSeleccionada === env.id" class="opcion-check">✓</span>
        </button>
      </div>
      <p class="opcion-label-texto">{{ envolturaActual?.nombre }}</p>
    </div>

    <!-- Moño -->
    <div class="categoria-grupo">
      <h3 class="categoria-titulo">Moño</h3>
      <div class="opciones-row">
        <button
          v-for="m in MONOS"
          :key="m.id"
          class="opcion-color"
          :class="{ 'opcion-color--activa': store.monoSeleccionado === m.id }"
          :style="{ background: m.color, borderColor: m.color }"
          :title="m.nombre"
          @click="store.monoSeleccionado = m.id"
        >
          <span v-if="store.monoSeleccionado === m.id" class="opcion-check">✓</span>
        </button>
      </div>
      <p class="opcion-label-texto">{{ monoActual?.nombre }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore, FLORES_EDITOR, ENVOLTURAS, MONOS } from '~/stores/editor'

const store = useEditorStore()
const { getCantidad } = store

const envolturaActual = computed(() => ENVOLTURAS.find(e => e.id === store.envolturaSeleccionada))
const monoActual = computed(() => MONOS.find(m => m.id === store.monoSeleccionado))

const categorias = [
  { id: 'flor_principal', label: 'Elige tus flores' },
]

function florePorCategoria(cat: string) {
  return FLORES_EDITOR.filter(f => f.categoria === cat)
}
</script>

<style scoped>
.selector-wrapper {
  display: flex; flex-direction: column; gap: 1.5rem;
}
.categoria-grupo { }
.categoria-titulo {
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem; font-weight: 700;
  color: #a8a29e; letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.flores-grid {
  display: flex; flex-direction: column; gap: 0.5rem;
}
.flor-card {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.65rem 0.875rem;
  border-radius: 0.875rem;
  border: 1.5px solid #f0ede8;
  background: white;
  transition: all 0.15s ease;
}
.flor-card:hover {
  border-color: #ffc5d5;
  background: #fff8fa;
}
.flor-card--activa {
  border-color: #f25480;
  background: #fff5f7;
  box-shadow: 0 2px 12px rgba(242,84,128,0.1);
}
.flor-emoji {
  position: relative;
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 1.5px solid;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.flor-icono { font-size: 1.35rem; line-height: 1; }
.pendiente-badge {
  position: absolute; top: -4px; right: -4px;
  width: 16px; height: 16px; border-radius: 50%;
  background: #f59e0b; color: white;
  font-size: 0.6rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Jost', sans-serif;
}
.flor-info { flex: 1; min-width: 0; }
.flor-nombre {
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem; font-weight: 600;
  color: #292524; line-height: 1.2;
}
.flor-precio {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.88rem; color: #d43868;
  margin-top: 0.1rem;
}
.precio-pendiente {
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem; color: #f59e0b;
  font-weight: 500;
}

/* Contador */
.contador {
  display: flex; align-items: center; gap: 0.3rem;
  flex-shrink: 0;
}
.contador-btn {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1.5px solid #e7e5e4;
  background: white; color: #78716c;
  font-size: 1.1rem; font-weight: 400; line-height: 1;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s;
}
.contador-btn:hover:not(:disabled) {
  border-color: #f25480; color: #f25480; background: #fff5f7;
}
.contador-btn--add:hover:not(:disabled) {
  background: #f25480; color: white; border-color: #f25480;
}
.contador-btn--disabled { opacity: 0.3; cursor: not-allowed; }
.contador-valor {
  width: 28px; text-align: center;
  font-family: 'Jost', sans-serif;
  font-size: 0.9rem; font-weight: 600; color: #44403c;
  transition: color 0.15s;
}
.contador-valor--activo { color: #f25480; }

/* Opciones de color (envoltura / moño) */
.opciones-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem; }
.opcion-color {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2.5px solid transparent;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.opcion-color--activa {
  box-shadow: 0 0 0 3px rgba(242,84,128,0.3), 0 2px 6px rgba(0,0,0,0.1);
  transform: scale(1.1);
}
.opcion-check { font-size: 0.8rem; color: rgba(0,0,0,0.5); font-weight: 700; }
.opcion-label-texto {
  font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #78716c;
  margin-top: 0.1rem;
}
</style>
