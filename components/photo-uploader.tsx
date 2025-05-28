"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Camera } from "lucide-react"

interface Photo {
  id: string
  file: File
  preview: string
}

interface PhotoUploaderProps {
  photos: Photo[]
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>
}

export function PhotoUploader({ photos, setPhotos }: PhotoUploaderProps) {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newPhotos = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }))
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }
  }

  const removePhoto = (id: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-10 h-10 mb-3 text-blue-400" />
            <p className="mb-2 text-sm text-blue-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-blue-500">PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.preview || "/placeholder.svg"}
              alt="Project photo"
              className="w-full h-32 object-cover rounded"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1"
              onClick={() => removePhoto(photo.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
