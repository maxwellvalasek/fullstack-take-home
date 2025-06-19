"use client";
import { useSortable } from "@dnd-kit/sortable";
import { commonStyles } from "@/styles/common";

/**
 * DropPlaceholder Component - Visual Feedback for Drop Targets
 */

export default function DropPlaceholder({
  groupId,
  index,
}: {
  groupId: string | null;
  index: number;
}) {
  const { setNodeRef, isOver } = useSortable({
    id: `placeholder|${groupId ?? "root"}|${index}`,
    data: { groupId, index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${commonStyles.dropPlaceholder} transition-colors ${isOver ? 'bg-blue-100 border-blue-400 text-blue-600' : ''
        }`}
    >
      Drop Here
    </div>
  );
}
