"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MediaItem } from "@/store/portfolioStore";
import { useState, useRef } from "react";
import { commonStyles } from "@/styles/common";
import UploadModal from "./UploadModal";
import { usePortfolioStore } from "@/store/portfolioStore";
import { config } from "@/lib/config";

/**
 * SortableMediaCard Component - Individual Draggable Media Item
 * 
 * Renders a single MediaItem with drag functionality
 * 
 * Architecture:
 * - Integrates with @dnd-kit's useSortable hook using encoded item IDs
 * - Renders media 
 * - Shows hover overlays with title/description and file information
 * - Handles edit/delete actions with confirmation and modal integration
 */

interface Props {
  item: MediaItem;
  data: { index: number; groupId: string | null };
  dimensions: { width: number; height: number };
}

export default function SortableMediaCard({ item, data, dimensions }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: `item|${item.id}`,
    data,
  });

  const [videoDuration, setVideoDuration] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { deleteItem } = usePortfolioStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
  };

  const getFileExtension = (filename: string) =>
    filename.split(".").pop()?.toUpperCase() || "";

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration;
      setVideoDuration(`${Math.floor(d / 60)}:${Math.floor(d % 60).toString().padStart(2, "0")}`);
    }
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageDimensions(`${naturalWidth}x${naturalHeight}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      deleteItem(item.id);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${commonStyles.sortableCardDimensioned} ${commonStyles.sortableCard}`}
      >
        <div
          className={`${commonStyles.sortableMediaContainerDimensioned} ${commonStyles.sortableMediaContainer}`}
        >
          {item.media_type === "image" ? (
            <img
              ref={imageRef}
              src={config.getUploadUrl(item.filename)}
              alt={item.title}
              className={commonStyles.sortableImage}
              onLoad={handleImageLoad}
            />
          ) : (
            <video
              ref={videoRef}
              src={config.getUploadUrl(item.filename)}
              controls
              preload="metadata"
              playsInline
              controlsList="nodownload"
              className={commonStyles.sortableVideo}
              onLoadedMetadata={handleVideoLoadedMetadata}
            >
              Your browser does not support the video tag.
            </video>
          )}

          <button
            onClick={handleDeleteClick}
            className={`${commonStyles.deleteButtonSmall} ${commonStyles.actionButtonHidden}`}
            title="Delete media"
          >
            🗑️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEditModal(true);
            }}
            className={`${commonStyles.editButtonSmall} ${commonStyles.actionButtonHidden}`}
            title="Edit media"
          >
            ✎
          </button>

          <div
            className={`${commonStyles.topOverlay} ${commonStyles.overlayHidden}`}
            style={{ background: commonStyles.topGradient }}
          >
            <h3 className={commonStyles.overlayTitleTop} style={{ color: "#e6e8e8" }}>
              {item.title}
            </h3>
            {item.description && (
              <p className={commonStyles.overlayDescriptionTop} style={{ color: "#e6e8e8" }}>
                {item.description}
              </p>
            )}
          </div>

          <div
            className={`${commonStyles.bottomOverlay} ${commonStyles.overlayHidden}`}
            style={{ background: commonStyles.bottomGradient }}
          >
            <div className={commonStyles.overlayMetaBottom}>
              <span style={{ color: "#8db8c4" }} className="font-medium">
                {item.media_type === "image"
                  ? imageDimensions || "Loading..."
                  : videoDuration || "Video"}
              </span>
              <span style={{ color: "#f8aa83" }} className="font-medium">
                .{getFileExtension(item.filename)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <UploadModal onClose={() => setShowEditModal(false)} editItem={item} />
      )}
    </>
  );
}
