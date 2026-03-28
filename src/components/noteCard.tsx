import { useState, type MouseEvent } from "react"
import {
  PaintBrushIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import type { Note } from "../db/db"
import { DEFAULT_NOTE_COLOR } from "../constants/noteColors"
import { uiStyles } from "../uiStyles"

type NoteCardProps = {
  note: Note
  onUpdateNote: (note: Note) => Promise<void> | void
  onDeleteNote: (id: string) => Promise<void> | void
  onOpenPalette: (noteId: string, event: MouseEvent<HTMLButtonElement>) => void
}

export function NoteCard({
  note,
  onUpdateNote,
  onDeleteNote,
  onOpenPalette,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleDraft, setTitleDraft] = useState(note.title)
  const [contentDraft, setContentDraft] = useState(note.content)

  function startEditing() {
    setTitleDraft(note.title)
    setContentDraft(note.content)
    setIsEditing(true)
  }

  function cancelEditing() {
    setIsEditing(false)
  }

  async function saveEditing() {
    const title = titleDraft.trim()
    if (!title) {
      return
    }

    await onUpdateNote({
      ...note,
      title,
      content: contentDraft.trim(),
    })

    setIsEditing(false)
  }

  return (
    <article className={uiStyles.notes.noteCard} style={{ background: note.color || DEFAULT_NOTE_COLOR }}>
      {isEditing ? (
        <>
          <input
            className={uiStyles.notes.editInput}
            type="text"
            value={titleDraft}
            onChange={(event) => setTitleDraft(event.target.value)}
            placeholder="Note title"
          />
          <textarea
            className={uiStyles.notes.editTextArea}
            value={contentDraft}
            onChange={(event) => setContentDraft(event.target.value)}
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
          <h3 className={uiStyles.notes.noteTitle}>{note.title}</h3>
          <p className={uiStyles.notes.noteContent}>{note.content || "No extra content"}</p>
        </>
      )}

      <footer className={uiStyles.notes.noteFooter}>
        <time
          className={uiStyles.notes.noteTime}
          dateTime={new Date(note.updatedAt).toISOString()}
        >
          {new Date(note.updatedAt).toLocaleString()}
        </time>
        <div className={uiStyles.notes.iconGroup}>
          <button
            className={uiStyles.notes.iconActionButton}
            type="button"
            aria-label="Edit note"
            onClick={startEditing}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          <button
            className={uiStyles.notes.iconActionButton}
            type="button"
            aria-label="Open color palette"
            onClick={(event) => onOpenPalette(note.id, event)}
          >
            <PaintBrushIcon className="h-4 w-4" />
          </button>
          <button
            className={uiStyles.notes.iconActionButton}
            onClick={() => {
              void onDeleteNote(note.id)
            }}
            type="button"
            aria-label="Delete note"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </article>
  )
}
