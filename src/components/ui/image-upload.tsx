"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  type: "shop" | "product";
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  type,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Crear preview inmediato
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      // Limpiar preview temporal
      URL.revokeObjectURL(previewUrl);
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Limpiar preview en caso de error
      URL.revokeObjectURL(previewUrl);
      setPreview(value || null);
      alert("Error al subir la imagen. Por favor intenta de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <Label>Imagen</Label>
      <div className="mt-2">
        {preview ? (
          <div className="relative w-full max-w-xs">
            <div className="relative aspect-square w-32 rounded-lg overflow-hidden border">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={handleUploadClick}
          >
            <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Subir imagen</span>
          </div>
        )}

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {!preview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Subiendo..." : "Seleccionar imagen"}
          </Button>
        )}
      </div>
    </div>
  );
}
