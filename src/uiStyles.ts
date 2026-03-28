export const uiStyles = {
  layout: {
    appShell: "min-h-screen bg-amber-50 p-4 text-stone-800",
    appContent: "mx-auto max-w-4xl",
    appHeader: "mb-5",
    appTitle: "text-3xl font-bold",
    appSubtitle: "mt-1 text-sm text-stone-600",
  },

  form: {
    composerCard:
      "mb-4 space-y-3 rounded-lg border border-stone-300 bg-white p-3",
    fieldInput:
      "w-full rounded border border-stone-300 px-3 py-2",
    fieldTextArea:
      "w-full min-h-24 rounded border border-stone-300 px-3 py-2",
    primaryButton:
      "cursor-pointer rounded bg-amber-500 px-4 py-2 font-semibold text-amber-950 hover:bg-amber-600",
    statusText: "min-h-4 text-xs text-stone-600",
  },

  notes: {
    emptyCard: "mt-6 rounded-lg border border-dashed border-stone-300 bg-white p-4",
    grid: "grid grid-cols-1 gap-3 md:grid-cols-2",
    noteCard: "rounded-lg border border-stone-300 p-3",
    noteTitle: "text-lg font-semibold",
    noteContent: "mt-2 mb-3 text-sm text-stone-700",
    editInput: "w-full rounded border border-stone-300 px-2 py-1 text-sm",
    editTextArea: "mt-2 mb-3 w-full min-h-20 rounded border border-stone-300 px-2 py-1 text-sm",
    editActions: "mt-2 flex items-center gap-2",
    smallButton:
      "cursor-pointer rounded border border-stone-300 bg-white px-2 py-1 text-xs font-semibold",
    noteFooter: "flex items-center justify-between gap-2",
    noteTime: "text-xs text-stone-600",
    iconGroup: "flex items-center gap-2",
    iconActionButton:
      "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-stone-300 bg-white",
    palettePopover:
      "fixed flex w-52 flex-wrap gap-2 rounded-lg border border-stone-300 bg-white p-3",
    colorSwatch:
      "h-5 w-5 cursor-pointer rounded-full border border-stone-300",
  },
} as const
