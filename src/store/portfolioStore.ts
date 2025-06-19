import { create } from 'zustand'

/**
 * Portfolio Store
 * 
 * Zustand store managing media items, categories, 
 * and UI state for portfolio
 */


export interface MediaItem {
  id: string;
  filename: string;
  media_type: "image" | "video";
  title: string;
  description: string;
  category?: string | null;
}

// Store
interface PortfolioStore {
  items: MediaItem[]
  groups: string[] // Category names
  mediaTypeFilter: "all" | "image" | "video"
  hasUnsavedChanges: boolean
  sectionOrder: string[] // Track order of categories
  setEntireState: (state: { items: MediaItem[], groups: string[] }) => void
  addItem: (item: MediaItem) => void
  updateItem: (itemId: string, updates: Partial<MediaItem>) => void
  deleteItem: (itemId: string) => void
  moveItem: (params: { itemId: string, toCategory: string | null, toIndex: number }) => void
  addGroup: (name: string) => void // Create category
  setMediaTypeFilter: (filter: "all" | "image" | "video") => void
  markAsSaved: () => void
  reorderSections: (newOrder: string[]) => void
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  items: [],
  groups: [],
  mediaTypeFilter: "all",
  hasUnsavedChanges: false,
  sectionOrder: [],

  setEntireState: (newState) => set({ ...newState, hasUnsavedChanges: false }),

  addItem: (item) => set((state) => ({
    items: [...state.items, { ...item, category: null }],
    hasUnsavedChanges: true
  })),

  updateItem: (itemId, updates) => set((state) => ({
    items: state.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ),
    hasUnsavedChanges: true
  })),

  deleteItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId),
    hasUnsavedChanges: true
  })),
  
  // Move an item to a new category & position within that category.
  moveItem: ({ itemId, toCategory, toIndex }) => set((state) => {
    const itemIndex = state.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return state;

    // Create a new item object with the updated category.
    const updatedItem = { ...state.items[itemIndex], category: toCategory };

    const itemsWithoutTarget = state.items.filter(item => item.id !== itemId);

    let insertAt = itemsWithoutTarget.length;
    let sameCatCount = 0;

    // Find the correct insertion index.
    for (let i = 0; i < itemsWithoutTarget.length; i++) {
      if (itemsWithoutTarget[i].category === toCategory) {
        if (sameCatCount === toIndex) {
          insertAt = i;
          break;
        }
        sameCatCount++;
      }
    }

    // New array of items with item inserted
    const newItems = [
      ...itemsWithoutTarget.slice(0, insertAt),
      updatedItem,
      ...itemsWithoutTarget.slice(insertAt)
    ];

    return { items: newItems, hasUnsavedChanges: true };
  }),

  addGroup: (name) => set((state) => ({
    groups: state.groups.includes(name) ? state.groups : [...state.groups, name],
    hasUnsavedChanges: true
  })),

  setMediaTypeFilter: (filter) => set({ mediaTypeFilter: filter }),

  markAsSaved: () => set({ hasUnsavedChanges: false }),

  reorderSections: (newOrder) => set({ sectionOrder: newOrder, hasUnsavedChanges: true })
}))
