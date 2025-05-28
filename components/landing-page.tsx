import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to E-Deck Estimator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">Transform your electrical business with our cutting-edge estimation tool.</p>
          <div className="flex justify-center">
            <Link href="https://buy.stripe.com/3csdS5fdLbin8ko2d1" passHref>
              <Button>Get Full Access</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
