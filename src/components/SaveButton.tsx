"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { commonStyles } from "@/styles/common";
import { config } from "@/lib/config";
import { useState } from "react";

/**
 * SaveButton Component 
 * 
 * Handles saving portfolio changes
 */

interface Props {
  variant?: 'default' | 'navbar' | 'fab';
}

export default function SaveButton({ variant = 'fab' }: Props) {
  const items = usePortfolioStore(state => state.items);
  const hasUnsavedChanges = usePortfolioStore(state => state.hasUnsavedChanges);
  const markAsSaved = usePortfolioStore(state => state.markAsSaved);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flatItems = items.map((item) => {
    if (!item.category) {
      return { ...item, category: "" };
    }
    const parts = item.category.split("::");
    return {
      ...item,
      category: parts.length === 2 ? parts[1] : item.category,
    };
  });

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Saving items:", flatItems);

      const res = await fetch(config.getSavePortfolioEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "demo_user", items: flatItems }),
      });

      if (!res.ok) {
        throw new Error(`Save failed: ${res.status} ${res.statusText}`);
      }

      markAsSaved();
      alert("Portfolio saved!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Save failed";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonColor = hasUnsavedChanges ? '#f8aa83' : '#34474d';

  if (variant === 'fab') {
    return (
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`${commonStyles.fabWithText} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Save Portfolio"
      >
        {isLoading ? (
          <>
            Saving...
          </>
        ) : hasUnsavedChanges ? (
          <>
            Save Changes *
          </>
        ) : (
          <>
            ✓ Saved
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      className={commonStyles.filledPillHover}
      style={{
        backgroundColor: buttonColor,
        borderColor: buttonColor,
        color: 'white',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = buttonColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = buttonColor;
        e.currentTarget.style.color = 'white';
      }}
    >
      Save Portfolio{hasUnsavedChanges && ' *'}
    </button>
  );
}
