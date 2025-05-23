"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsumptionTable } from "@/components/consumption-table"
import { ConsumptionSummary } from "@/components/consumption-summary"
import { ConsumptionChart } from "@/components/consumption-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"
import {
  filtrarPorMeses,
  calcularResumen,
  calcularBreakdown,
  type FacturaExtendida
} from "@/lib/calculate_carbon_data"

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

export function CarbonFootprintDashboard() {
  const [datos, setDatos] = useState<FacturaExtendida[]>([])
  const [loading, setLoading] = useState(true)
  const [mesDesde, setMesDesde] = useState("enero")
  const [mesHasta, setMesHasta] = useState("mayo")

  useEffect(() => {
    fetch("/consumo_por_mes.json")
      .then((res) => res.json())
      .then((json) => setDatos(json.data))
      .catch((error) => console.error("Error cargando JSON:", error))
      .finally(() => setLoading(false))
  }, [])

  const datosFiltrados = filtrarPorMeses(datos, mesDesde, mesHasta)
  const resumen = calcularResumen(datosFiltrados)
  const breakdown = calcularBreakdown(datosFiltrados)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-14 px-8 text-lg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-center mb-8 text-emerald-600 dark:text-emerald-500">
          Huella de Carbono - Campus
        </h1>

        {/* Selectores de meses */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="text-sm font-medium">Desde:</label>
            <select className= "border rounded-md px-2 py-1 ml-2 text-gray-700"  value={mesDesde} onChange={(e) => setMesDesde(e.target.value)}>
              {MESES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Hasta:</label>
            <select className= "border rounded-md px-2 py-1 ml-2 text-gray-700"  value={mesHasta} onChange={(e) => setMesHasta(e.target.value)}>
              {MESES.map((m) => (
                <option className="px-2" key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla y resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Consumo Eléctrico Mensual</CardTitle>
                <CardDescription>Registro por mes con desglose por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <ConsumptionTable data={datosFiltrados} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>Totales para el período seleccionado</CardDescription>
              </CardHeader>
              <CardContent>
                <ConsumptionSummary summary={resumen} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Gráficos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Análisis de Consumo</CardTitle>
              <CardDescription>Visualización por categoría y por tendencia</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="breakdown" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="breakdown">Desglose por Categoría</TabsTrigger>
                  <TabsTrigger value="trend">Tendencia Mensual</TabsTrigger>
                </TabsList>

                <TabsContent value="breakdown" className="pt-4">
                  <div className="h-[400px]">
                    <ConsumptionChart breakdown={breakdown} />
                  </div>
                </TabsContent>

                <TabsContent value="trend" className="pt-4">
                  <div className="h-[400px]">
                    <ConsumptionTrendChart data={datosFiltrados} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}


// This component would be in its own file in a real app
function ConsumptionTrendChart({data}: { data: FacturaExtendida[] }) {
    const chartData = data.map((item) => ({
        name: `${item.month.charAt(0).toUpperCase() + item.month.slice(1)}`,
        consumo: item.consumption,
    }))

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 50}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 12}}/>
                    <YAxis
                        label={{value: "Consumo (kWh)", angle: -90, position: "insideLeft", style: {textAnchor: "middle"}}}
                    />
                    <Tooltip formatter={(value) => [`${value} kWh`, "Consumo"]}/>
                    <Legend verticalAlign="top" height={36}/>
                    <Bar
                        dataKey="consumo"
                        name="Consumo Eléctrico"
                        fill="hsl(var(--chart-1))"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                    >
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
