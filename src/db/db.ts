import { Dexie, type EntityTable } from "dexie"
import { DEFAULT_NOTE_COLOR } from "../constants/noteColors"

interface Note {
  id: string
  title: string
  content: string
  color: string
  updatedAt: number
}

const db = new Dexie("NoteDatabase") as Dexie & {
  notes: EntityTable<
    Note,
    "id" // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  notes: "id, title, content, updatedAt", 
})

db.version(2)
  .stores({
    notes: "id, title, content, color, updatedAt",
  })
  .upgrade((transaction) => {
    return transaction
      .table("notes")
      .toCollection()
      .modify((note) => {
        if (!note.color) {
          note.color = DEFAULT_NOTE_COLOR
        }
      })
  })

export type { Note }
export { db }
