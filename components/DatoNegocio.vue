<template>
  <span v-if="valor">{{ valor }}</span>
  <span v-else class="pendiente">[{{ ETIQUETAS[campo] }} — pendiente]</span>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const props = defineProps<{ campo: 'titular' | 'nit' | 'direccion' | 'email' }>()

const ETIQUETAS = {
  titular: 'nombre del titular o razón social',
  nit: 'NIT o cédula',
  direccion: 'dirección',
  email: 'correo electrónico',
}

const valor = computed(() => NEGOCIO[props.campo])
</script>
