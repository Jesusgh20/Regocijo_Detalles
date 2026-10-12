/**
 * FUENTE ÚNICA de los datos del negocio.
 * Antes estaban repetidos (y contradictorios) en el layout, el carrito, la página de contacto,
 * la ficha de producto y el modal de políticas. Cámbialos SOLO aquí.
 *
 * Los campos en `null` son datos legales que el sitio no puede inventar y que tú debes completar
 * (aparecen resaltados como «pendiente» en las páginas legales hasta que los llenes).
 */
export const NEGOCIO = {
  nombre: 'Regocijo Floristería',
  marca: 'Regocijo',
  lema: 'La belleza de sentir',
  ciudad: 'Montería',
  departamento: 'Córdoba',
  pais: 'Colombia',

  // ── Datos legales: COMPLETAR (ver AUDITORIA.md) ─────────────────────────
  /** Nombre completo de la persona natural o razón social titular del negocio */
  titular: null as string | null,
  /** NIT o cédula con la que está inscrito el negocio (RUT) */
  nit: null as string | null,
  /** Dirección física / domicilio para notificaciones (puede ser el de la persona titular) */
  direccion: null as string | null,
  /** Correo real para peticiones, quejas y reclamos (PQRS) y derechos de datos personales */
  email: 'gerencia@regocijocol.com' as string | null,

  // ── Contacto verificado (tarjeta de marca regocijoinfo.jpeg) ─────────────
  whatsapp: { display: '+57 312 750 6785', e164: '573127506785' },
  telefonos: [
    { display: '+57 312 750 6785', e164: '573127506785' },
    { display: '+57 323 499 9029', e164: '573234999029' },
  ],
  instagram: { usuario: '@regocijo_detalles', url: 'https://www.instagram.com/regocijo_detalles/' },

  /** Modalidad de venta */
  modalidad: 'Solo domicilio',

  /** Horario de atención (tomado de las políticas de servicio). CONFIRMAR: antes había 3 versiones distintas. */
  horarios: [
    { dia: 'Lunes a viernes', hora: '9:00 a. m. – 5:00 p. m.' },
    { dia: 'Sábados, domingos y festivos', hora: '8:00 a. m. – 12:00 m.' },
  ],
  entregasDesde: '10:00 a. m.',

  /** Fecha de la última revisión de las páginas legales */
  legalActualizado: '11 de octubre de 2026',
}

export const DATOS_PENDIENTES = (['titular', 'nit', 'direccion', 'email'] as const).filter(
  (k) => NEGOCIO[k] === null,
)
