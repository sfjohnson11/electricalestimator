"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { EstimateProvider } from "@/context/estimate-context"

const CoverSheet = dynamic(() => import("@/components/cover-sheet"), { ssr: false })
const EstimatorApp = dynamic(() => import("@/components/estimator-app"), { ssr: false })

export default function Home() {
  const [showEstimator, setShowEstimator] = useState(false)

  return (
    <EstimateProvider>
      <div>
        {!showEstimator ? (
          <CoverSheet onStartEstimate={() => setShowEstimator(true)} />
        ) : (
          <EstimatorApp onReturnToCover={() => setShowEstimator(false)} />
        )}
      </div>
    </EstimateProvider>
  )
}
