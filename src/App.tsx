
import { useState } from "react"
import { uiStyles } from "./uiStyles"
import { AddNoteForm } from "./components/addNoteForm"
import { NoteList } from "./components/noteList"
import { NoteDetail } from "./components/noteDetail.tsx"

function App() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  return (
    <div className={uiStyles.layout.appShell}>
      <div className={uiStyles.layout.twoColumnLayout}>
        {/* Sidebar */}
        <aside className={uiStyles.layout.sidebar}>
          <div className={uiStyles.layout.sidebarHeader}>
            <h1 className={uiStyles.layout.appTitle}>Notes</h1>
          </div>
          <AddNoteForm onNoteAdded={setSelectedNoteId} />
          <NoteList selectedNoteId={selectedNoteId} onSelectNote={setSelectedNoteId} />
        </aside>

        {/* Main Content */}
        <main className={uiStyles.layout.mainContent}>
          {selectedNoteId ? (
            <NoteDetail noteId={selectedNoteId} />
          ) : (
            <div className={uiStyles.layout.emptyState}>
              <p className={uiStyles.layout.emptyStateText}>Select a note to view and edit</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
