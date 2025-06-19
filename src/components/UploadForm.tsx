"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { MediaItem } from "@/store/portfolioStore";
import { commonStyles } from "@/styles/common";
import { config } from "@/lib/config";

/**
 * UploadForm Component - Media Upload and Editing Menu
 * 
 * Handles file uploads and metadata editing
 */

interface Props {
  onSuccess?: () => void;
  editItem?: MediaItem;
}

export default function UploadForm({ onSuccess, editItem }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = usePortfolioStore(state => state.addItem);
  const updateItem = usePortfolioStore(state => state.updateItem);

  const isEditing = !!editItem;

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDesc(editItem.description);
      setCategory(editItem.category || "");
    }
  }, [editItem]);

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    
    setFile(selectedFile);
    
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setFilePreview(objectUrl);
      
      const fileName = selectedFile.name;
      const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      const trimmedTitle = nameWithoutExtension.substring(0, 16);
      setTitle(trimmedTitle);
    } else {
      setFilePreview(null);
      setTitle("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isEditing) {
        updateItem(editItem.id, {
          title,
          description,
          category: category.trim() || null,
        });
        onSuccess?.();
      } else {
        if (!file) {
          setError("Please choose a file first");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category.trim());

        const res = await fetch(config.getUploadEndpoint(), {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        addItem(data);

        setFile(null);
        setFilePreview(null);
        setTitle("");
        setDesc("");
        setCategory("");
        onSuccess?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${commonStyles.spacing.form} max-w-md`}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {!isEditing && (
        <>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            required
            disabled={isLoading}
            className={commonStyles.fileInputOutline}
          />
          
          {filePreview && file && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview:
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <video
                    src={filePreview}
                    controls
                    className="w-full h-48 object-cover"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <input
        className={commonStyles.textareaOutline}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        required
      />

      <textarea
        className={commonStyles.textareaOutline}
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        disabled={isLoading}
      />

      <input
        className={commonStyles.textareaOutline}
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`${commonStyles.filledPillHover} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ 
          backgroundColor: '#34474d',
          borderColor: '#34474d',
          color: 'white',
        }}
      >
        {isLoading ? (
          <>
            {isEditing ? 'Updating...' : 'Uploading...'}
          </>
        ) : (
          <>
            {isEditing ? 'Update Media' : 'Upload Media'}
          </>
        )}
      </button>
    </form>
  );
}
