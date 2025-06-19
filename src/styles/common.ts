// styles/common.ts

// Base utility classes
const btnBase      = "flex items-center justify-center rounded-full px-6 py-3 font-medium";
const smallBtnBase = "absolute top-2 flex items-center justify-center w-6 h-6 text-xs rounded-full";

export const commonStyles = {
  /* Buttons */
  primaryButton:    btnBase,
  outlinePill:      `${btnBase} border min-w-[140px]`,
  filledPillHover:  `${btnBase} border-2`,
  filterControl:    "h-10 px-4 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors min-w-[140px] flex items-center justify-center text-center",
  closeButton:      "text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded",
  closeButtonAbsolute: "absolute top-2 right-2 text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded",

  /* Action buttons */
  editButtonSmall:   `${smallBtnBase} right-10 bg-gray-500/70 hover:bg-gray-500/90 text-white shadow-md border border-gray-300 transition-all duration-200 z-10`,
  deleteButtonSmall: `${smallBtnBase} right-2 bg-red-500/70 hover:bg-red-500/90 text-white shadow-md border border-red-300 transition-all duration-200 z-10`,

  /* Navigation */
  navbar: "sticky top-0 z-50 backdrop-blur-md bg-[#faf7f2]/95 shadow-sm border-b border-[#e5e1dc]/50",
  navContainer: "w-full h-16 flex items-center",
  navContent: "flex items-center justify-between w-full px-6",
  brandingGroup: "flex items-center space-x-4",
  logoContainer: "relative flex-shrink-0",
  logo: "h-10 w-10 rounded-lg shadow-sm",
  notificationDot: "absolute -top-1 -right-1 w-3 h-3 bg-[#f8aa83] rounded-full animate-pulse",

  /* Typography */
  title: "text-2xl font-bold text-[#34474d] tracking-tight leading-none",
  subtitle: "text-sm text-[#6f7070] leading-none",
  heading: "text-lg font-medium",

  /* Form inputs */
  input: "w-full px-3 py-2 text-sm rounded-lg border",
  formContainer: "max-w-md",

  /* Containers */
  mainContainer:    "min-h-screen bg-[#f5f6f7] px-6 py-6",
  card:             "rounded-lg h-full flex flex-col",
  galleryContainer: "bg-white rounded-lg p-6 shadow-md w-[90vw] max-w-[1440px] mx-auto border border-gray-300",
  galleryGrid:      "grid gap-4 justify-items-center",

  /* Media wrappers */
  mediaContainer: "relative flex-1 overflow-hidden mb-2",
  image:          "w-full h-full rounded object-cover",
  video:          "w-full h-full rounded object-contain",

  /* Sortable */
  sortableCard:            "cursor-grab group",
  sortableCardDimensioned: "rounded-md overflow-hidden flex flex-col w-40 h-40 shadow-md",
  sortableMediaContainer:  "relative flex-1 overflow-hidden",
  sortableMediaContainerDimensioned: "relative w-full h-full overflow-hidden",
  sortableImage:           "w-full h-full object-cover",
  sortableVideo:           "w-full h-full object-cover bg-black",

  /* Hover/active states */
  actionButtonHidden: "opacity-0 transition-opacity group-hover:opacity-100",
  overlayHidden:      "pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity",

  /* Overlays */
  topOverlay:    "absolute top-0 left-0 right-0 p-4",
  bottomOverlay: "absolute bottom-0 left-0 right-0 p-4",
  overlayTitleTop:       "font-semibold text-sm mb-1 pr-20 line-clamp-1 overflow-hidden",
  overlayDescriptionTop: "text-sm line-clamp-2 leading-relaxed",
  overlayMetaBottom:     "flex justify-between items-center text-sm",

  /* Layout utilities */
  filterRow: "flex items-end justify-between gap-4 mb-6",
  gridAutoFill: "grid gap-2",
  spacerY: "mb-6",

  /* Modals */
  modalOverlay: "fixed inset-0 bg-black/50 flex items-center justify-center z-[60]",
  modalContent: "bg-white rounded p-6 w-full max-w-md shadow-md relative border border-gray-300",

  /* Collapsibles */
  modernCollapsible:       "rounded-xl mb-4 overflow-hidden shadow-md border border-gray-300",
  modernCollapsibleHeader: "flex justify-between items-center w-full px-6 py-4 font-medium bg-[#fafafa] border-b border-gray-200",
  modernCollapsibleTitle:  "text-base font-semibold",
  modernCollapsibleIcon:   "w-5 h-5 transition-transform duration-300",
  modernCollapsibleContent:"p-6",
  collapsibleTransition:   "transition-all duration-300 ease-in-out overflow-hidden",
  collapsibleOpen:         "max-h-[2000px] opacity-100",
  collapsibleClosed:       "max-h-0 opacity-0",

  /* Placeholders */
  dropPlaceholder: "w-40 h-40 border-2 border-dashed rounded flex items-center justify-center text-gray-500 font-medium",

  /* Spacing */
  spacing: {
    form: "space-y-4",
  },

  topGradient: "linear-gradient(180deg, rgba(18, 18, 18, 0.85) 0%, rgba(18, 18, 18, 0.4) 70%, transparent 100%)",
  bottomGradient: "linear-gradient(0deg, rgba(18, 18, 18, 0.85) 0%, rgba(18, 18, 18, 0.4) 70%, transparent 100%)",

  /* Form fields - outline style */
  inputOutline: "w-full px-3 py-2 text-sm rounded-full border border-[#34474d] bg-transparent hover:bg-[#f3f6f7] focus:bg-[#faf7f2] focus:outline-none focus:ring-2 focus:ring-[#34474d] transition-colors",
  textareaOutline: "w-full px-3 py-2 text-sm rounded-lg border border-[#34474d] bg-transparent hover:bg-[#f3f6f7] focus:bg-[#faf7f2] focus:outline-none focus:ring-2 focus:ring-[#34474d] transition-colors",
  fileInputOutline: "w-full px-3 py-2 text-sm rounded-full border border-[#34474d] bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#34474d] file:text-white hover:file:bg-[#537079] file:transition-colors transition-colors hover:bg-[#f3f6f7]",
  closeButtonOutline: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#34474d] text-[#121212] hover:bg-[#f3f6f7] transition-colors",
  modalContentOutline: "bg-white rounded-xl p-8 w-full max-w-md shadow-md relative border border-gray-300",

  /* Floating Action Button */
  fab: "fixed bottom-6 right-6 w-14 h-14 bg-[#34474d] hover:bg-[#537079] text-white rounded-full shadow-md hover:shadow-md transition-all duration-200 flex items-center justify-center z-50 font-medium text-sm",
  fabWithText: "fixed bottom-6 right-6 px-6 py-3 bg-[#34474d] hover:bg-[#537079] text-white rounded-full shadow-md hover:shadow-md transition-all duration-200 flex items-center justify-center z-50 font-medium text-sm gap-2",

  /* Primary Control Bar */
  primaryControlBar: "sticky top-16 z-40 w-[90vw] max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-8 py-3 bg-white border border-gray-300 rounded-lg shadow-md mt-4 -mb-2",

  /* Fixed thumbnails */
  fixedThumbnail: "w-40 h-40 overflow-hidden",
  fixedThumbnailCard: "w-40 h-40 rounded-md bg-white shadow-sm overflow-hidden flex flex-col",
};
