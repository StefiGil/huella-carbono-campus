"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

interface BreakdownData {
  category: string
  percentage: number
}

export function ConsumptionChart({ breakdown }: { breakdown: BreakdownData[] }) {
  // Format data for the chart
  const data = breakdown.map((item) => ({
    name: item.category,
    value: item.percentage,
  }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="h-full">
      <ChartContainer
        config={{
          ...breakdown.reduce(
            (acc, item, index) => {
              acc[item.category] = {
                label: item.category,
                color: `hsl(var(--chart-${(index % 10) + 1}))`,
              }
              return acc
            },
            {} as Record<string, { label: string; color: string }>,
          ),
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
            {data.map((_entry, index) => (
                <Cell 
                key={`cell-${index}`} 
                fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
                />
            ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
