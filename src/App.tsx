
import { uiStyles } from "./uiStyles"
import { AddNoteForm } from "./components/addNoteForm"
import { NoteList } from "./components/noteList"

function App() {
  return (
    <div className={uiStyles.layout.appShell}>
      <header className={`${uiStyles.layout.appContent} ${uiStyles.layout.appHeader}`}>
        <h1 className={uiStyles.layout.appTitle}>Simple Notes</h1>
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
