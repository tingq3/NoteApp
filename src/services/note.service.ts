import { db, type Note } from "../db/db"
import { v4 as uuid } from "uuid"

export async function getAllNotes() {
  return db.notes.orderBy("updatedAt").reverse().toArray()
}

export async function addNote(title: string) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    throw new Error("Title is required")
  }

  const note: Note = {
    id: uuid(),
    title: trimmedTitle,
    content: "",
    color: "#ffffff",
    updatedAt: Date.now(),
  }

  await db.notes.add(note)
  return note
}

export async function updateNote(id: string, updates: Partial<Note>) {
  await db.notes.update(id, {
    ...updates,
    updatedAt: Date.now(),
  })
}

export async function deleteNote(id: string) {
  await db.notes.delete(id)
}