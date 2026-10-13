<template>
  <LegalPage eyebrow="Legal" :secciones="secciones">
    <template #title>Términos y <em>condiciones</em></template>

    <template #resumen>
      <ul>
        <li>Cada ramo se prepara <strong>por encargo</strong>. Agenda con 1 a 2 días de anticipación.</li>
        <li>Este sitio no cobra: el pedido se confirma y se paga acordando todo por WhatsApp.</li>
        <li>El valor del domicilio depende de la ubicación y te lo informamos <strong>antes</strong> de que pagues.</li>
        <li>Si tu ramo llega en mal estado, escríbenos con fotos y lo resolvemos con cambio o devolución.</li>
      </ul>
    </template>

    <h2 id="quienes">1. Quiénes somos</h2>
    <p>Estos términos regulan la compra de productos a través de este sitio, operado por:</p>
    <ul>
      <li><strong>Nombre comercial:</strong> {{ NEGOCIO.nombre }}</li>
      <li><strong>Titular / razón social:</strong> <DatoNegocio campo="titular" /></li>
      <li><strong>NIT o cédula:</strong> <DatoNegocio campo="nit" /></li>
      <li><strong>Domicilio:</strong> <DatoNegocio campo="direccion" />, {{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }}, {{ NEGOCIO.pais }}</li>
      <li><strong>Contacto:</strong> WhatsApp {{ NEGOCIO.whatsapp.display }}<template v-if="NEGOCIO.email"> · {{ NEGOCIO.email }}</template><template v-else> · <DatoNegocio campo="email" /></template></li>
    </ul>

    <h2 id="aceptacion">2. Aceptación</h2>
    <p>
      Al hacer un pedido aceptas estos términos. Debes ser mayor de edad (o actuar con autorización de tu representante legal) y dar datos verdaderos.
      Si no estás de acuerdo, por favor no hagas pedidos a través del sitio.
    </p>

    <h2 id="productos">3. Productos y diseños</h2>
    <ul>
      <li>Vendemos ramos y arreglos florales elaborados por encargo. Las flores son productos naturales y perecederos.</li>
      <li>Las fotos del sitio son <strong>referenciales</strong>: pueden variar las flores, el color, el tamaño, la forma o la decoración según la disponibilidad y la temporada.</li>
      <li>Si alguna flor no está disponible, la reemplazaremos por otra de igual o mayor valor y de estilo similar. Cuando sea posible, te avisaremos antes.</li>
      <li>Los ramos que incluyen productos de terceros (chocolates, peluches, maquillaje, etc.) están sujetos a la disponibilidad de esas marcas o referencias.</li>
    </ul>

    <h2 id="precios">4. Precios</h2>
    <ul>
      <li>Los precios se expresan en pesos colombianos (COP) e incluyen los impuestos que apliquen. <strong>No incluyen el domicilio</strong>, cuyo valor se informa aparte.</li>
      <li>Los precios publicados son los vigentes a la fecha de la última actualización del sitio. Si por temporada de alta demanda (por ejemplo, San Valentín o Día de la Madre) cambia el precio de un ramo, te lo informaremos <strong>antes de que pagues</strong> y podrás aceptarlo o desistir sin costo.</li>
      <li>El subtotal del carrito es una estimación: los extras (por ejemplo, el peluche del ramo Ternura) y el domicilio se confirman por WhatsApp.</li>
    </ul>

    <h2 id="pedidos">5. Cómo se hace un pedido</h2>
    <ol>
      <li>Eliges tu ramo en el sitio y envías tu pedido por WhatsApp (este sitio no recibe pedidos ni pagos automáticamente).</li>
      <li>Te confirmamos disponibilidad, valor total y fecha de entrega.</li>
      <li>El pedido queda agendado cuando recibimos el anticipo o el pago completo. No separamos pedidos sin confirmación de pago.</li>
    </ol>
    <p>
      Los pedidos se agendan con <strong>1 a 2 días de anticipación</strong>. Los pedidos para el mismo día dependen de la disponibilidad y requieren mínimo
      2 horas de preparación. Revisa con atención el nombre, la dirección, la fecha y el teléfono de entrega: no nos hacemos responsables por fallas
      en la entrega causadas por datos incorrectos o incompletos.
    </p>

    <h2 id="pagos">6. Pagos</h2>
    <p>
      El medio de pago se acuerda por WhatsApp. Este sitio <strong>nunca</strong> te pide datos de tarjetas ni claves. Confirma siempre que los datos de pago
      te los envía el número oficial {{ NEGOCIO.whatsapp.display }}.
    </p>

    <h2 id="entregas">7. Entregas</h2>
    <ul>
      <li>Entregamos a domicilio en {{ NEGOCIO.ciudad }}. Si prefieres retirar tu pedido, consúltanos por WhatsApp.</li>
      <li>Las entregas se realizan a partir de las {{ NEGOCIO.entregasDesde }}. Entregas fuera de ese horario deben pactarse previamente.</li>
      <li>No contamos con domiciliario fijo: el valor del domicilio lo define el domiciliario según la ubicación y la disponibilidad, y te lo informamos antes de que pagues.</li>
      <li>Si al llegar no hay quien reciba el pedido, la entrega deberá reprogramarse y el nuevo domicilio lo asume el cliente.</li>
      <li>La lluvia, el tráfico u otras situaciones externas pueden causar retrasos.</li>
    </ul>
    <p>Horario de atención:</p>
    <ul>
      <li v-for="h in NEGOCIO.horarios" :key="h.dia">{{ h.dia }}: {{ h.hora }}</li>
    </ul>

    <h2 id="cambios">8. Cancelaciones, cambios, retracto y garantía</h2>
    <h3>Cancelaciones</h3>
    <p>
      Como cada ramo se elabora por encargo, <strong>una vez iniciada su elaboración no es posible cancelarlo</strong>. Antes de ese momento, escríbenos
      cuanto antes y te informamos cómo proceder.
    </p>
    <h3>Derecho de retracto</h3>
    <p>
      En las ventas a distancia, el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor) reconoce el derecho de retracto en ciertos casos, pero lo excluye
      para los bienes perecederos y para los bienes confeccionados según las especificaciones del consumidor o claramente personalizados.
      Como nuestros ramos son de flores naturales y se hacen por encargo, <strong>el derecho de retracto no aplica</strong> a ellos.
    </p>
    <h3>Garantía y reclamos</h3>
    <p>
      Esto no limita tus derechos legales como consumidor. Si tu ramo llega en mal estado o no corresponde a lo acordado, escríbenos lo antes posible,
      preferiblemente el mismo día de la entrega, con fotos del ramo y del empaque. Verificaremos el caso y, si corresponde, te ofreceremos la reposición
      del ramo o la devolución del dinero, conforme a la Ley 1480 de 2011. No respondemos por daños posteriores a la entrega causados por el manejo
      o cuidado inadecuado de las flores.
    </p>

    <h2 id="pqrs">9. Peticiones, quejas y reclamos</h2>
    <p>
      Escríbenos por WhatsApp al {{ NEGOCIO.whatsapp.display }}<template v-if="NEGOCIO.email"> o a {{ NEGOCIO.email }}</template>
      y atenderemos tu solicitud dentro de los plazos legales. Si no quedas conforme, puedes acudir a la Superintendencia de Industria y Comercio
      (<a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">www.sic.gov.co</a>).
    </p>

    <h2 id="propiedad">10. Propiedad intelectual</h2>
    <p>
      Las fotografías, el logo, los textos y los diseños de este sitio pertenecen a {{ NEGOCIO.nombre }} o se usan con autorización.
      No puedes copiarlos, modificarlos ni usarlos con fines comerciales sin nuestro permiso por escrito. Las marcas de terceros mencionadas
      (por ejemplo, de chocolates o maquillaje) pertenecen a sus dueños y se citan solo para describir el contenido del producto.
    </p>

    <h2 id="uso">11. Uso del sitio</h2>
    <p>
      Hacemos lo posible por mantener el sitio disponible y la información actualizada, pero no garantizamos que funcione sin interrupciones ni errores.
      Los enlaces a sitios de terceros (WhatsApp, Instagram) son una comodidad; no controlamos su contenido.
    </p>

    <h2 id="datos">12. Datos personales</h2>
    <p>
      Tratamos tus datos según la <NuxtLink to="/privacidad">Política de privacidad</NuxtLink> y la <NuxtLink to="/cookies">Política de cookies</NuxtLink>.
    </p>

    <h2 id="ley">13. Ley aplicable</h2>
    <p>
      Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se resolverá ante las autoridades competentes en Colombia,
      sin perjuicio de los derechos que la ley te reconoce como consumidor.
    </p>

    <h2 id="modificaciones">14. Cambios en estos términos</h2>
    <p>
      Podemos actualizar estos términos. La versión vigente es la publicada en esta página, con su fecha ({{ NEGOCIO.legalActualizado }}),
      y se aplica a los pedidos hechos a partir de ella.
    </p>
  </LegalPage>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const secciones = [
  { id: 'quienes', titulo: 'Quiénes somos' },
  { id: 'aceptacion', titulo: 'Aceptación' },
  { id: 'productos', titulo: 'Productos y diseños' },
  { id: 'precios', titulo: 'Precios' },
  { id: 'pedidos', titulo: 'Cómo se hace un pedido' },
  { id: 'pagos', titulo: 'Pagos' },
  { id: 'entregas', titulo: 'Entregas' },
  { id: 'cambios', titulo: 'Cancelaciones, retracto y garantía' },
  { id: 'pqrs', titulo: 'Peticiones, quejas y reclamos' },
  { id: 'propiedad', titulo: 'Propiedad intelectual' },
  { id: 'uso', titulo: 'Uso del sitio' },
  { id: 'datos', titulo: 'Datos personales' },
  { id: 'ley', titulo: 'Ley aplicable' },
  { id: 'modificaciones', titulo: 'Cambios en estos términos' },
]

useHead({
  title: 'Términos y condiciones – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Condiciones de compra, entrega, cambios y garantía de Regocijo Floristería, conforme al Estatuto del Consumidor de Colombia.' }],
})
</script>
