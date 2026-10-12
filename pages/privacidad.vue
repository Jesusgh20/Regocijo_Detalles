<template>
  <LegalPage eyebrow="Legal" :secciones="secciones">
    <template #title>Política de <em>privacidad</em></template>

    <template #resumen>
      <ul>
        <li>Esta página <strong>no guarda ni envía</strong> lo que escribes: solo prepara un mensaje y abre WhatsApp. Lo recibimos cuando tú lo envías.</li>
        <li>Pedimos solo lo necesario para entregar tu pedido o responder tu consulta.</li>
        <li>No usamos cookies, analíticas ni publicidad. No vendemos tus datos.</li>
        <li>Puedes pedir en cualquier momento que consultemos, corrijamos o eliminemos tus datos.</li>
      </ul>
    </template>

    <h2 id="responsable">1. Responsable del tratamiento</h2>
    <p>
      El responsable del tratamiento de los datos personales recolectados a través de este sitio es:
    </p>
    <ul>
      <li><strong>Nombre comercial:</strong> {{ NEGOCIO.nombre }}</li>
      <li><strong>Titular / razón social:</strong> <DatoNegocio campo="titular" /></li>
      <li><strong>NIT o cédula:</strong> <DatoNegocio campo="nit" /></li>
      <li><strong>Domicilio:</strong> <DatoNegocio campo="direccion" />, {{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }}, {{ NEGOCIO.pais }}</li>
      <li><strong>Correo para este tema:</strong> <DatoNegocio campo="email" /></li>
      <li><strong>WhatsApp / teléfono:</strong> {{ NEGOCIO.whatsapp.display }}</li>
    </ul>
    <p>
      Esta política se expide en cumplimiento de la Ley 1581 de 2012 («Régimen General de Protección de Datos Personales»),
      el Decreto 1377 de 2013 (hoy compilado en el Decreto 1074 de 2015) y demás normas que los modifiquen o complementen.
    </p>

    <h2 id="datos">2. Qué datos tratamos y cuándo</h2>
    <table>
      <thead><tr><th>Cuándo</th><th>Datos</th></tr></thead>
      <tbody>
        <tr>
          <td>Envías un pedido desde el carrito</td>
          <td>Tu nombre, fecha, barrio y dirección de entrega y lo que compras. Opcionales: ocasión, teléfono de quien recibe y dedicatoria o nota.</td>
        </tr>
        <tr>
          <td>Nos escribes desde «Contacto»</td>
          <td>Tu nombre, el asunto y tu mensaje.</td>
        </tr>
        <tr>
          <td>Hablas con nosotros por WhatsApp</td>
          <td>Tu número de teléfono, tu nombre de perfil y lo que escribas (esto lo gestiona WhatsApp al usar su servicio).</td>
        </tr>
        <tr>
          <td>Visitas el sitio</td>
          <td>Datos técnicos que genera el proveedor de alojamiento (dirección IP, navegador, fecha y hora) en sus registros de seguridad y funcionamiento. No los usamos para identificarte.</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Lo que no hacemos:</strong> no tienes que crear cuenta ni contraseña, no recibimos datos de tarjetas ni de pago a través de este sitio,
      no pedimos datos sensibles (salud, origen, ideología, biométricos, etc.) y no usamos cookies ni herramientas de analítica o publicidad.
    </p>

    <h2 id="funcionamiento">3. Cómo funciona el envío de tus datos</h2>
    <p>
      Los formularios de este sitio <strong>no tienen un servidor que reciba tus datos</strong>. Al pulsar «Enviar pedido por WhatsApp» o «Continuar en WhatsApp»,
      el navegador abre WhatsApp con un mensaje ya escrito. Solo cuando tú pulsas «enviar» en WhatsApp, ese mensaje llega a nosotros.
      Lo que escribes en el formulario no se guarda en esta página: si la cierras o la recargas, desaparece.
    </p>

    <h2 id="finalidades">4. Para qué usamos tus datos</h2>
    <ul>
      <li>Confirmar disponibilidad, valor y condiciones de tu pedido.</li>
      <li>Preparar y entregar tu pedido, y coordinar la entrega con quien lo recibe.</li>
      <li>Responder tus consultas, peticiones, quejas y reclamos.</li>
      <li>Cumplir obligaciones legales, contables y tributarias.</li>
    </ul>
    <p>
      No usamos tus datos para publicidad ni los vendemos. Si algún día quisiéramos enviarte promociones, te pediremos una autorización aparte
      y respetaremos los horarios y límites de contacto que fija la ley.
    </p>

    <h2 id="autorizacion">5. Autorización</h2>
    <p>
      Tratamos tus datos con tu autorización previa, expresa e informada. Por eso, antes de abrir WhatsApp, los formularios incluyen una casilla
      (que <strong>no viene marcada</strong>) que debes seleccionar tú. Puedes revocar tu autorización en cualquier momento, salvo cuando la ley nos
      obligue a conservar la información.
    </p>

    <h2 id="terceros">6. Con quién compartimos tus datos</h2>
    <ul>
      <li><strong>WhatsApp (Meta Platforms):</strong> es el canal por el que nos escribes. Trata tus datos según sus propias condiciones y política de privacidad.</li>
      <li><strong>Domiciliario o mensajero:</strong> recibe el nombre de quien recibe, la dirección y, si lo indicaste, su teléfono, solo para entregar el pedido.</li>
      <li><strong>Proveedor de alojamiento del sitio (Vercel Inc.):</strong> procesa los datos técnicos de visita descritos arriba.</li>
      <li>
        <strong>Supabase (almacenamiento del catálogo y de las fotos):</strong> guarda los ramos y las fotos que publica la tienda.
        No almacena datos de las personas que compran. Al ver una foto subida desde el panel, tu navegador la pide directamente a los
        servidores de Supabase, que pueden registrar datos técnicos de esa solicitud (como la dirección IP).
      </li>
      <li><strong>Autoridades:</strong> cuando la ley o una orden de autoridad competente lo exijan.</li>
    </ul>
    <p>No compartimos tus datos con terceros para fines publicitarios.</p>

    <h2 id="internacional">7. Servidores fuera de Colombia</h2>
    <p>
      WhatsApp y el proveedor de alojamiento pueden procesar información en servidores ubicados fuera de Colombia (por ejemplo, en Estados Unidos).
      Al otorgar tu autorización aceptas esa transmisión, necesaria para prestarte el servicio.
    </p>

    <h2 id="conservacion">8. Cuánto tiempo conservamos tus datos</h2>
    <p>
      Conservamos los datos de tu pedido o consulta durante el tiempo necesario para entregarlo, atender reclamos y cumplir las obligaciones legales
      (contables y tributarias) que apliquen. Después los eliminamos o los dejamos de usar. Puedes pedirnos que borremos antes la conversación y tus datos,
      salvo lo que la ley nos obligue a conservar.
    </p>

    <h2 id="derechos">9. Tus derechos y cómo ejercerlos</h2>
    <p>Como titular de los datos tienes derecho a (art. 8 de la Ley 1581 de 2012):</p>
    <ul>
      <li>Conocer, actualizar y rectificar tus datos.</li>
      <li>Solicitar prueba de la autorización que nos diste.</li>
      <li>Ser informado sobre el uso que damos a tus datos.</li>
      <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
      <li>Revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales.</li>
      <li>Acceder de forma gratuita a tus datos personales.</li>
    </ul>
    <h3>Cómo presentar una consulta o un reclamo</h3>
    <ol>
      <li>
        Escríbenos por WhatsApp al <strong>{{ NEGOCIO.whatsapp.display }}</strong>
        <template v-if="NEGOCIO.email"> o al correo <strong>{{ NEGOCIO.email }}</strong></template>
        <template v-else> o al correo <DatoNegocio campo="email" /></template>,
        indicando tu nombre, cómo contactarte y qué solicitas (consultar, corregir, suprimir, revocar…).
      </li>
      <li><strong>Consultas:</strong> las respondemos en un máximo de 10 días hábiles. Si necesitamos más tiempo, te avisaremos antes de que venza el plazo (máximo 5 días hábiles más).</li>
      <li><strong>Reclamos:</strong> los resolvemos en un máximo de 15 días hábiles. Si no es posible, te informaremos el motivo y la nueva fecha (máximo 8 días hábiles más). Si tu reclamo está incompleto, te pediremos que lo completes.</li>
      <li>Si no quedas conforme, puedes presentar una queja ante la Superintendencia de Industria y Comercio (<a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">www.sic.gov.co</a>) una vez agotado este trámite.</li>
    </ol>

    <h2 id="menores">10. Menores de edad</h2>
    <p>
      Este sitio está dirigido a personas mayores de edad. No recolectamos intencionalmente datos de niños, niñas ni adolescentes.
      Si crees que lo hicimos, escríbenos y los eliminaremos.
    </p>

    <h2 id="seguridad">11. Seguridad</h2>
    <p>
      El sitio se entrega por conexión cifrada (HTTPS) y está diseñado para recolectar el mínimo de datos: no guardamos tus datos en bases de datos propias.
      Las conversaciones de WhatsApp son accedidas únicamente por las personas del negocio que atienden los pedidos. Ningún sistema es infalible;
      si detectamos un incidente que afecte tus datos, actuaremos conforme a la ley.
    </p>

    <h2 id="cookies">12. Cookies</h2>
    <p>Este sitio no usa cookies. Lo explicamos en la <NuxtLink to="/cookies">Política de cookies</NuxtLink>.</p>

    <h2 id="cambios">13. Cambios y vigencia</h2>
    <p>
      Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha. La versión actual rige desde
      el {{ NEGOCIO.legalActualizado }}.
    </p>
  </LegalPage>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const secciones = [
  { id: 'responsable', titulo: 'Responsable del tratamiento' },
  { id: 'datos', titulo: 'Qué datos tratamos y cuándo' },
  { id: 'funcionamiento', titulo: 'Cómo funciona el envío' },
  { id: 'finalidades', titulo: 'Para qué usamos tus datos' },
  { id: 'autorizacion', titulo: 'Autorización' },
  { id: 'terceros', titulo: 'Con quién los compartimos' },
  { id: 'internacional', titulo: 'Servidores fuera de Colombia' },
  { id: 'conservacion', titulo: 'Cuánto tiempo los conservamos' },
  { id: 'derechos', titulo: 'Tus derechos y cómo ejercerlos' },
  { id: 'menores', titulo: 'Menores de edad' },
  { id: 'seguridad', titulo: 'Seguridad' },
  { id: 'cookies', titulo: 'Cookies' },
  { id: 'cambios', titulo: 'Cambios y vigencia' },
]

useHead({
  title: 'Política de privacidad – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Cómo tratamos tus datos personales en Regocijo Floristería, conforme a la Ley 1581 de 2012 de Colombia.' }],
})
</script>
