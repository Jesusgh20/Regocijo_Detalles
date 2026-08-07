<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="policy-overlay" @click.self="$emit('update:modelValue', false)" role="dialog" aria-modal="true">
        <div class="policy-modal">

          <!-- Header -->
          <div class="policy-header">
            <span class="policy-logo">🌸</span>
            <div>
              <h2 class="policy-title">Regocijo Floristería</h2>
              <p class="policy-subtitle">Políticas de Servicio</p>
            </div>
            <button class="policy-close" @click="$emit('update:modelValue', false)" aria-label="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="policy-tabs" role="tablist">
            <button role="tab" :aria-selected="activeTab === 'terms'" :class="['policy-tab', activeTab === 'terms' ? 'policy-tab--active' : '']" @click="activeTab = 'terms'">
              📋 Términos y Condiciones
            </button>
            <button role="tab" :aria-selected="activeTab === 'privacy'" :class="['policy-tab', activeTab === 'privacy' ? 'policy-tab--active' : '']" @click="activeTab = 'privacy'">
              🔒 Política de Privacidad
            </button>
          </div>

          <!-- Content -->
          <div class="policy-body" role="tabpanel">
            <Transition name="tab-fade" mode="out-in">

              <!-- TERMS -->
              <div v-if="activeTab === 'terms'" key="terms">
                <div class="policy-section">
                  <div class="policy-section-icon">🎨</div>
                  <div>
                    <h3 class="policy-section-title">Diseños</h3>
                    <p class="policy-section-text">Todos nuestros arreglos son personalizados, por lo que pueden variar en flores, color, tamaño, forma y decoración según disponibilidad, garantizando siempre un resultado igual o mejor.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">📅</div>
                  <div>
                    <h3 class="policy-section-title">Pedidos</h3>
                    <p class="policy-section-text">Los pedidos se agendan con 1 a 2 días de anticipación. Pedidos para el mismo día están sujetos a disponibilidad y requieren mínimo 2 horas de preparación. Una vez iniciado el proceso de elaboración, no se aceptan cancelaciones.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">💳</div>
                  <div>
                    <h3 class="policy-section-title">Pagos</h3>
                    <p class="policy-section-text">Para agendar se requiere anticipo o pago completo. No se separan pedidos sin confirmación de pago. Los precios pueden variar según temporada, por lo que recomendamos confirmarlos antes de realizar el pago.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">📝</div>
                  <div>
                    <h3 class="policy-section-title">Datos del pedido</h3>
                    <p class="policy-section-text">Después del pago recibirás un enlace para diligenciar los datos del pedido. Este paso es obligatorio; si no se completa, no nos hacemos responsables por errores en la entrega.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">🕐</div>
                  <div>
                    <h3 class="policy-section-title">Horarios</h3>
                    <p class="policy-section-text">Nuestro horario de atención es de lunes a viernes de 9:00 a.m. a 5:00 p.m. Sábados, domingos y festivos de 8:00 a.m. a 12:00 p.m. Las entregas se realizan a partir de las 10:00 a.m. Entregas fuera de este horario deben pactarse previamente.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">🛵</div>
                  <div>
                    <h3 class="policy-section-title">Entregas</h3>
                    <p class="policy-section-text">No contamos con domiciliario fijo. Preferiblemente puede recoger en punto físico. En caso de domicilio, el valor es aplicado por el domiciliario y puede variar según ubicación y disponibilidad. Si no hay quien reciba el pedido, la entrega deberá reprogramarse y el nuevo domicilio será asumido por el cliente. En casos de lluvia, tráfico o situaciones externas, los horarios pueden presentar retrasos.</p>
                  </div>
                </div>
                <div class="policy-section">
                  <div class="policy-section-icon">↩️</div>
                  <div>
                    <h3 class="policy-section-title">Cambios y Devoluciones</h3>
                    <p class="policy-section-text">No realizamos devoluciones de dinero. En caso necesario, se reemplaza por un producto del mismo valor. Solo respondemos si el arreglo se entrega en mal estado; luego de recibido en buen estado, no nos hacemos responsables por daños posteriores.</p>
                  </div>
                </div>
              </div>

              <!-- PRIVACY -->
              <div v-else-if="activeTab === 'privacy'" key="privacy">
                <div class="privacy-intro">
                  <div class="privacy-badge">🔒 Protección de Datos Personales</div>
                  <p class="policy-section-text" style="margin-top:1rem;">
                    La información personal suministrada en este formulario será utilizada únicamente para gestionar tu pedido, coordinar la entrega, brindarte atención y mantener comunicación relacionada con nuestros productos y servicios.
                  </p>
                  <p class="policy-section-text" style="margin-top:0.75rem;">
                    Al enviar este formulario, autorizas a <strong>Regocijo Floristería</strong> a realizar el tratamiento de tus datos personales de forma confidencial, de conformidad con la <strong>Ley 1581 de 2012</strong> y demás normas aplicables sobre protección de datos personales en Colombia.
                  </p>
                  <p class="policy-section-text" style="margin-top:0.75rem;">
                    Tus datos no serán compartidos con terceros, salvo cuando sea necesario para la prestación del servicio (por ejemplo, para realizar la entrega del pedido) o por obligación legal.
                  </p>
                </div>
                <div class="privacy-law-box">
                  <span class="privacy-law-icon">⚖️</span>
                  <div>
                    <p class="privacy-law-title">Marco Legal</p>
                    <p class="privacy-law-text">Ley 1581 de 2012 — Régimen General de Protección de Datos Personales · Colombia</p>
                  </div>
                </div>
              </div>

            </Transition>
          </div>

          <!-- Footer -->
          <div class="policy-footer">
            <p class="policy-footer-text">¿Tienes preguntas? Escríbenos por WhatsApp</p>
            <a href="https://wa.me/573004567890" target="_blank" rel="noopener" class="policy-wa-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contactar
            </a>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{ modelValue: boolean }>();
