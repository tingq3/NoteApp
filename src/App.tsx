
import { uiStyles } from "./uiStyles"
import { AddNoteForm } from "./components/addNoteForm"
import { NoteList } from "./components/noteList"

function App() {
  return (
    <div className={uiStyles.layout.appShell}>
      <header className={`${uiStyles.layout.appContent} mb-5`}>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Simple Notes
        </h1>
        <p className={uiStyles.layout.appSubtitle}>
          Capture ideas before they drift away
        </p>
      </header>

      <main className={uiStyles.layout.appContent}>
        <AddNoteForm />
        <NoteList />
      </main>
    </div>
  )
}

export default App
