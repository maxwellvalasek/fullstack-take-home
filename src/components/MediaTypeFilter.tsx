"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { commonStyles } from "@/styles/common";

/**
 * MediaTypeFilter Component - Gallery Content Filter
 * 
 * Provides dropdown filtering for gallery content by media type
 */

export default function MediaTypeFilter() {
  const { mediaTypeFilter, setMediaTypeFilter } = usePortfolioStore();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="media-type-filter" className="text-sm font-medium text-gray-700">
      </label>
      <select
        id="media-type-filter"
        value={mediaTypeFilter}
        onChange={(e) => setMediaTypeFilter(e.target.value as "all" | "image" | "video")}
        className={commonStyles.filterControl}
        style={{ textAlignLast: 'center' }}
      >
        <option value="all">All Media</option>
        <option value="image">Images Only</option>
        <option value="video">Videos Only</option>
      </select>
    </div>
  );
}
