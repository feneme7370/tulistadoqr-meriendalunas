//dar formato de moneda
export const formatCurrency = (cantidad) => {
    return Number(cantidad).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })
}