/** Estado del cajón del carrito, compartido entre el header, las tarjetas y la ficha. */
export function useCarritoUI() {
  const abierto = useState<boolean>('carritoAbierto', () => false)
  return {
    abierto,
    abrir: () => { abierto.value = true },
    cerrar: () => { abierto.value = false },
  }
}
