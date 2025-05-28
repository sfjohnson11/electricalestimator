"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { Pie, Bar } from "react-chartjs-2"
import { useEstimate } from "@/context/estimate-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export function EstimateCharts() {
  const { estimate, subtotal, additionalCostsTotal, overheadAmount, profitAmount, taxAmount, totalManhours } =
    useEstimate()

  const costBreakdownData = {
    labels: ["Materials", "Labor", "Additional Costs", "Overhead", "Profit", "Tax"],
    datasets: [
      {
        data: [
          estimate.lineItems.reduce((sum, item) => sum + item.quantity * item.materialCost, 0),
          estimate.lineItems.reduce((sum, item) => sum + item.quantity * item.laborRate, 0),
          additionalCostsTotal,
          overheadAmount,
          profitAmount,
          taxAmount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
      },
    ],
  }

  const topMaterials = estimate.lineItems
    .sort((a, b) => b.quantity * b.materialCost - a.quantity * a.materialCost)
    .slice(0, 5)

  const materialUsageData = {
    labels: topMaterials.map((item) => item.materialId),
    datasets: [
      {
        label: "Material Cost",
        data: topMaterials.map((item) => item.quantity * item.materialCost),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 sm:h-80">
            <Pie data={costBreakdownData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Top 5 Materials by Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 sm:h-80">
            <Bar
              data={materialUsageData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Total Manhours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl font-bold text-center">{totalManhours.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
