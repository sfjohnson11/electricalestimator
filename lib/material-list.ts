"use client"

import { useState, useEffect } from "react"
import { materialData } from "./materials-data"

export interface Material {
  id: string
  name: string
  size: string
  type: string
  unit: string
  manhourUnit: number
}

export interface Category {
  id: number
  name: string
}

export const useMaterialData = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [materials, setMaterials] = useState<{ [categoryId: string]: Material[] }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      console.log("Initializing material data")
      setCategories(materialData.categories)
      setMaterials(materialData.materials)
      setIsLoading(false)
    } catch (err) {
      console.error("Error initializing material data:", err)
      setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      setIsLoading(false)
    }
  }, [])

  return { categories, materials, isLoading, error }
}

export const getMaterialCategories = (): Category[] => {
  return materialData.categories
}

export const getMaterialsByCategory = (categoryId: number): Material[] => {
  return materialData.materials[categoryId.toString()] || []
}
