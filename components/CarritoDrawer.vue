<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="backdrop-fade">
      <div v-if="modelValue" class="carrito-backdrop" @click="$emit('update:modelValue', false)" />
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer-slide">
      <aside v-if="modelValue" class="carrito-drawer" aria-label="Carrito de compras">

        <!-- ── Header ── -->
        <div class="drawer-header">
          <div>
            <h2 class="drawer-title">Tu carrito 🛒</h2>
            <p class="drawer-subtitle">{{ store.cantidadCarrito }} {{ store.cantidadCarrito === 1 ? 'ramo' : 'ramos' }} seleccionados</p>
          </div>
          <button class="drawer-close" @click="$emit('update:modelValue', false)" aria-label="Cerrar carrito">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- ── Vacío ── -->
        <div v-if="store.carritoItems.length === 0" class="drawer-empty">
          <span class="drawer-empty-icon">🌿</span>
          <p class="drawer-empty-title">Tu carrito está vacío</p>
          <p class="drawer-empty-sub">Explora nuestro catálogo y agrega tus ramos favoritos</p>
          <button class="drawer-empty-btn" @click="$emit('update:modelValue', false)">
            Ver catálogo
          </button>
        </div>

        <!-- ── Items + Form ── -->
        <div v-else class="drawer-body">

          <!-- Lista de items -->
          <div class="items-list">
            <TransitionGroup name="item-list" tag="div">
              <div v-for="item in store.carritoItems" :key="`${item.ramo.id}-${item.tamano.value}`" class="cart-item">
                <img :src="item.ramo.imagen_url" :alt="item.ramo.nombre" class="item-img" />
                <div class="item-info">
                  <p class="item-nombre">{{ item.ramo.nombre }}</p>
                  <p class="item-tamano">{{ item.tamano.label }}</p>
                  <p class="item-precio">{{ store.formatPrecio(item.tamano.precio) }} c/u</p>
                </div>
                <div class="item-controls">
                  <button class="qty-btn" @click="store.quitarDelCarrito(item.ramo.id, item.tamano.value)" aria-label="Reducir">−</button>
                  <span class="qty-num">{{ item.cantidad }}</span>
                  <button class="qty-btn" @click="store.agregarAlCarrito(item.ramo, item.tamano)" aria-label="Aumentar">+</button>
                  <button class="remove-btn" @click="eliminarItem(item.ramo.id, item.tamano.value)" aria-label="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Subtotal -->
          <div class="subtotal-row">
            <span class="subtotal-label">Subtotal estimado</span>
            <span class="subtotal-precio">{{ store.formatPrecio(store.totalCarrito) }}</span>
          </div>
          <p class="subtotal-nota">* El domicilio se calcula por separado según tu ubicación en Montería.</p>

          <div class="drawer-divider" />

          <!-- Formulario de datos -->
          <div class="form-section">
            <h3 class="form-title">📝 Tus datos para agendar</h3>
            <p class="form-sub">Completa para que podamos preparar tu pedido correctamente.</p>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="c-nombre">Nombre completo *</label>
                <input id="c-nombre" v-model="form.nombre" type="text" class="form-input" placeholder="¿Cómo te llamas?" />
              </div>
              <div class="form-field">
                <label class="form-label" for="c-telefono">WhatsApp / Teléfono *</label>
                <input id="c-telefono" v-model="form.telefono" type="tel" class="form-input" placeholder="Ej: 3001234567" />
              </div>
              <div class="form-field form-field--full">
                <label class="form-label" for="c-ocasion">Ocasión</label>
                <select id="c-ocasion" v-model="form.ocasion" class="form-input form-select">
                  <option value="">Selecciona una ocasión...</option>
                  <option>Cumpleaños</option>
                  <option>Aniversario</option>
                  <option>San Valentín</option>
                  <option>Día de la Madre</option>
                  <option>Amor y Amistad</option>
                  <option>Graduación</option>
                  <option>Sin ocasión especial</option>
                  <option>Otra</option>
                </select>
              </div>
              <div class="form-field form-field--full">
                <label class="form-label" for="c-fecha">Fecha de entrega deseada</label>
                <input id="c-fecha" v-model="form.fecha" type="date" class="form-input" :min="fechaMinima" />
              </div>
              <div class="form-field form-field--full">
                <label class="form-label" for="c-direccion">Dirección de entrega</label>
                <input id="c-direccion" v-model="form.direccion" type="text" class="form-input" placeholder="Barrio / dirección en Montería" />
              </div>
              <div class="form-field form-field--full">
                <label class="form-label" for="c-nota">Nota adicional / Dedicatoria</label>
                <textarea id="c-nota" v-model="form.nota" class="form-input form-textarea" rows="2" placeholder="Mensaje especial, color preferido, instrucciones..."></textarea>
              </div>
            </div>

            <!-- Error si campos requeridos vacíos -->
            <p v-if="enviado && !formValido" class="form-error">
              ⚠️ Por favor ingresa tu nombre y teléfono antes de continuar.
            </p>
          </div>

          <!-- CTA WhatsApp -->
          <div class="cta-section">
            <button class="cta-wa-btn" @click="agendarWhatsApp" :class="{ 'cta-wa-btn--loading': false }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Agendar mi Ramo por WhatsApp
            </button>
            <p class="cta-disclaimer">
              Al continuar, aceptas nuestras <button class="cta-link" @click="$emit('open-policy', 'terms')">políticas de servicio</button>
            </p>
          </div>

        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductosStore } from "~/stores/productos";

