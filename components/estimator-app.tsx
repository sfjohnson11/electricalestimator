"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEstimate } from "@/context/estimate-context"
import { Printer, Save, Plus, Download, Camera, Menu } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import LineItemRow from "./line-item-row"
import AdditionalCostRow from "./additional-cost-row"
import { Input } from "@/components/ui/input"
import { useMaterialData } from "@/lib/material-list"
import { EstimateCharts } from "./estimate-charts"
import { PhotoUploader } from "./photo-uploader"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AudioPlayer } from "./audio-player"

interface EstimatorAppProps {
  onReturnToCover: () => void
}

interface Photo {
  id: string
  file: File
  preview: string
}

export default function EstimatorApp({ onReturnToCover }: EstimatorAppProps) {
  const {
    estimate,
    addLineItem,
    addAdditionalCost,
    updateExclusions,
    updateOverheadPercent,
    updateProfitPercent,
    updateTaxPercent,
    subtotal,
    additionalCostsTotal,
    estimateSubtotal,
    overheadAmount,
    profitAmount,
    taxAmount,
    grandTotal,
    totalManhours,
    updateHourlyRate,
  } = useEstimate()

  const { isLoading, error: materialError, categories, materials } = useMaterialData()

  const [projectInfo, setProjectInfo] = useState({
    contractorInfo: "Sample - Electrical",
    projectName: "",
    projectAddress: "",
    estimateDate: new Date().toISOString().split("T")[0],
    planDate: new Date().toISOString().split("T")[0],
  })

  const [savedEstimates, setSavedEstimates] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  useEffect(() => {
    try {
      const estimates = Object.keys(localStorage).filter((key) => key.startsWith("estimate_"))
      setSavedEstimates(estimates)
    } catch (err) {
      console.error("Error loading saved estimates:", err)
      setError(err instanceof Error ? err : new Error("Failed to load saved estimates"))
    }
  }, [])

  useEffect(() => {
    if (materialError) {
      setError(new Error(`Failed to load material data: ${materialError.message}`))
    }
  }, [materialError])

  useEffect(() => {
    // Try to load saved audio preference
    const savedAudio = localStorage.getItem("e-deck-estimator-audio")
    if (savedAudio) {
      setAudioUrl(savedAudio)
    }
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
    const estimateData = {
      projectInfo,
      estimate,
      photos: photos.map((photo) => ({ id: photo.id, name: photo.file.name })), // Save only id and name
    }

    const estimateName = `estimate_${projectInfo.projectName || "Untitled"}_${new Date().toISOString()}`
    localStorage.setItem(estimateName, JSON.stringify(estimateData))
    setSavedEstimates([...savedEstimates, estimateName])
  }

  const handleLoad = (estimateName: string) => {
    const savedData = localStorage.getItem(estimateName)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setProjectInfo(parsedData.projectInfo)
      // Update each part of the estimate
      parsedData.estimate.lineItems.forEach((item: any) => addLineItem(item))
      parsedData.estimate.additionalCosts.forEach((cost: any) => addAdditionalCost(cost))
      updateExclusions(parsedData.estimate.exclusions)
      updateOverheadPercent(parsedData.estimate.overheadPercent)
      updateProfitPercent(parsedData.estimate.profitPercent)
      updateTaxPercent(parsedData.estimate.taxPercent)
      updateHourlyRate(parsedData.estimate.hourlyRate)
      // Note: We can't load the actual photo files, but we can set placeholders
      if (parsedData.photos) {
        setPhotos(
          parsedData.photos.map((photo: { id: string; name: string }) => ({
            id: photo.id,
            file: new File([], photo.name),
            preview: "/placeholder.svg",
          })),
        )
      }
    }
  }

  const handleExport = () => {
    const dataToSave = {
      projectInfo,
      estimate,
      totals: {
        subtotal,
        additionalCostsTotal,
        estimateSubtotal,
        overheadAmount,
        profitAmount,
        taxAmount,
        grandTotal,
      },
    }

    const dataStr = JSON.stringify(dataToSave, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "estimate-" + new Date().toISOString().slice(0, 10) + ".json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleAddLineItem = () => {
    try {
      console.log("Adding new line item")
      const newItem = {
        id: Date.now().toString(),
        materialId: "",
        quantity: 0,
        materialCost: 0,
        laborRate: estimate.hourlyRate || 0,
      }
      console.log("New item:", newItem)
      addLineItem(newItem)
      console.log("Line item added successfully")
    } catch (err) {
      console.error("Error adding line item:", err)
      setError(err instanceof Error ? err : new Error("Failed to add line item"))
    }
  }

  const handleRecentlyUsedUpdate = (materialId: string) => {
    setRecentlyUsed((prev) => {
      const newRecentlyUsed = [materialId, ...prev.filter((id) => id !== materialId)].slice(0, 5)
      return newRecentlyUsed
    })
  }

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
      // Save the audio preference to localStorage
      localStorage.setItem("e-deck-estimator-audio", url)
    }
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>{error.message}</p>
        <Button onClick={() => setError(null)} className="mt-4">
          Dismiss
        </Button>
      </div>
    )
  }

  if (isLoading) return <div>Loading materials...</div>

  console.log("Rendering EstimatorApp component")

  const materialCost = estimate.lineItems.reduce((sum, item) => sum + item.quantity * item.materialCost, 0)
  const laborCost = estimate.lineItems.reduce((sum, item) => {
    const material = Object.values(materials)
      .flat()
      .find((m: any) => m.id === item.materialId)
    const totalManhours = item.quantity * (material?.manhourUnit || 0)
    return sum + totalManhours * item.laborRate
  }, 0)

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 print:p-0 bg-blue-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">E-Deck Estimator</h1>

        <div className="flex items-center space-x-2">
          {audioUrl ? (
            <div className="hidden sm:block">
              <AudioPlayer audioUrl={audioUrl} title="Background Music" />
            </div>
          ) : (
            <div className="hidden sm:block">
              <label htmlFor="audio-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                Add Music
                <input id="audio-upload" type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
              </label>
            </div>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {audioUrl ? (
                  <div className="mb-4">
                    <AudioPlayer audioUrl={audioUrl} title="Background Music" />
                  </div>
                ) : (
                  <div className="mb-4">
                    <label
                      htmlFor="mobile-audio-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                    >
                      Add Music
                      <input
                        id="mobile-audio-upload"
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                <Button
                  onClick={() => {
                    handlePrint()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Printer className="h-4 w-4 mr-2" /> Print
                </Button>
                <Button
                  onClick={() => {
                    handleSave()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button
                  onClick={() => {
                    handleExport()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button
                  onClick={() => {
                    onReturnToCover()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Return to Cover Sheet
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden md:flex md:space-x-2 mb-4">
        <Button onClick={onReturnToCover} className="bg-blue-600 hover:bg-blue-700">
          Return to Cover Sheet
        </Button>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4 mr-2" /> Print
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" /> Save
        </Button>
        <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      {/* Project Information and Hourly Rate */}
      <Card className="mb-6 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-800 text-lg sm:text-xl">Project Information</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contractorInfo" className="block text-sm font-medium mb-1">
                Contractor Info
              </label>
              <Input
                id="contractorInfo"
                type="text"
                value={projectInfo.contractorInfo}
                onChange={(e) => setProjectInfo({ ...projectInfo, contractorInfo: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <Input
                id="projectName"
                type="text"
                value={projectInfo.projectName}
                onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="projectAddress" className="block text-sm font-medium mb-1">
                Project Address
              </label>
              <Input
                id="projectAddress"
                type="text"
                value={projectInfo.projectAddress}
                onChange={(e) => setProjectInfo({ ...projectInfo, projectAddress: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="estimateDate" className="block text-sm font-medium mb-1">
                Estimate Date
              </label>
              <Input
                type="date"
                id="estimateDate"
                value={projectInfo.estimateDate}
                onChange={(e) => setProjectInfo({ ...projectInfo, estimateDate: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="planDate" className="block text-sm font-medium mb-1">
                Plan Date
              </label>
              <Input
                type="date"
                id="planDate"
                value={projectInfo.planDate}
                onChange={(e) => setProjectInfo({ ...projectInfo, planDate: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">
                Hourly Rate ($)
              </label>
              <Input
                id="hourlyRate"
                type="number"
                value={estimate.hourlyRate}
                onChange={(e) => updateHourlyRate(Number(e.target.value))}
                className="bg-white border-blue-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="mb-6 border-blue-200 shadow-lg overflow-x-auto">
        <CardHeader className="bg-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-blue-800 text-lg sm:text-xl mb-2 sm:mb-0">Line Items</CardTitle>
          <Button
            onClick={handleAddLineItem}
            variant="outline"
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Line Item
          </Button>
        </CardHeader>
        <CardContent className="bg-white p-2 sm:p-6">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs sm:text-sm">
                  <th className="p-2">Material</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Unit</th>
                  <th className="p-2">Cost</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {estimate.lineItems.map((item, index) => (
                  <LineItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    recentlyUsed={recentlyUsed}
                    onRecentlyUsedUpdate={handleRecentlyUsedUpdate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Costs */}
      <Card className="mb-6 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-800 text-lg sm:text-xl">Additional Costs</CardTitle>
          <Button
            onClick={() => addAdditionalCost({ id: Date.now().toString(), description: "", cost: 0 })}
            variant="outline"
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Additional Cost
          </Button>
        </CardHeader>
        <CardContent className="bg-white">
          {estimate.additionalCosts.map((item, index) => (
            <AdditionalCostRow key={item.id} item={item} index={index} />
          ))}
        </CardContent>
      </Card>

      {/* Totals */}
      <Card className="mt-4 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-800 text-lg sm:text-xl">Totals</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-600">Subtotal:</p>
              <p className="text-lg font-bold text-blue-800">{formatCurrency(subtotal)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Additional Costs:</p>
              <p className="text-lg font-bold text-blue-800">{formatCurrency(additionalCostsTotal)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Estimate Subtotal:</p>
              <p className="text-lg font-bold text-blue-800">{formatCurrency(estimateSubtotal)}</p>
            </div>
            <div>
              <label htmlFor="overheadPercent" className="text-sm font-medium text-blue-600">
                Overhead (%):
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="overheadPercent"
                  type="number"
                  value={estimate.overheadPercent}
                  onChange={(e) => updateOverheadPercent(Number(e.target.value))}
                  className="w-20"
                />
                <p className="text-lg font-bold text-blue-800">{formatCurrency(overheadAmount)}</p>
              </div>
            </div>
            <div>
              <label htmlFor="profitPercent" className="text-sm font-medium text-blue-600">
                Profit (%):
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="profitPercent"
                  type="number"
                  value={estimate.profitPercent}
                  onChange={(e) => updateProfitPercent(Number(e.target.value))}
                  className="w-20"
                />
                <p className="text-lg font-bold text-blue-800">{formatCurrency(profitAmount)}</p>
              </div>
            </div>
            <div>
              <label htmlFor="taxPercent" className="text-sm font-medium text-blue-600">
                Tax (%):
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="taxPercent"
                  type="number"
                  value={estimate.taxPercent}
                  onChange={(e) => updateTaxPercent(Number(e.target.value))}
                  className="w-20"
                />
                <p className="text-lg font-bold text-blue-800">{formatCurrency(taxAmount)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Grand Total:</p>
              <p className="text-lg font-bold text-blue-800">{formatCurrency(grandTotal)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Manhours:</p>
              <p className="text-lg font-bold text-blue-800">{totalManhours.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualization */}
      <Card className="mb-6 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-800 text-lg sm:text-xl">Data Visualization</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <EstimateCharts />
        </CardContent>
      </Card>

      {/* Project Photos */}
      <Card className="mb-6 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-800 text-lg sm:text-xl flex items-center">
            <Camera className="mr-2" />
            Project Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <PhotoUploader photos={photos} setPhotos={setPhotos} />
        </CardContent>
      </Card>

      {/* Saved Estimates */}
      <div className="mt-4 mb-8">
        <h2 className="text-lg font-bold mb-2 text-blue-800">Saved Estimates</h2>
        <ul className="space-y-2">
          {savedEstimates.map((estimateName) => (
            <li key={estimateName}>
              <Button
                onClick={() => handleLoad(estimateName)}
                className="w-full text-left bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm py-2 px-3"
              >
                {estimateName}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright Footer */}
      <footer className="mt-8 pt-4 border-t border-blue-200 text-center text-xs sm:text-sm text-blue-600">
        <p>&copy; {new Date().getFullYear()} E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.</p>
        <p>Unauthorized use or reproduction of this software is strictly prohibited.</p>
      </footer>
    </div>
  )
}
