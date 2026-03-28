import { useState, type KeyboardEvent } from "react"
import { addNote } from "../services/note.service"
import { uiStyles } from "../uiStyles"

export function AddNoteForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("")

  async function handleAddNote() {
    try {
      const createdNote = await addNote(title, content)
      setStatus(`Note "${createdNote.title}" added`)
      setTitle("")
      setContent("")
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