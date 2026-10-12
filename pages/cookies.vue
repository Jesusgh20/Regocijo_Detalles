<template>
  <LegalPage eyebrow="Legal" :secciones="secciones">
    <template #title>Política de <em>cookies</em></template>

    <template #resumen>
      <ul>
        <li>Este sitio <strong>no usa cookies</strong> ni almacenamiento local, ni propias ni de terceros.</li>
        <li>No hay analíticas, píxeles de publicidad, mapas ni videos incrustados. Las fotos del catálogo las aloja un servicio externo (Supabase), sin cookies.</li>
        <li>Por eso no te mostramos un aviso de cookies: no hay nada que aceptar.</li>
      </ul>
    </template>

    <h2 id="que-son">1. Qué son las cookies</h2>
    <p>
      Las cookies son pequeños archivos que un sitio web guarda en tu dispositivo para recordar información (por ejemplo, tu sesión, tus preferencias
      o para medir visitas). Tecnologías parecidas, como el almacenamiento local del navegador, cumplen funciones similares.
    </p>

    <h2 id="que-hacemos">2. Qué usa este sitio</h2>
    <table>
      <thead><tr><th>Tipo</th><th>¿Lo usamos?</th><th>Detalle</th></tr></thead>
      <tbody>
        <tr><td>Estrictamente necesarias</td><td>No</td><td>No hay inicio de sesión ni procesos de pago en el sitio. El carrito vive solo en la página abierta y se pierde al cerrarla o recargarla.</td></tr>
        <tr><td>Preferencias</td><td>No</td><td>No guardamos idioma, tema ni otras preferencias.</td></tr>
        <tr><td>Analíticas / estadísticas</td><td>No</td><td>No medimos ni rastreamos tu visita (no usamos Google Analytics ni similares).</td></tr>
        <tr><td>Publicidad / seguimiento</td><td>No</td><td>No usamos píxeles ni cookies publicitarias (Meta, Google, TikTok, etc.).</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Excepción:</strong> el panel de administración (<code>/admin</code>), al que solo accede el personal de la tienda, guarda en el navegador de esa persona
      una sesión para mantener el inicio de sesión. Es estrictamente necesaria, no recoge datos de visitantes y no afecta a quienes solo navegan la tienda.
    </p>
    <p>
      Como la tienda no usa cookies para quienes la visitan, <strong>no se requiere tu consentimiento</strong> y por eso no mostramos un banner de cookies.
      Las tipografías se sirven desde nuestro propio sitio, por lo que tu navegador no se conecta a Google Fonts ni a otros servidores de tipografías.
    </p>

    <h2 id="registros">3. Registros técnicos del servidor</h2>
    <p>
      Como en cualquier sitio, el proveedor de alojamiento (Vercel Inc.) puede registrar datos técnicos de cada visita (dirección IP, navegador, fecha y hora)
      para garantizar la seguridad y el funcionamiento. Lo mismo ocurre con el servicio que aloja las fotos del catálogo (Supabase) cuando tu navegador las descarga.
      No son cookies y no los usamos para identificarte. Más información en la
      <NuxtLink to="/privacidad#datos">Política de privacidad</NuxtLink>.
    </p>

    <h2 id="externos">4. Enlaces a otros sitios</h2>
    <p>
      Este sitio enlaza a WhatsApp e Instagram. Esos enlaces solo se abren cuando tú los pulsas. Una vez que entras a esos servicios, aplican sus propias
      políticas de privacidad y de cookies, que nosotros no controlamos.
    </p>

    <h2 id="futuro">5. Si esto cambia</h2>
    <p>
      Si en el futuro añadimos herramientas que usen cookies no esenciales (por ejemplo, analíticas), te pediremos tu consentimiento previo, expreso e informado
      <em>antes</em> de activarlas, te permitiremos rechazarlas con la misma facilidad con la que las aceptas y actualizaremos esta política y su fecha.
    </p>

    <h2 id="gestionar">6. Cómo controlar las cookies en tu navegador</h2>
    <p>
      Puedes ver, bloquear o eliminar las cookies de cualquier sitio desde los ajustes de privacidad de tu navegador. Aunque este sitio no las use,
      puede ser útil para otros.
    </p>

    <h2 id="contacto">7. Contacto</h2>
    <p>
      ¿Dudas sobre esta política? Escríbenos por WhatsApp al <strong>{{ NEGOCIO.whatsapp.display }}</strong>
      <template v-if="NEGOCIO.email"> o a <strong>{{ NEGOCIO.email }}</strong></template>.
    </p>
  </LegalPage>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const secciones = [
  { id: 'que-son', titulo: 'Qué son las cookies' },
  { id: 'que-hacemos', titulo: 'Qué usa este sitio' },
  { id: 'registros', titulo: 'Registros técnicos del servidor' },
  { id: 'externos', titulo: 'Enlaces a otros sitios' },
  { id: 'futuro', titulo: 'Si esto cambia' },
  { id: 'gestionar', titulo: 'Cómo controlar las cookies' },
  { id: 'contacto', titulo: 'Contacto' },
]

useHead({
  title: 'Política de cookies – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Este sitio no usa cookies ni rastreadores. Conoce los detalles.' }],
})
</script>
