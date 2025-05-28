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
  const { setIsPaid } = useEstimate()

  useEffect(() => {
    setIsClient(true)

    // Set the paid status to true
    if (typeof setIsPaid === "function") {
      setIsPaid(true)

      // Store the paid status in localStorage
      try {
        localStorage.setItem("e-deck-estimator-paid", "true")
      } catch (err) {
        console.error("Error saving paid status to localStorage:", err)
      }
    } else {
      console.error("setIsPaid is not a function", setIsPaid)
    }
  }, [setIsPaid])

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
