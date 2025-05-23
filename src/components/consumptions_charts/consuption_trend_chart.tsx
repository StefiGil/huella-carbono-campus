import type {FacturaExtendida} from "@/lib/definitions.ts";
import {Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export function ConsumptionTrendChart({data}: { data: FacturaExtendida[] }) {
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