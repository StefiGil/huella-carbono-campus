import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ConsumptionSummary} from "@/components/consumption_summary/consumption-summary.tsx";
import type {FacturaExtendida} from "@/lib/definitions.ts";
import {calcularResumen} from "@/lib/calculate_carbon_data.ts";

export const ConsumptionSummaryCard = ({datosFiltrados, mesDesde, mesHasta} : {datosFiltrados: FacturaExtendida[], mesDesde : string, mesHasta : string}) => {

    const resumen = calcularResumen(datosFiltrados)
    return <Card className="shadow-md h-full">
        <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Totales para el período seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
            <ConsumptionSummary summary={resumen} mesHasta={mesHasta} mesDesde={mesDesde}/>
        </CardContent>
    </Card>
}
