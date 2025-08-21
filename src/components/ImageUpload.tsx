"use client";

import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  value?: string;
  className?: string;
}

export default function ImageUpload({
  onImageSelect,
  value,
  className,
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCleared, setIsCleared] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setIsCleared(false);
    onImageSelect(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile && isValidImageType(imageFile)) {
      handleImageSelect(imageFile);
    }
  }, [handleImageSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImageType(file)) {
      handleImageSelect(file);
    }
  };

  const isValidImageType = (file: File) => {
    return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
  };

  const clearImage = () => {
    setPreview(null);
    setIsCleared(true);
    onImageSelect(null);
  };

  const displayImage = preview || (isCleared ? null : value);

  return (
    <div className={cn("space-y-4", className)}>
      {displayImage ? (
        <div className="relative">
          <Image
            src={displayImage}
            alt="Preview"
            fill
            className="object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileInput}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              {isDragOver ? (
                <Upload className="w-8 h-8 text-primary" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
              <div className="text-sm">
                <span className="font-medium text-primary">
                  Cliquez pour télécharger
                </span>
                <span className="text-gray-500"> ou glissez-déposez</span>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, JPEG jusqu&apos;à 10MB
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
