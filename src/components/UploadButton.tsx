"use client";

import { useState } from "react";
import UploadModal from "./UploadModal";
import { commonStyles } from "@/styles/common";

export default function UploadButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        className={commonStyles.filledPillHover}
        style={{ 
          backgroundColor: '#34474d',
          borderColor: '#34474d',
          color: 'white',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#34474d';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#34474d';
          e.currentTarget.style.color = 'white';
        }}
      >
        Upload Media
      </button>

      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </>
  );
}
