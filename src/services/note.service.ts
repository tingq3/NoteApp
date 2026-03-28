import { db, type Note } from "../db/db"
import { v4 as uuid } from "uuid"
import { DEFAULT_NOTE_COLOR } from "../constants/noteColors"

export async function getAllNotes() {
  return db.notes.orderBy("updatedAt").reverse().toArray()
}

export async function addNote(title: string, content: string) {
  const trimmedTitle = title.trim()
  const trimmedContent = content.trim()

  if (!trimmedTitle) {
    throw new Error("Title is required")
  }

  const note: Note = {
    id: uuid(),
    title: trimmedTitle,
    content: trimmedContent,
    color: DEFAULT_NOTE_COLOR,
    updatedAt: Date.now(),
  }

  await db.notes.add(note)
  return note
}

export async function updateNote(note: Note) {
  const trimmedTitle = note.title.trim()
  const trimmedContent = note.content.trim()

  if (!trimmedTitle) {
    throw new Error("Title is required")
  }

  const updatedCount = await db.notes.update(note.id, {
    title: trimmedTitle,
    content: trimmedContent,
    color: note.color,
    updatedAt: Date.now(),
  })

  if (updatedCount === 0) {
    throw new Error("Note not found")
  }
}

export async function deleteNote(id: string) {
  await db.notes.delete(id)
}