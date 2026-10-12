<template>
  <div>
    <section class="lg-hero">
      <div class="wrap wrap--narrow">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1 class="display lg-title"><slot name="title" /></h1>
        <p class="lg-meta">
          Última actualización: {{ NEGOCIO.legalActualizado }}
          <span aria-hidden="true">·</span>
          <button type="button" class="link-inline lg-print no-print" @click="imprimir">Imprimir o guardar en PDF</button>
        </p>
      </div>
    </section>

    <div class="wrap wrap--narrow lg-body">
      <!-- Resumen en lenguaje sencillo -->
      <aside class="lg-summary" aria-labelledby="resumen-t">
        <h2 id="resumen-t" class="lg-summary-title">En pocas palabras</h2>
        <slot name="resumen" />
      </aside>

      <!-- Aviso de datos pendientes (solo mientras falten) -->
      <!-- Solo visible en desarrollo; en producción quedan las marcas «pendiente» dentro del texto -->
      <p v-if="DATOS_PENDIENTES.length && esDev" class="lg-pending" role="note">
        <strong>Nota para el administrador del sitio (solo visible en desarrollo):</strong> faltan datos del negocio por completar en
        <code>data/negocio.ts</code> ({{ DATOS_PENDIENTES.join(', ') }}). Mientras tanto aparecen resaltados como «pendiente» en el texto.
      </p>

      <!-- Índice -->
      <nav v-if="secciones?.length" class="lg-toc" aria-labelledby="toc-t">
        <h2 id="toc-t" class="lg-toc-title">Contenido</h2>
        <ol>
          <li v-for="s in secciones" :key="s.id"><a :href="`#${s.id}`" class="link-draw">{{ s.titulo }}</a></li>
        </ol>
      </nav>

      <div class="prose-legal">
        <slot />
      </div>

      <p class="lg-disclaimer">
        Este documento es informativo y describe cómo funciona este sitio. No sustituye la asesoría de un abogado.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO, DATOS_PENDIENTES } from '~/data/negocio'

defineProps<{ eyebrow: string; secciones?: { id: string; titulo: string }[] }>()

const esDev = import.meta.dev

function imprimir() { window.print() }
</script>

<style scoped>
.lg-hero { padding-block: clamp(3rem, 7vw, 5.5rem) 2rem; background: linear-gradient(170deg, var(--blush), var(--cream) 80%); border-bottom: 1px solid var(--line); }
.lg-title { font-size: clamp(2.8rem, 7vw, 5rem); margin: 1rem 0; }
.lg-meta { font-size: 0.9rem; color: var(--muted); display: flex; flex-wrap: wrap; gap: 0.5rem 0.75rem; align-items: center; }
.lg-print { background: none; border: 0; padding: 0; font: inherit; cursor: pointer; }

.lg-body { padding-block: 3rem 2rem; position: relative; z-index: 1; }
.lg-summary { padding: 1.5rem 1.75rem; background: var(--sage-soft); border-radius: 1.5rem; border: 1px solid rgba(63, 91, 60, 0.2); color: var(--ink); margin-bottom: 2rem; }
.lg-summary-title { font-size: 1.7rem; color: var(--sage); margin-bottom: 0.6rem; }
.lg-summary :deep(ul) { margin: 0; padding-left: 1.25rem; list-style: disc; display: grid; gap: 0.4rem; }
.lg-summary :deep(li::marker) { color: var(--sage); }

.lg-pending { margin-bottom: 2rem; padding: 1rem 1.25rem; background: #fff3cd; color: #5c4400; border: 1px solid #e6cf85; border-radius: 1rem; font-size: 0.9rem; }
.lg-pending code { background: rgba(0, 0, 0, 0.07); padding: 0.05rem 0.35rem; border-radius: 0.3rem; }

.lg-toc { padding: 1.4rem 1.75rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.5rem; margin-bottom: 1rem; }
.lg-toc-title { font-size: 1.5rem; margin-bottom: 0.6rem; }
.lg-toc ol { margin: 0; padding-left: 1.6rem; list-style: decimal; columns: 1; column-gap: 2.5rem; }
.lg-toc ol li { margin-bottom: 0.3rem; }
.lg-toc li::marker { color: var(--rose); font-weight: 500; }
@media (min-width: 700px) { .lg-toc ol { columns: 2; } }
.lg-toc li { padding-left: 0.2rem; break-inside: avoid; }
.lg-toc a { color: var(--ink); }
.lg-toc a:hover { color: var(--wine); }

.lg-disclaimer { margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line); font-size: 0.85rem; color: var(--muted); }
</style>
