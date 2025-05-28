"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BarChart, Calculator, Check } from "lucide-react"
import AnimatedLogo from "./animated-logo"

interface CoverSheetProps {
  onStartEstimate: () => void
}

export default function CoverSheet({ onStartEstimate }: CoverSheetProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="text-center mb-12 pt-8">
          <AnimatedLogo />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">E-Deck Estimator</h1>
          <p className="text-xl">by S F Johnson Enterprises, LLC</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Electrical Estimating Revolution</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl md:text-2xl mb-4">
                Transform Your Electrical Business with Our Cutting-Edge Estimation Tool
              </h2>

              <h3 className="text-lg font-semibold mb-2">Benefits of Our Estimator</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Lightning-fast estimates in minutes, not hours</span>
                </li>
                <li className="flex items-start">
                  <BarChart className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive electrical component database</span>
                </li>
                <li className="flex items-start">
                  <Calculator className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Accurate manhour calculations</strong> for precise labor estimates
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Customizable pricing and profit margins</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Professional-looking estimate reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Cloud-based access from anywhere</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Built-in music player</strong> to enhance productivity while estimating
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Regular updates with the latest industry pricing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Sample Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/20 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Electrical Estimate</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-5 gap-2 font-medium">
                    <div>Material</div>
                    <div>Qty</div>
                    <div>Unit</div>
                    <div>Cost</div>
                    <div>Total</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div>1" EMT Conduit</div>
                    <div>100</div>
                    <div>LF</div>
                    <div>$2.50</div>
                    <div>$250.00</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div>#12 THHN Wire</div>
                    <div>300</div>
                    <div>LF</div>
                    <div>$0.35</div>
                    <div>$105.00</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div>200A Panel</div>
                    <div>1</div>
                    <div>EA</div>
                    <div>$350.00</div>
                    <div>$350.00</div>
                  </div>
                  <div className="border-t border-white/30 pt-1 mt-1 font-medium">
                    <div className="grid grid-cols-2">
                      <div>Subtotal:</div>
                      <div>$705.00</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div>Labor:</div>
                      <div>$1,250.00</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div>Total:</div>
                      <div>$1,955.00</div>
                    </div>
                    <div className="grid grid-cols-2 bg-blue-600/50 p-1 mt-1 rounded">
                      <div className="font-bold">Total Manhours:</div>
                      <div className="font-bold">16.5</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <Button onClick={onStartEstimate} className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                  Start Estimating Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Revolutionize Your Estimating Process?</h2>
          <p className="text-lg mb-4">
            Get started with E-Deck Estimator today and transform the way you create electrical estimates.
          </p>
          <Button onClick={onStartEstimate} className="bg-green-500 hover:bg-green-600 text-white font-medium">
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="bg-blue-900 py-4 text-center text-sm text-blue-200">
        <p>&copy; {new Date().getFullYear()} E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.</p>
        <p>Unauthorized use or reproduction of this software is strictly prohibited.</p>
      </footer>
    </div>
  )
}
