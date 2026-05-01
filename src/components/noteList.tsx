import { useEffect, useState, type MouseEvent } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import type { Note } from "../db/db"
import { deleteNote, getAllNotes, updateNote } from "../services/note.service"
import {
  DEFAULT_NOTE_COLOR,
  NOTE_COLOR_OPTIONS,
} from "../constants/noteColors"
import { uiStyles } from "../uiStyles"
import { NoteColorPalette } from "./noteColorPalette"

type NoteListProps = {
  selectedNoteId: string | null
  onSelectNote: (noteId: string) => void
}

export function NoteList({ selectedNoteId, onSelectNote }: NoteListProps) {
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
    event.stopPropagation()
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
        <h2 className="text-sm font-semibold">No notes yet</h2>
        <p className="mt-1 text-xs text-stone-500">
          Create one to get started.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className={uiStyles.notes.grid} aria-label="Notes list">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={
              selectedNoteId === note.id
                ? uiStyles.notes.noteSidebarItemSelected
                : uiStyles.notes.noteSidebarItem
            }
            style={{
              borderLeftWidth: "4px",
              borderLeftColor: note.color || DEFAULT_NOTE_COLOR,
            }}
          >
            <h3 className="font-semibold text-stone-900 truncate">{note.title}</h3>
            <p className="text-xs text-stone-600 truncate mt-1">
              {note.content ? note.content.substring(0, 50) : "No content"}
            </p>
            <div className="flex items-center justify-between mt-2 gap-1">
              <span className="text-xs text-stone-500">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
              <button
                className={uiStyles.notes.iconActionButton}
                type="button"
                aria-label="Change note color"
                onClick={(event) => openPalette(note.id, event)}
                style={{ height: "20px", width: "20px" }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: note.color || DEFAULT_NOTE_COLOR }}
                ></div>
              </button>
              <button
                className={uiStyles.notes.iconActionButton}
                onClick={(e) => {
                  e.stopPropagation()
                  void deleteNote(note.id)
                }}
                type="button"
                aria-label="Delete note"
                style={{ height: "20px", width: "20px", padding: "2px" }}
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>
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
