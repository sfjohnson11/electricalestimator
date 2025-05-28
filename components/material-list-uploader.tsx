import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEstimate } from "@/context/estimate-context"
import Papa from "papaparse"

export function MaterialListUploader() {
  const [file, setFile] = useState<File | null>(null)
  const { addLineItem } = useEstimate()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    Papa.parse(file, {
      complete: (results) => {
        results.data.forEach((row: any) => {
          if (row.length >= 4) {
            addLineItem({
              id: Date.now().toString(),
              description: row[0],
              quantity: Number.parseFloat(row[1]),
              rate: Number.parseFloat(row[2]),
              totalManhours: Number.parseFloat(row[3]),
              lineTotal: Number.parseFloat(row[1]) * Number.parseFloat(row[2]),
            })
          }
        })
      },
      header: false,
      skipEmptyLines: true,
    })

    // Reset the file input
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center space-x-2">
      <Input type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} />
      <Button onClick={handleUpload} disabled={!file}>
        Upload Material List
      </Button>
    </div>
  )
}
