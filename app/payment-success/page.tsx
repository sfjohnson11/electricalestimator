"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEstimate } from "@/context/estimate-context"
import { CheckCircle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentSuccessPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return <PaymentSuccessContent />
}

function PaymentSuccessContent() {
  const { setIsPaid } = useEstimate()
  const router = useRouter()

  useEffect(() => {
    // Set the paid status to true
    setIsPaid(true)

    // Store the paid status in localStorage
    localStorage.setItem("e-deck-estimator-paid", "true")
  }, [setIsPaid])

  const handleContinue = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Thank you for purchasing E-Deck Estimator. You now have full access to all features.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">What's included:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Unlimited estimates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Print and save functionality</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Complete electrical materials database</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Regular updates and improvements</span>
              </li>
            </ul>
          </div>

          <Button onClick={handleContinue} className="w-full">
            Continue to E-Deck Estimator <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
