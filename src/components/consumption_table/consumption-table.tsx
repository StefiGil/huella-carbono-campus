"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { motion } from "framer-motion"
import type {FacturaExtendida} from "@/lib/definitions.ts";

export function ConsumptionTable({ data }: { data: FacturaExtendida[] }) {
  // Function to capitalize first letter
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mes</TableHead>
            <TableHead>Año</TableHead>
            <TableHead className="text-right">Consumo (kWh)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <motion.tr
              key={`${item.month}-${item.year}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium">{capitalize(item.month)}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell className="text-right">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.consumption}</span>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
