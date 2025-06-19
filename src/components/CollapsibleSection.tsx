"use client";

import { ReactNode, useState } from "react";
import { commonStyles } from "@/styles/common";

/**
 * CollapsibleSection Component - Expandable Content Container
 * 
 * Toggle-able section wrapper used to organize gallery categories into collapsible groups.
 */

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={commonStyles.modernCollapsible}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={commonStyles.modernCollapsibleHeader}
        aria-expanded={open}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className={commonStyles.modernCollapsibleTitle}>{title}</span>
        <span className={`${commonStyles.modernCollapsibleIcon} ${open ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>

      <div
        className={`${commonStyles.collapsibleTransition} ${open ? commonStyles.collapsibleOpen : commonStyles.collapsibleClosed
          }`}
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className={commonStyles.modernCollapsibleContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
