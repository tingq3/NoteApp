import { useState, type KeyboardEvent } from "react"
import { addNote } from "../services/note.service"
import { uiStyles } from "../uiStyles"

type AddNoteFormProps = {
  onNoteAdded?: (noteId: string) => void
}

export function AddNoteForm({ onNoteAdded }: AddNoteFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("")

  async function handleAddNote() {
    try {
      const createdNote = await addNote(title, content)
      setStatus(`Note "${createdNote.title}" added`)
      setTitle("")
      setContent("")
      if (onNoteAdded) {
        onNoteAdded(createdNote.id)
      }
      // Clear status after 2 seconds
      setTimeout(() => setStatus(""), 2000)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setStatus(`Failed to add note: ${message}`)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      void handleAddNote()
    }
  }

  return (
    <section className={uiStyles.form.composerCard} aria-label="Create a note">
      <input
        className={uiStyles.form.fieldInput}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Note title"
      />

      <textarea
        className={uiStyles.form.fieldTextArea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
      />

      <button className={uiStyles.form.primaryButton} onClick={handleAddNote}>
        Add Note
      </button>

      <p className={uiStyles.form.statusText} aria-live="polite">
        {status}
      </p>
    </section>
  )
}