import { CarbonFootprintDashboard } from "@/components/carbon-footprint-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <CarbonFootprintDashboard />
    </main>
  )
}
