"use client"

import { motion } from "framer-motion"
import { CircleOff, Leaf } from "lucide-react"
import type {Resumen} from "@/lib/definitions.ts";

export function ConsumptionSummary({ summary, mesDesde, mesHasta }: {summary: Resumen , mesDesde : string, mesHasta : string}) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <CircleOff className="h-10 w-10 text-emerald-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Consumo total</p>
          <p className="text-2xl font-bold">{summary.totalConsumption} kWh</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center space-x-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
      >
        <Leaf className="h-10 w-10 text-emerald-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Huella de carbono estimada</p>
          <p className="text-2xl font-bold">{summary.carbonFootprint} toneladas de CO₂</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic text-center"
      >
        Equivalente a {Math.round(summary.carbonFootprint * 1000)} kg de CO₂
        <div className="mt-2 text-xs">Datos acumulados ({mesDesde} - {mesHasta} 2024)</div>
      </motion.div>
    </div>
  )
}
