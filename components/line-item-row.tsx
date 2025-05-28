"use client"

import { SelectLabel } from "@/components/ui/select"

import { SelectGroup } from "@/components/ui/select"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useEstimate } from "@/context/estimate-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMaterialData, type Material, type Category } from "@/lib/material-list"
import { formatCurrency } from "@/lib/utils"

interface LineItemRowProps {
  item: {
    id: string
    materialId: string
    quantity: number
    materialCost: number
    laborRate: number
  }
  index: number
  recentlyUsed: string[]
  onRecentlyUsedUpdate: (materialId: string) => void
}

export default function LineItemRow({ item, index, recentlyUsed, onRecentlyUsedUpdate }: LineItemRowProps) {
  const { updateLineItem, removeLineItem, estimate } = useEstimate()
  const { materials, categories, error: materialError } = useMaterialData()
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const allMaterials = useMemo(() => Object.values(materials).flat(), [materials])
  const selectedMaterial = allMaterials.find((m: Material) => m.id === item.materialId)

  const totalMaterial = item.quantity * item.materialCost
  const manhourUnit = selectedMaterial?.manhourUnit || 0
  const totalManhours = item.quantity * manhourUnit
  const totalLabor = totalManhours * item.laborRate
  const lineTotal = totalMaterial + totalLabor

  useEffect(() => {
    if (materialError) {
      setError(`Error loading materials: ${materialError.message}`)
    }
  }, [materialError])

  useEffect(() => {
    if (item.materialId) {
      const category = categories.find(
        (cat) => materials[cat.id.toString()] && materials[cat.id.toString()].some((m) => m.id === item.materialId),
      )
      if (category) {
        setSelectedCategory(category.id.toString())
      }
    }
  }, [item.materialId, categories, materials])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    updateLineItem(item.id, { materialId: "" })
  }

  const handleMaterialChange = (materialId: string) => {
    try {
      updateLineItem(item.id, { materialId })
      onRecentlyUsedUpdate(materialId)
    } catch (err) {
      setError(`Error updating material: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleQuantityChange = (value: number) => {
    try {
      updateLineItem(item.id, { quantity: value })
    } catch (err) {
      setError(`Error updating quantity: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleMaterialCostChange = (value: number) => {
    try {
      updateLineItem(item.id, { materialCost: value })
    } catch (err) {
      setError(`Error updating material cost: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleLaborRateChange = (value: number) => {
    try {
      updateLineItem(item.id, { laborRate: value })
    } catch (err) {
      setError(`Error updating labor rate: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <tr className="border-b border-gray-200">
      <td className="p-2">
        <Select value={selectedCategory || ""} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: Category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={item.materialId} onValueChange={handleMaterialChange} disabled={!selectedCategory}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Material" />
          </SelectTrigger>
          <SelectContent>
            {selectedCategory && materials[selectedCategory] && (
              <>
                {recentlyUsed.length > 0 && (
                  <SelectGroup>
                    <SelectLabel>Recently Used</SelectLabel>
                    {recentlyUsed
                      .filter((id) => materials[selectedCategory].some((m) => m.id === id))
                      .map((materialId) => {
                        const material = materials[selectedCategory].find((m) => m.id === materialId)
                        return (
                          material && (
                            <SelectItem key={`recent-${material.id}`} value={material.id}>
                              {material.name}
                            </SelectItem>
                          )
                        )
                      })}
                  </SelectGroup>
                )}
                <SelectGroup>
                  <SelectLabel>{categories.find((c) => c.id.toString() === selectedCategory)?.name}</SelectLabel>
                  {materials[selectedCategory].map((material: Material) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </>
            )}
          </SelectContent>
        </Select>
      </td>
      <td className="p-2">
        <Input
          type="number"
          value={item.quantity || ""}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          placeholder="Qty"
          className="w-full"
        />
      </td>
      <td className="p-2">{selectedMaterial?.unit || "N/A"}</td>
      <td className="p-2">
        <Input
          type="number"
          value={item.materialCost || ""}
          onChange={(e) => handleMaterialCostChange(Number(e.target.value))}
          placeholder="Cost"
          className="w-full"
        />
      </td>
      <td className="p-2">{formatCurrency(totalMaterial)}</td>
      <td className="p-2">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeLineItem(item.id)}
            className="text-red-600 hover:text-red-800 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </td>
      {isExpanded && (
        <td colSpan={6} className="p-2 bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium">Labor Rate</label>
              <Input
                type="number"
                value={item.laborRate || ""}
                onChange={(e) => handleLaborRateChange(Number(e.target.value))}
                placeholder="Labor Rate"
                className="w-full mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Manhour Unit</label>
              <Input type="number" value={manhourUnit} readOnly className="w-full mt-1 bg-gray-100" />
            </div>
            <div>
              <label className="text-sm font-medium">Total Manhours</label>
              <Input type="number" value={totalManhours.toFixed(2)} readOnly className="w-full mt-1 bg-gray-100" />
            </div>
            <div>
              <label className="text-sm font-medium">Total Labor</label>
              <Input type="number" value={formatCurrency(totalLabor)} readOnly className="w-full mt-1 bg-gray-100" />
            </div>
          </div>
          <div className="mt-2">
            <label className="text-sm font-medium">Line Total</label>
            <Input type="number" value={formatCurrency(lineTotal)} readOnly className="w-full mt-1 bg-gray-100" />
          </div>
        </td>
      )}
    </tr>
  )
}
