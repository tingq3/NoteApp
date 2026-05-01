import { useCallback, useEffect, useState, type MouseEvent } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { TrashIcon, PaintBrushIcon } from "@heroicons/react/24/outline"
import type { Note } from "../db/db"
import { deleteNote, getAllNotes, updateNote } from "../services/note.service"
import {
  DEFAULT_NOTE_COLOR,
  NOTE_COLOR_OPTIONS,
} from "../constants/noteColors"
import { uiStyles } from "../uiStyles"
import { NoteColorPalette } from "./noteColorPalette"

type NoteDetailProps = {
  noteId: string
}

type EditState = {
  title: string
  content: string
}

export function NoteDetail({ noteId }: NoteDetailProps) {
  const [expandedPaletteId, setExpandedPaletteId] = useState<string | null>(null)
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 })
  const [edits, setEdits] = useState<EditState | null>(null)
  const notes = useLiveQuery(() => getAllNotes(), [], [] as Note[])

  const note = notes.find((n) => n.id === noteId)
  const isEditing = edits !== null

  // Only set up keyboard listener when editing
  useEffect(() => {
    if (!isEditing) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEdits(null)
        setExpandedPaletteId(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isEditing])

  const openPalette = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (expandedPaletteId) {
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
  }, [expandedPaletteId, noteId])

  const closePalette = useCallback(() => {
    setExpandedPaletteId(null)
  }, [])

  const handleSelectColor = useCallback((color: string) => {
    if (!note) return
    void updateNote({ ...note, color })
    closePalette()
  }, [closePalette, note])

  const startEditing = useCallback(() => {
    if (!note) return
    setEdits({ title: note.title, content: note.content })
  }, [note])

  const cancelEditing = useCallback(() => {
    setEdits(null)
  }, [])

  const saveEditing = useCallback(async () => {
    if (!edits || !note) return
    
    const title = edits.title.trim()
    if (!title) return

    await updateNote({
      ...note,
      title,
      content: edits.content.trim(),
    })
    setEdits(null)
  }, [edits, note])

  if (!note) {
    return (
      <div className={uiStyles.layout.emptyState}>
        <p className={uiStyles.layout.emptyStateText}>Note not found</p>
      </div>
    )
  }

  return (
    <article style={{ backgroundColor: note.color || DEFAULT_NOTE_COLOR }} className="rounded-lg p-8 h-full flex flex-col">
      {isEditing && edits ? (
        <>
          <input
            className={uiStyles.notes.editInput}
            type="text"
            value={edits.title}
            onChange={(event) => setEdits({ ...edits, title: event.target.value })}
            placeholder="Note title"
            autoFocus
          />
          <textarea
            className={uiStyles.notes.editTextArea}
            value={edits.content}
            onChange={(event) => setEdits({ ...edits, content: event.target.value })}
            placeholder="Write your note..."
          />
          <div className={uiStyles.notes.editActions}>
            <button
              className={uiStyles.notes.smallButton}
              type="button"
              onClick={() => void saveEditing()}
            >
              Save
            </button>
            <button
              className={uiStyles.notes.smallButton}
              type="button"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <h2 className={uiStyles.notes.noteTitle}>{note.title}</h2>
            <p className={uiStyles.notes.noteContent}>{note.content || "(No additional content)"}</p>
          </div>

          <footer className={uiStyles.notes.noteFooter}>
            <div className="flex-1">
              <time
                className={uiStyles.notes.noteTime}
                dateTime={new Date(note.updatedAt).toISOString()}
              >
                Last updated: {new Date(note.updatedAt).toLocaleString()}
              </time>
            </div>
            <div className={uiStyles.notes.iconGroup}>
              <button
                className={uiStyles.notes.iconActionButton}
                type="button"
                aria-label="Edit note"
                onClick={startEditing}
              >
                ✎
              </button>
              <button
                className={uiStyles.notes.iconActionButton}
                type="button"
                aria-label="Change note color"
                onClick={openPalette}
              >
                <PaintBrushIcon className="h-4 w-4" />
              </button>
              <button
                className={uiStyles.notes.iconActionButton}
                onClick={() => {
                  void deleteNote(note.id)
                }}
                type="button"
                aria-label="Delete note"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </>
      )}

      {expandedPaletteId ? (
        <NoteColorPalette
          colors={NOTE_COLOR_OPTIONS}
          selectedColor={note.color || DEFAULT_NOTE_COLOR}
          position={palettePosition}
          onClose={closePalette}
          onSelectColor={handleSelectColor}
        />
      ) : null}
    </article>
  )
}
