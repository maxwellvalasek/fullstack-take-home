"use client";

import { DndContext, closestCenter, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { usePortfolioStore } from "@/store/portfolioStore";
import SortableMediaCard from "./SortableMediaCard";
import DropPlaceholder from "./DropPlaceholder";
import CollapsibleSection from "./CollapsibleSection";
import { useState, useMemo } from "react";
import { commonStyles } from "@/styles/common";

/**
 * Gallery Component - Main Portfolio Display
 * 
 * Renders a gallery of SortableMediaCards.
 * 
 * Architecture:
 * - Filters items → buckets by category → renders grids
 * - Implements drag-and-drop with encoded IDs and drop zones
 * - Updates store state on drop with new category/position
 */


export default function Gallery() {
  const {
    items,
    groups,
    moveItem,
    addGroup,
    mediaTypeFilter,
  } = usePortfolioStore();

  console.log("Gallery items count:", items.length);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    return items.filter(item => 
      mediaTypeFilter === "all" || item.media_type === mediaTypeFilter
    );
  }, [items, mediaTypeFilter]);

  const categoryNames = useMemo(() => {
    const names: string[] = [];
    for (const g of groups) {
      if (!names.includes(g)) names.push(g);
    }
    for (const item of visibleItems) {
      if (item.category && !names.includes(item.category)) {
        names.push(item.category);
      }
    }
    return names;
  }, [groups, visibleItems]);


  const buckets = useMemo(() => {
    const result: Record<string, typeof visibleItems> = {
      __uncategorized__: [],
    };
    for (const name of categoryNames) {
      result[name] = [];
    }
    for (const item of visibleItems) {
      if (item.category) {
        result[item.category].push(item);
      } else {
        result.__uncategorized__.push(item);
      }
    }
    return result;
  }, [categoryNames, visibleItems]);

  function findItem(id: string) {
    const searchId = id.split("|")[1];
    for (const itm of visibleItems) {
      if (itm.id === searchId) return itm;
    }
  }

  function handleDragStart(e: any) {
    const idStr = String(e.active.id);
    if (idStr.startsWith("item|")) setActiveId(idStr);
  }

  function handleDragEnd(e: any) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const activeStr = String(active.id);
    if (!activeStr.startsWith("item|")) return;

    const itemId = activeStr.split("|")[1];
    const toCategory = (over.data?.current?.groupId as string | null) ?? null;
    const toIndex = (over.data?.current?.index as number) ?? 0;

    moveItem({ itemId, toCategory, toIndex });
  }

  function renderGroup(
    groupItems: typeof visibleItems,
    groupId: string | null,
    title?: string
  ) {
    const contextIds: string[] = [];
    if (groupItems.length === 0 && groupId) {
      contextIds.push(`placeholder|${groupId}|0`);
    } else {
      for (const itm of groupItems) contextIds.push(`item|${itm.id}`);
    }

    const inner = (
      <SortableContext items={contextIds} strategy={rectSortingStrategy}>
        <div
          className={commonStyles.galleryGrid}
          style={{ 
            gridTemplateColumns: "repeat(auto-fill, 160px)",
            minHeight: groupItems.length ? 'auto' : '176px',
          }}
        >
          {groupItems.length > 0 ? (
            groupItems.map((itm, idx) => (
              <SortableMediaCard
                key={itm.id}
                item={itm}
                data={{ index: idx, groupId }}
                dimensions={{ width: 160, height: 160 }}
              />
            ))
          ) : (
            groupId && <DropPlaceholder groupId={groupId} index={0} />
          )}
        </div>
      </SortableContext>
    );

    if (title) {
      return (
        <CollapsibleSection key={groupId} title={title}>
          {inner}
        </CollapsibleSection>
      );
    }
    return (
      <div key="uncategorized" className="mb-6">
        {inner}
      </div>
    );
  }

  function addSection() {
    const name = prompt("New section name:")?.trim();
    if (name) addGroup(name);
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {buckets.__uncategorized__.length > 0 &&
          renderGroup(buckets.__uncategorized__, null)}

        {categoryNames.map((cat) => {
          const displayName = cat.includes("::") ? cat.split("::")[1] : cat;
          return renderGroup(buckets[cat], cat, displayName);
        })}

        <DragOverlay>
          {activeId && (
            <SortableMediaCard
              item={findItem(activeId)!}
              data={{ groupId: null, index: 0 }}
              dimensions={{ width: 160, height: 160 }}
            />
          )}
        </DragOverlay>
      </DndContext>

      <button 
        onClick={addSection} 
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
        ＋ New Category
      </button>
    </div>
  );
}
