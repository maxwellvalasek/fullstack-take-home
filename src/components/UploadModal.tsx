"use client";

import UploadForm from "./UploadForm";
import { MediaItem } from "@/store/portfolioStore";
import { commonStyles } from "@/styles/common";

/**
 * UploadModal Component - Modal Wrapper for Upload/Edit Forms
 * 
 * Provides a modal overlay container for media upload and editing operations
 */

interface Props {
  onClose: () => void;
  editItem?: MediaItem;
}

export default function UploadModal({ onClose, editItem }: Props) {
  const isEditing = !!editItem;

  return (
    <div className={commonStyles.modalOverlay}>
      <div className={commonStyles.modalContentOutline}>
        <h2 className={`${commonStyles.heading} mb-4`}>
          {isEditing ? "Edit Media" : "Upload Media"}
        </h2>

        <UploadForm onSuccess={onClose} editItem={editItem} />

        <button
          onClick={onClose}
          className={commonStyles.closeButtonOutline}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
