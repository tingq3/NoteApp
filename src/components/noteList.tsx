import { useEffect, useState, type MouseEvent } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { PaintBrushIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Note } from "../db/db"
import { deleteNote, getAllNotes, updateNote } from "../services/note.service"
import { uiStyles } from "../uiStyles"

const LIGHT_COLORS = [
  "#ffffff",
  "#fff8d6",
  "#ffe7d9",
  "#e4f6e8",
  "#e7f0ff",
  "#f3eaff",
  "#fff0d9",
]

export function NoteList() {
  const [expandedPaletteId, setExpandedPaletteId] = useState<string | null>(null)
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 })
  const notes = useLiveQuery(() => getAllNotes(), [], [] as Note[])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedPaletteId(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  function openPalette(noteId: string, event: MouseEvent<HTMLButtonElement>) {
    if (expandedPaletteId === noteId) {
      setExpandedPaletteId(null)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const popoverWidth = 196
    const margin = 12
    const maxLeft = window.innerWidth - popoverWidth - margin

    setPalettePosition({
      top: rect.bottom + 8,
      left: Math.max(margin, Math.min(rect.left, maxLeft)),
    })
    setExpandedPaletteId(noteId)
  }

  function closePalette() {
    setExpandedPaletteId(null)
  }

  function handleSelectColor(color: string) {
    if (!expandedPaletteId) {
      return
    }

    void updateNote(expandedPaletteId, { color })
    closePalette()
  }

  const expandedNote = notes.find((note) => note.id === expandedPaletteId)
  const selectedNoteColor = expandedNote?.color || "#ffffff"

  if (!notes || notes.length === 0) {
    return (
      <section className={uiStyles.notes.emptyCard}>
        <h2 className="text-xl font-bold">No notes yet</h2>
        <p className="mt-1.5 font-mono text-sm text-stone-500">
          Your ideas will appear here after you add one.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3" aria-label="All notes">
        {notes.map((note) => {
          const currentColor = note.color || "#ffffff"

          return (
            <article
              key={note.id}
              className={uiStyles.notes.noteCard}
              style={{ background: currentColor }}
            >
              <h3 className="text-lg font-extrabold tracking-tight">{note.title}</h3>
              <p className="mt-2 mb-3 text-sm text-stone-700">
                {note.content || "No extra content"}
              </p>
              <footer className="flex items-center justify-between gap-2">
                <time
                  className="font-mono text-xs text-stone-600"
                  dateTime={new Date(note.updatedAt).toISOString()}
                >
                  {new Date(note.updatedAt).toLocaleString()}
                </time>
                <div className="flex items-center gap-1.5">
                  <button
                    className={`${uiStyles.notes.iconActionButton} text-stone-700`}
                    type="button"
                    aria-label="Open color palette"
                    onClick={(event) => openPalette(note.id, event)}
                  >
                    <PaintBrushIcon className="h-4 w-4" />
                  </button>
                  <button
                    className={`${uiStyles.notes.iconActionButton} text-red-700`}
                    onClick={() => void deleteNote(note.id)}
                    type="button"
                    aria-label="Delete note"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </footer>
            </article>
          )
        })}
      </section>

      {expandedPaletteId ? (
        <div className="fixed inset-0 z-50" onClick={closePalette}>
          <div
            className={uiStyles.notes.palettePopover}
            style={{ top: palettePosition.top, left: palettePosition.left }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-label="Color palette"
          >
            {LIGHT_COLORS.map((color) => (
              <button
                key={color}
                className={`${uiStyles.notes.colorSwatch} ${
                  selectedNoteColor === color
                    ? "ring-2 ring-violet-500 ring-offset-1 ring-offset-white"
                    : ""
                }`}
                onClick={() => handleSelectColor(color)}
                style={{ background: color }}
                type="button"
                aria-label={`Set note color to ${color}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