defineProps<{ modelValue: boolean }>();
defineEmits(["update:modelValue", "open-policy"]);

const store = useProductosStore();

// Número de WhatsApp del negocio — CAMBIA ESTE POR EL REAL
const WA_NUMBER = "573004567890";

const form = ref({
  nombre: "",
  telefono: "",
  ocasion: "",
  fecha: "",
  direccion: "",
  nota: "",
});

const enviado = ref(false);

const formValido = computed(() => form.value.nombre.trim() && form.value.telefono.trim());

// Fecha mínima: mañana
const fechaMinima = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
});

function eliminarItem(ramoId: number, tamanoValue: string) {
  // Elimina completamente el item sin importar la cantidad
  const idx = store.carritoItems.findIndex(
    (i) => i.ramo.id === ramoId && i.tamano.value === tamanoValue
  );
  if (idx !== -1) store.carritoItems.splice(idx, 1);
}

function agendarWhatsApp() {
  enviado.value = true;
  if (!formValido.value) return;

  // Construir el mensaje
  const lineas: string[] = [];
  lineas.push("🌸 *PEDIDO — Regocijo Floristería*");
  lineas.push("─────────────────────");
  lineas.push("");

  // Items
  lineas.push("🛒 *Ramos seleccionados:*");
  store.carritoItems.forEach((item) => {
    lineas.push(`• *${item.ramo.nombre}* — ${item.tamano.label} × ${item.cantidad} = ${store.formatPrecio(item.tamano.precio * item.cantidad)}`);
  });
  lineas.push(`\n💰 *Subtotal: ${store.formatPrecio(store.totalCarrito)}*`);
  lineas.push("(+ domicilio según ubicación)");
  lineas.push("");
  lineas.push("─────────────────────");

  // Datos del cliente
  lineas.push("👤 *Datos del cliente:*");
  lineas.push(`• Nombre: ${form.value.nombre}`);
  lineas.push(`• Teléfono: ${form.value.telefono}`);
  if (form.value.ocasion) lineas.push(`• Ocasión: ${form.value.ocasion}`);
  if (form.value.fecha) lineas.push(`• Fecha deseada: ${form.value.fecha}`);
  if (form.value.direccion) lineas.push(`• Dirección: ${form.value.direccion}`);
  if (form.value.nota) lineas.push(`• Nota/Dedicatoria: ${form.value.nota}`);
  lineas.push("");
  lineas.push("─────────────────────");
  lineas.push("¡Quiero confirmar mi pedido! 🌺");

  const mensaje = encodeURIComponent(lineas.join("\n"));
  const url = `https://wa.me/${WA_NUMBER}?text=${mensaje}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>

<style scoped>
/* ── Backdrop ── */
.carrito-backdrop {
  position: fixed; inset: 0; z-index: 9990;
  background: rgba(12,8,6,0.5);
  backdrop-filter: blur(4px);
}
.backdrop-fade-enter-active, .backdrop-fade-leave-active { transition: opacity 0.3s; }
.backdrop-fade-enter-from, .backdrop-fade-leave-to { opacity: 0; }

/* ── Drawer ── */
.carrito-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: min(460px, 100vw);
  z-index: 9995;
  background: #fffbf8;
  box-shadow: -8px 0 48px rgba(0,0,0,0.18);
  display: flex; flex-direction: column;
  overflow: hidden;
}
.drawer-slide-enter-active, .drawer-slide-leave-active { transition: transform 0.35s cubic-bezier(0.32,0,0.15,1); }
.drawer-slide-enter-from, .drawer-slide-leave-to { transform: translateX(100%); }

/* ── Header ── */
.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.4rem 1.5rem 1.1rem;
  background: linear-gradient(135deg, #fff0f4, #fdf6f0);
  border-bottom: 1px solid rgba(242,84,128,0.12);
  flex-shrink: 0;
}
.drawer-title { font-family: "Cormorant Garamond", Georgia, serif; font-size: 1.5rem; color: #292524; line-height: 1; }
.drawer-subtitle { font-family: "Jost", sans-serif; font-size: 0.72rem; color: #a8a29e; margin-top: 2px; letter-spacing: 0.05em; }
.drawer-close {
  background: rgba(242,84,128,0.08); border: none; border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #78716c; transition: all 0.2s;
}
.drawer-close:hover { background: rgba(242,84,128,0.18); color: #f25480; }

/* ── Empty ── */
.drawer-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 2rem; text-align: center; gap: 0.5rem;
}
.drawer-empty-icon { font-size: 3.5rem; }
.drawer-empty-title { font-family: "Cormorant Garamond", serif; font-size: 1.5rem; color: #292524; }
.drawer-empty-sub { font-family: "Jost", sans-serif; font-size: 0.82rem; color: #a8a29e; margin-bottom: 0.5rem; }
.drawer-empty-btn {
  margin-top: 0.75rem;
  padding: 0.6rem 1.4rem;
  background: linear-gradient(135deg, #f25480, #e8a0b0);
  color: white; border: none; border-radius: 2rem;
  font-family: "Jost", sans-serif; font-size: 0.85rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.drawer-empty-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(242,84,128,0.3); }

/* ── Scrollable body ── */
.drawer-body {
  flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem 1.5rem;
  scrollbar-width: thin; scrollbar-color: rgba(242,84,128,0.3) transparent;
  display: flex; flex-direction: column; gap: 0;
}
.drawer-body::-webkit-scrollbar { width: 4px; }
.drawer-body::-webkit-scrollbar-thumb { background: rgba(242,84,128,0.3); border-radius: 10px; }

/* ── Items ── */
.items-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
.cart-item {
  display: flex; align-items: center; gap: 0.85rem;
  padding: 0.85rem; border-radius: 1rem;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(242,84,128,0.1);
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.cart-item:hover { box-shadow: 0 4px 16px rgba(242,84,128,0.1); }
.item-img { width: 60px; height: 60px; border-radius: 0.6rem; object-fit: cover; flex-shrink: 0; }
.item-info { flex: 1; min-width: 0; }
.item-nombre { font-family: "Cormorant Garamond", serif; font-size: 1rem; color: #292524; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-tamano { font-family: "Jost", sans-serif; font-size: 0.7rem; color: #a8a29e; margin-top: 1px; }
.item-precio { font-family: "Jost", sans-serif; font-size: 0.78rem; font-weight: 600; color: #f25480; margin-top: 2px; }
.item-controls { display: flex; align-items: center; gap: 0.3rem; flex-shrink: 0; }
.qty-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: #fff5f7; border: 1px solid #ffc5d5; color: #f25480;
  font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; font-weight: 600; line-height: 1;
}
.qty-btn:hover { background: #f25480; color: white; border-color: #f25480; }
.qty-num { font-family: "Jost", sans-serif; font-size: 0.9rem; font-weight: 600; color: #292524; min-width: 18px; text-align: center; }
.remove-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: none; border: 1px solid #e7e5e4; color: #a8a29e;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; margin-left: 4px;
}
.remove-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

/* Items transition */
.item-list-enter-active, .item-list-leave-active { transition: all 0.25s ease; }
.item-list-enter-from { opacity: 0; transform: translateX(20px); }
.item-list-leave-to { opacity: 0; transform: translateX(20px); height: 0; margin: 0; padding: 0; }

/* ── Subtotal ── */
.subtotal-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, #fff0f4, #fdf6f0);
  border-radius: 0.75rem;
  border: 1px solid rgba(242,84,128,0.12);
  margin-bottom: 0.4rem;
}
.subtotal-label { font-family: "Jost", sans-serif; font-size: 0.82rem; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.06em; }
.subtotal-precio { font-family: "Cormorant Garamond", serif; font-size: 1.4rem; font-weight: 700; color: #d43868; }
.subtotal-nota { font-family: "Jost", sans-serif; font-size: 0.7rem; color: #a8a29e; margin-bottom: 1rem; }

.drawer-divider { border: none; border-top: 1px solid rgba(242,84,128,0.1); margin: 0.25rem 0 1.1rem; }

/* ── Form ── */
.form-section { margin-bottom: 1.25rem; }
.form-title { font-family: "Cormorant Garamond", serif; font-size: 1.15rem; color: #292524; margin-bottom: 0.2rem; }
.form-sub { font-family: "Jost", sans-serif; font-size: 0.75rem; color: #a8a29e; margin-bottom: 0.9rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.form-field { display: flex; flex-direction: column; gap: 0.2rem; }
.form-field--full { grid-column: 1 / -1; }
.form-label { font-family: "Jost", sans-serif; font-size: 0.7rem; font-weight: 600; color: #78716c; letter-spacing: 0.05em; text-transform: uppercase; }
.form-input {
  width: 100%; padding: 0.55rem 0.75rem;
  border: 1px solid rgba(242,84,128,0.2);
  border-radius: 0.6rem;
  font-family: "Jost", sans-serif; font-size: 0.84rem; color: #292524;
  background: white; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.form-input:focus { border-color: #f25480; box-shadow: 0 0 0 3px rgba(242,84,128,0.12); }
.form-input::placeholder { color: #c4b5b1; }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a8a29e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.6rem center; background-size: 1rem; padding-right: 2rem; }
.form-textarea { resize: vertical; min-height: 60px; }
.form-error { font-family: "Jost", sans-serif; font-size: 0.78rem; color: #dc2626; margin-top: 0.5rem; padding: 0.5rem 0.75rem; background: #fee2e2; border-radius: 0.5rem; }

/* ── CTA ── */
.cta-section { flex-shrink: 0; position: sticky; bottom: 0; background: #fffbf8; padding-top: 0.75rem; }
.cta-wa-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  width: 100%; padding: 1rem;
  background: linear-gradient(135deg, #25D366, #1da851);
  color: white; border: none; border-radius: 1.1rem;
  font-family: "Jost", sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; letter-spacing: 0.02em;
  box-shadow: 0 6px 24px rgba(37,211,102,0.35);
  transition: all 0.2s;
}
.cta-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(37,211,102,0.45); }
.cta-wa-btn:active { transform: translateY(0); }
.cta-disclaimer { font-family: "Jost", sans-serif; font-size: 0.68rem; color: #a8a29e; text-align: center; margin-top: 0.5rem; }
.cta-link { background: none; border: none; color: #f25480; cursor: pointer; font-size: 0.68rem; text-decoration: underline; padding: 0; font-family: "Jost", sans-serif; }
</style>
