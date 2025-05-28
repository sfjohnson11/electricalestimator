"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { materialCategories, getMaterial } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DemoEstimator() {
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState({ materialId: "", quantity: 0 })

  const addItem = () => {
    if (items.length >= 3) {
      alert("Demo is limited to 3 items. Get full access for unlimited items!")
      return
    }
    if (currentItem.materialId && currentItem.quantity > 0) {
      setItems([...items, currentItem])
      setCurrentItem({ materialId: "", quantity: 0 })
    }
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const material = getMaterial(item.materialId)
      return total + (material?.manhourUnit || 0) * item.quantity
    }, 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>E-Deck Estimator Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Select
                value={currentItem.materialId}
                onValueChange={(value) => setCurrentItem({ ...currentItem, materialId: value })}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materialCategories.map((category) => (
                    <div key={category.id}>
                      <div className="px-2 py-1.5 text-sm font-semibold">{category.name}</div>
                      {category.materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Quantity"
                value={currentItem.quantity || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                className="w-24"
              />
              <Button onClick={addItem}>Add Item</Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="space-y-2">
                {items.map((item, index) => {
                  const material = getMaterial(item.materialId)
                  return (
                    <li key={index} className="flex justify-between">
                      <span>
                        {material?.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(material?.manhourUnit * item.quantity)}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total Manhours:</span>
              <span>{calculateTotal().toFixed(2)}</span>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p className="font-bold">Demo Limitations</p>
              <p>This demo is limited to 3 items. Purchase the full version for unlimited items and all features!</p>
            </div>

            <Button
              className="w-full"
              onClick={() => (window.location.href = "https://buy.stripe.com/3csdS5fdLbin8ko2d1")}
            >
              Get Full Access Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
