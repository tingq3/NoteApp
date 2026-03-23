export const uiStyles = {
  layout: {
    appShell: "min-h-screen bg-amber-50 px-4 py-6 text-stone-800 sm:px-6",
    appContent: "mx-auto max-w-5xl",
    appSubtitle: "mt-1 font-mono text-sm text-stone-600",
  },

  form: {
    composerCard:
      "mb-4 grid grid-cols-1 gap-3 rounded-xl border border-stone-300 bg-white p-3 shadow-sm sm:grid-cols-[1fr_auto]",
    fieldInput:
      "rounded-lg border border-stone-300 px-3 py-2.5 text-base font-semibold text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300",
    primaryButton:
      "min-h-10 cursor-pointer rounded-lg bg-amber-500 px-4 font-mono font-bold text-amber-950 hover:bg-amber-600",
    statusText: "col-span-full min-h-4 text-xs font-mono text-stone-500",
  },

  notes: {
    emptyCard: "mt-6 rounded-xl border border-dashed border-stone-300 bg-white p-6",
    noteCard: "rounded-xl border border-stone-300 p-3 shadow-sm",
    iconActionButton:
      "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white/80 hover:bg-white",
    palettePopover:
      "fixed flex w-52 flex-wrap gap-2 rounded-xl border border-stone-300 bg-white p-3 shadow-lg",
    colorSwatch:
      "h-5 w-5 cursor-pointer rounded-full border border-stone-300 shadow-sm transition-transform hover:scale-110",
  },
} as const
