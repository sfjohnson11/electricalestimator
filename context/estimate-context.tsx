"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { calculatePercentage } from "@/lib/utils"
import { useMaterialData, type Material } from "@/lib/material-list"

interface LineItem {
  id: string
  materialId: string
  quantity: number
  materialCost: number
  laborRate: number
}

interface AdditionalCost {
  id: string
  description: string
  cost: number
}

interface EstimateData {
  lineItems: LineItem[]
  additionalCosts: AdditionalCost[]
  exclusions: string
  overheadPercent: number
  profitPercent: number
  taxPercent: number
  hourlyRate: number
}

interface EstimateContextType {
  estimate: EstimateData
  addLineItem: (item: LineItem) => void
  updateLineItem: (id: string, updates: Partial<LineItem>) => void
  removeLineItem: (id: string) => void
  addAdditionalCost: (cost: AdditionalCost) => void
  updateAdditionalCost: (id: string, updates: Partial<AdditionalCost>) => void
  removeAdditionalCost: (id: string) => void
  updateExclusions: (text: string) => void
  updateOverheadPercent: (percent: number) => void
  updateProfitPercent: (percent: number) => void
  updateTaxPercent: (percent: number) => void
  updateHourlyRate: (rate: number) => void
  subtotal: number
  additionalCostsTotal: number
  estimateSubtotal: number
  overheadAmount: number
  profitAmount: number
  taxAmount: number
  grandTotal: number
  totalManhours: number
  error: Error | null
  setError: (error: Error | null) => void
  materialCost: number
  laborCost: number
  isPaid: boolean
  setIsPaid: (paid: boolean) => void
}

const EstimateContext = createContext<EstimateContextType | undefined>(undefined)

export const useEstimate = () => {
  const context = useContext(EstimateContext)
  if (context === undefined) {
    throw new Error("useEstimate must be used within an EstimateProvider")
  }
  return context
}

export const EstimateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estimate, setEstimate] = useState<EstimateData>({
    lineItems: [],
    additionalCosts: [],
    exclusions: "",
    overheadPercent: 10,
    profitPercent: 15,
    taxPercent: 7,
    hourlyRate: 0,
  })
  const [error, setError] = useState<Error | null>(null)
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const { materials, categories } = useMaterialData()

  // Check for existing paid status on component mount
  useEffect(() => {
    try {
      const savedPaidStatus = localStorage.getItem("e-deck-estimator-paid")
      if (savedPaidStatus === "true") {
        setIsPaid(true)
      }
    } catch (err) {
      console.error("Error checking paid status:", err)
    }
  }, [])

  const addLineItem = (item: LineItem) => {
    try {
      console.log("Adding line item:", item)
      setEstimate((prevEstimate) => {
        const newEstimate = { ...prevEstimate, lineItems: [...prevEstimate.lineItems, item] }
        console.log("Updated estimate:", newEstimate)
        return newEstimate
      })
    } catch (err) {
      console.error("Error in addLineItem:", err)
      setError(err instanceof Error ? err : new Error("Failed to add line item"))
    }
  }

  const updateLineItem = (id: string, updates: Partial<LineItem>) => {
    try {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        lineItems: prevEstimate.lineItems.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update line item"))
    }
  }

  const removeLineItem = (id: string) => {
    try {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        lineItems: prevEstimate.lineItems.filter((item) => item.id !== id),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to remove line item"))
    }
  }

  const addAdditionalCost = (cost: AdditionalCost) => {
    try {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        additionalCosts: [...prevEstimate.additionalCosts, cost],
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to add additional cost"))
    }
  }

  const updateAdditionalCost = (id: string, updates: Partial<AdditionalCost>) => {
    try {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        additionalCosts: prevEstimate.additionalCosts.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update additional cost"))
    }
  }

  const removeAdditionalCost = (id: string) => {
    try {
      setEstimate((prevEstimate) => ({
        ...prevEstimate,
        additionalCosts: prevEstimate.additionalCosts.filter((item) => item.id !== id),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to remove additional cost"))
    }
  }

  const updateExclusions = (text: string) => {
    try {
      setEstimate((prevEstimate) => ({ ...prevEstimate, exclusions: text }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update exclusions"))
    }
  }

  const updateOverheadPercent = (percent: number) => {
    try {
      setEstimate((prevEstimate) => ({ ...prevEstimate, overheadPercent: percent }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update overhead percent"))
    }
  }

  const updateProfitPercent = (percent: number) => {
    try {
      setEstimate((prevEstimate) => ({ ...prevEstimate, profitPercent: percent }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update profit percent"))
    }
  }

  const updateTaxPercent = (percent: number) => {
    try {
      setEstimate((prevEstimate) => ({ ...prevEstimate, taxPercent: percent }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update tax percent"))
    }
  }

  const updateHourlyRate = (rate: number) => {
    try {
      setEstimate((prevEstimate) => {
        const updatedLineItems = prevEstimate.lineItems.map((item) => ({
          ...item,
          laborRate: rate, // Update the labor rate for each line item
        }))
        return { ...prevEstimate, hourlyRate: rate, lineItems: updatedLineItems }
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update hourly rate"))
    }
  }

  // Calculate totals
  const subtotal = estimate.lineItems.reduce((sum, item) => {
    const material = Object.values(materials)
      .flat()
      .find((m: Material) => m.id === item.materialId)
    const totalMaterial = item.quantity * item.materialCost
    const totalManhours = item.quantity * (material?.manhourUnit || 0)
    const totalLabor = totalManhours * item.laborRate
    return sum + totalMaterial + totalLabor
  }, 0)
  const additionalCostsTotal = estimate.additionalCosts.reduce((sum, item) => sum + item.cost, 0)
  const estimateSubtotal = subtotal + additionalCostsTotal
  const overheadAmount = calculatePercentage(estimateSubtotal, estimate.overheadPercent)
  const profitAmount = calculatePercentage(estimateSubtotal, estimate.profitPercent)
  const taxAmount = calculatePercentage(estimateSubtotal, estimate.taxPercent)
  const grandTotal = estimateSubtotal + overheadAmount + profitAmount + taxAmount
  const totalManhours = estimate.lineItems.reduce((sum, item) => {
    const material = Object.values(materials)
      .flat()
      .find((m: Material) => m.id === item.materialId)
    return sum + item.quantity * (material?.manhourUnit || 0)
  }, 0)

  const materialCost = estimate.lineItems.reduce((sum, item) => sum + item.quantity * item.materialCost, 0)
  const laborCost = estimate.lineItems.reduce((sum, item) => sum + item.quantity * item.laborRate, 0)

  return (
    <EstimateContext.Provider
      value={{
        estimate,
        addLineItem,
        updateLineItem,
        removeLineItem,
        addAdditionalCost,
        updateAdditionalCost,
        removeAdditionalCost,
        updateExclusions,
        updateOverheadPercent,
        updateProfitPercent,
        updateTaxPercent,
        updateHourlyRate,
        subtotal,
        additionalCostsTotal,
        estimateSubtotal,
        overheadAmount,
        profitAmount,
        taxAmount,
        grandTotal,
        totalManhours,
        error,
        setError,
        materialCost,
        laborCost,
        isPaid,
        setIsPaid,
      }}
    >
      {children}
    </EstimateContext.Provider>
  )
}
