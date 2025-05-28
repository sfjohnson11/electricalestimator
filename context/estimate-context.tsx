"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"

interface EstimateContextType {
  isPaid: boolean
  setIsPaid: (isPaid: boolean) => void
}

const EstimateContext = createContext<EstimateContextType | undefined>(undefined)

interface EstimateProviderProps {
  children: ReactNode
}

export const EstimateProvider: React.FC<EstimateProviderProps> = ({ children }) => {
  const [isPaid, setIsPaidState] = useState<boolean>(false)

  // Load the paid status from localStorage on component mount
  React.useEffect(() => {
    try {
      const storedPaidStatus = localStorage.getItem("e-deck-estimator-paid")
      if (storedPaidStatus === "true") {
        setIsPaidState(true)
      }
    } catch (err) {
      console.error("Error loading paid status from localStorage:", err)
    }
  }, [])

  const setIsPaid = (newIsPaid: boolean) => {
    setIsPaidState(newIsPaid)
  }

  return <EstimateContext.Provider value={{ isPaid, setIsPaid }}>{children}</EstimateContext.Provider>
}

export const useEstimate = () => {
  const context = useContext(EstimateContext)
  if (!context) {
    throw new Error("useEstimate must be used within an EstimateProvider")
  }
  return context
}
