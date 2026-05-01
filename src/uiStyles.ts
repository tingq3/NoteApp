export const uiStyles = {
  layout: {
    appShell: "min-h-screen bg-stone-100 text-stone-800 flex flex-col",
    twoColumnLayout: "flex flex-1 overflow-hidden",
    sidebar: "w-80 bg-stone-50 border-r border-stone-300 p-4 overflow-y-auto",
    sidebarHeader: "mb-4 pb-4 border-b border-stone-300",
    appContent: "mx-auto max-w-4xl",
    appHeader: "mb-5",
    appTitle: "text-2xl font-bold text-stone-900",
    appSubtitle: "mt-1 text-sm text-stone-600",
    mainContent: "flex-1 bg-white p-6 overflow-y-auto",
    emptyState: "flex items-center justify-center h-full",
    emptyStateText: "text-stone-500",
  },

  form: {
    composerCard:
      "mb-4 space-y-2 rounded-lg border border-stone-300 bg-white p-2",
    fieldInput:
      "w-full rounded border border-stone-300 px-2 py-1 text-sm",
    fieldTextArea:
      "w-full min-h-16 rounded border border-stone-300 px-2 py-1 text-sm",
    primaryButton:
      "cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700 w-full",
    statusText: "min-h-4 text-xs text-stone-600",
  },

  notes: {
    emptyCard: "mt-6 rounded-lg border border-dashed border-stone-300 bg-white p-4",
    grid: "grid grid-cols-1 gap-2",
    noteCard: "rounded-lg border border-stone-300 p-2 cursor-pointer hover:bg-stone-200 transition-colors",
    noteSidebarItem: "rounded-lg border border-stone-300 p-2 cursor-pointer hover:bg-stone-200 transition-colors text-sm",
    noteSidebarItemSelected: "rounded-lg border border-blue-500 bg-blue-50 p-2 text-sm",
    noteTitle: "text-2xl font-semibold text-stone-900 mb-4",
    noteContent: "mt-2 mb-3 text-base text-stone-700 whitespace-pre-wrap",
    editInput: "w-full rounded border border-stone-300 px-3 py-2 text-lg font-semibold",
    editTextArea: "mt-2 mb-3 w-full min-h-96 rounded border border-stone-300 px-3 py-2 text-base",
    editActions: "mt-4 flex items-center gap-2",
    smallButton:
      "cursor-pointer rounded border border-stone-300 bg-white px-3 py-1 text-sm font-semibold hover:bg-stone-100",
    noteFooter: "flex items-center justify-between gap-2 text-xs text-stone-600 mt-4 pt-4 border-t border-stone-300",
    noteTime: "text-xs text-stone-600",
    iconGroup: "flex items-center gap-2",
    iconActionButton:
      "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-stone-300 bg-white hover:bg-stone-100",
    palettePopover:
      "fixed flex w-52 flex-wrap gap-2 rounded-lg border border-stone-300 bg-white p-3",
    colorSwatch:
      "h-5 w-5 cursor-pointer rounded-full border border-stone-300",
  },
} as const