defineEmits(["update:modelValue"]);
const activeTab = ref<"terms" | "privacy">("terms");
</script>

<style scoped>
.policy-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(12, 8, 6, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.policy-modal {
  background: #fffbf8;
  border-radius: 1.75rem;
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(242,84,128,0.12);
}
.policy-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem 1.25rem;
  background: linear-gradient(135deg, #fff0f4 0%, #fdf6f0 100%);
  border-bottom: 1px solid rgba(242,84,128,0.12);
  flex-shrink: 0;
}
.policy-logo { font-size: 2.2rem; line-height: 1; }
.policy-title { font-family: "Cormorant Garamond", Georgia, serif; font-size: 1.4rem; color: #292524; line-height: 1.1; }
.policy-subtitle { font-family: "Jost", sans-serif; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: #f25480; margin-top: 2px; }
.policy-close {
  margin-left: auto;
  background: rgba(242,84,128,0.08);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #78716c;
  transition: all 0.2s;
  flex-shrink: 0;
}
.policy-close:hover { background: rgba(242,84,128,0.18); color: #f25480; transform: scale(1.08); }
.policy-tabs {
  display: flex;
  background: #f9f5f2;
  border-bottom: 1px solid rgba(242,84,128,0.1);
  flex-shrink: 0;
}
.policy-tab {
  flex: 1;
  padding: 0.85rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-family: "Jost", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #a8a29e;
  transition: all 0.2s;
  letter-spacing: 0.02em;
}
.policy-tab:hover { color: #f25480; }
.policy-tab--active { color: #f25480; border-bottom-color: #f25480; background: #fffbf8; }
.policy-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.75rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(242,84,128,0.3) transparent;
}
.policy-body::-webkit-scrollbar { width: 5px; }
.policy-body::-webkit-scrollbar-thumb { background: rgba(242,84,128,0.3); border-radius: 10px; }
.policy-section {
  display: flex;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(242,84,128,0.08);
}
.policy-section:last-child { border-bottom: none; }
.policy-section-icon { font-size: 1.35rem; flex-shrink: 0; margin-top: 0.1rem; width: 2rem; text-align: center; }
.policy-section-title { font-family: "Cormorant Garamond", Georgia, serif; font-size: 1.05rem; font-weight: 700; color: #292524; margin-bottom: 0.3rem; }
.policy-section-text { font-family: "Jost", sans-serif; font-size: 0.84rem; line-height: 1.65; color: #57534e; }
.privacy-intro { padding: 0.5rem 0; }
.privacy-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, rgba(242,84,128,0.1), rgba(251,191,36,0.08));
  border: 1px solid rgba(242,84,128,0.2);
  border-radius: 2rem;
  font-family: "Jost", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #f25480;
  letter-spacing: 0.04em;
}
.privacy-law-box {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #fff0f4, #fdf6f0);
  border: 1px solid rgba(242,84,128,0.15);
  border-radius: 1rem;
}
.privacy-law-icon { font-size: 1.6rem; }
.privacy-law-title { font-family: "Jost", sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #f25480; margin-bottom: 0.2rem; }
.privacy-law-text { font-family: "Jost", sans-serif; font-size: 0.8rem; color: #78716c; }
.policy-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.75rem;
  background: #f9f5f2;
  border-top: 1px solid rgba(242,84,128,0.1);
  flex-shrink: 0;
  gap: 1rem;
  flex-wrap: wrap;
}
.policy-footer-text { font-family: "Jost", sans-serif; font-size: 0.8rem; color: #a8a29e; }
.policy-wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  background: #25D366;
  color: white;
  border-radius: 2rem;
  font-family: "Jost", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(37,211,102,0.3);
}
.policy-wa-btn:hover { background: #1da851; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.tab-fade-enter-active, .tab-fade-leave-active { transition: all 0.2s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(8px); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-8px); }
@media (max-width: 600px) {
  .policy-modal { border-radius: 1.25rem 1.25rem 0 0; max-height: 92vh; margin-top: auto; }
  .policy-overlay { align-items: flex-end; padding: 0; }
  .policy-tab { font-size: 0.75rem; padding: 0.7rem 0.5rem; }
}
</style>
