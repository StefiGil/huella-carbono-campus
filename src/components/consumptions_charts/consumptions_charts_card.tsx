import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ConsumptionChart} from "@/components/consumptions_charts/consumption-chart.tsx";
import {ConsumptionTrendChart} from "@/components/consumptions_charts/consuption_trend_chart.tsx";
import type {FacturaExtendida} from "@/lib/definitions.ts";
import {calcularBreakdown} from "@/lib/calculate_carbon_data.ts";

export const ConsumptionChartsCard = ({datosFiltrados}: { datosFiltrados: FacturaExtendida[] }) => {
    const breakdown = calcularBreakdown(datosFiltrados)
    return (
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
                            <ConsumptionChart breakdown={breakdown}/>
                        </div>
                    </TabsContent>

                    <TabsContent value="trend" className="pt-4">
                        <div className="h-[400px]">
                            <ConsumptionTrendChart data={datosFiltrados}/>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

