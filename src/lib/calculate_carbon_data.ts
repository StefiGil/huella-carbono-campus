export type Categoria = {
  category: string
  percentage: number
}

export type FacturaExtendida = {
  month: string
  year: number
  consumption: number
  breakdown: Categoria[]
}

export type Resumen = {
  totalConsumption: number
  carbonFootprint: number
}

export type BreakdownCalculado = {
  category: string
  consumo: number
  percentage: number
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

// Factor de emisión estándar (tCO₂/MWh)
const FE = 0.408

function mesANumero(mes: string): number {
  return MESES.indexOf(mes.toLowerCase())
}

export function filtrarPorMeses(
  data: FacturaExtendida[],
  desde: string,
  hasta: string
): FacturaExtendida[] {
  const inicio = mesANumero(desde)
  const fin = mesANumero(hasta)

  return data.filter((f) => {
    const mesIndex = mesANumero(f.month)
    return mesIndex >= inicio && mesIndex <= fin
  })
}

export function calcularResumen(data: FacturaExtendida[]): Resumen {
  const total = data.reduce((acc, item) => acc + item.consumption, 0)
  const huella = (total / 1000) * FE
  return {
    totalConsumption: total,
    carbonFootprint: parseFloat(huella.toFixed(3))
  }
}

export function calcularBreakdown(data: FacturaExtendida[]): BreakdownCalculado[] {
  const acumulado: Record<string, number> = {}

  data.forEach((item) => {
    item.breakdown.forEach((b) => {
      const consumoCat = (item.consumption * b.percentage) / 100
      acumulado[b.category] = (acumulado[b.category] || 0) + consumoCat
    })
  })

  const total = Object.values(acumulado).reduce((a, b) => a + b, 0)

  return Object.entries(acumulado).map(([category, consumo]) => ({
    category,
    consumo: parseFloat(consumo.toFixed(2)),
    percentage: parseFloat(((consumo / total) * 100).toFixed(1))
  }))
}
