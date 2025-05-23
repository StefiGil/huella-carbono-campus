import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ConsumptionTable} from "@/components/consumption_table/consumption-table.tsx";
import type {FacturaExtendida} from "@/lib/definitions.ts";

export const ConsumptionTableCard = ({datosFiltrados} : {datosFiltrados: FacturaExtendida[]}) =>{
    return <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Consumo Eléctrico Mensual</CardTitle>
            <CardDescription>Registro por mes con desglose por categoría</CardDescription>
        </CardHeader>
        <CardContent>
            <ConsumptionTable data={datosFiltrados}/>
        </CardContent>
    </Card>
}

