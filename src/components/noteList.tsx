import { useEffect, useState, type MouseEvent } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import type { Note } from "../db/db"
import { deleteNote, getAllNotes, updateNote } from "../services/note.service"
import {
  DEFAULT_NOTE_COLOR,
  NOTE_COLOR_OPTIONS,
} from "../constants/noteColors"
import { uiStyles } from "../uiStyles"
import { NoteCard } from "./noteCard"
import { NoteColorPalette } from "./noteColorPalette"

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

    const noteToUpdate = notes.find((note) => note.id === expandedPaletteId)
    if (!noteToUpdate) {
      closePalette()
      return
    }

    void updateNote({
      ...noteToUpdate,
      color,
    })
    closePalette()
  }

  const expandedNote = notes.find((note) => note.id === expandedPaletteId)
  const selectedNoteColor = expandedNote?.color || DEFAULT_NOTE_COLOR

  if (!notes || notes.length === 0) {
    return (
      <section className={uiStyles.notes.emptyCard}>
        <h2 className="text-xl font-semibold">No notes yet</h2>
        <p className="mt-1 text-sm text-stone-500">
          Your ideas will appear here after you add one.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className={uiStyles.notes.grid} aria-label="All notes">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdateNote={(nextNote) => updateNote(nextNote)}
            onDeleteNote={(id) => deleteNote(id)}
            onOpenPalette={openPalette}
          />
        ))}
      </section>

      {expandedPaletteId ? (
        <NoteColorPalette
          colors={NOTE_COLOR_OPTIONS}
          selectedColor={selectedNoteColor}
          position={palettePosition}
          onClose={closePalette}
          onSelectColor={handleSelectColor}
        />
      ) : null}
    </>
  )
}
