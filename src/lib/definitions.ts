export const MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

export interface Categoria {
    category: string;
    percentage: number;
}

export interface FacturaExtendida {
    month: string
    year: number
    consumption: number
    breakdown: Categoria[]
}

export interface Resumen {
    totalConsumption: number;
    carbonFootprint: number;
}

export interface BreakdownCalculado {
    category: string;
    consumo: number;
    percentage: number;
}
