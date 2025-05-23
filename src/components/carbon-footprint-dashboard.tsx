"use client"

import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {filtrarPorMeses} from "@/lib/calculate_carbon_data"
import {type FacturaExtendida, MESES} from "@/lib/definitions"
import {ConsumptionChartsCard} from "@/components/consumptions_charts/consumptions_charts_card.tsx";
import {ConsumptionTableCard} from "@/components/consumption_table/consumption_table_card.tsx";
import {ConsumptionSummaryCard} from "@/components/consumption_summary/consumption_summary_card.tsx";

const getJsonData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular un retraso de 1 segundo
    const response = await fetch("/consumo_por_mes.json")
    if (!response.ok)
        throw new Error("Error al cargar el JSON")

    const data = await response.json()
    return data
}

export function CarbonFootprintDashboard() {
    const [datos, setDatos] = useState<FacturaExtendida[]>([])
    const [loading, setLoading] = useState(true)
    const [mesDesde, setMesDesde] = useState("enero")
    const [mesHasta, setMesHasta] = useState("mayo")

    useEffect(() => {
        setLoading(true)
        getJsonData()
            .then(json => {
                setDatos(json.data)
            })
            .catch(error => {
                console.error("Error cargando JSON:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const datosFiltrados = filtrarPorMeses(datos, mesDesde, mesHasta)

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-14 px-8 text-lg">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                <h1 className="text-3xl font-bold text-center mb-8 text-emerald-600 dark:text-emerald-500">
                    Huella de Carbono - Campus
                </h1>

                {/* Selectores de meses */}
                <div className="flex gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium">Desde:</label>
                        <select className="border rounded-md px-2 py-1 ml-2 text-gray-700" value={mesDesde} onChange={(e) => setMesDesde(e.target.value)}>
                            {MESES.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Hasta:</label>
                        <select className="border rounded-md px-2 py-1 ml-2 text-gray-700" value={mesHasta} onChange={(e) => setMesHasta(e.target.value)}>
                            {MESES.map((m) => (
                                <option className="px-2" key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tabla y resumen */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                        className="lg:col-span-2"
                    >
                        <ConsumptionTableCard datosFiltrados={datosFiltrados}/>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                    >
                        <ConsumptionSummaryCard datosFiltrados={datosFiltrados} mesDesde={mesDesde} mesHasta={mesHasta}/>
                    </motion.div>
                </div>

                {/* Gráficos */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.6}}
                >
                    <ConsumptionChartsCard datosFiltrados={datosFiltrados}/>
                </motion.div>
            </motion.div>
        </div>
    )
}