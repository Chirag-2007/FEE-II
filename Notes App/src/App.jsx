import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const handleSave = () => {

    if (text.trim() === "") {
      return;
    }

    if (editId !== null) {

      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, text: text }
            : note
        )
      );

      setEditId(null);

    } 

    else {

      const newNote = {
        id: Date.now(),
        text: text
      };

      setNotes([...notes, newNote]);
    }

    setText("");
  };

  const handleDelete = (id) => {

    setNotes(
      notes.filter((note) => note.id !== id)
    );

  };

  const handleEdit = (note) => {

    setText(note.text);

    setEditId(note.id);

  };

  const handleCancel = () => {

    setText("");

    setEditId(null);

  };


  return (
    <div className="app">
      <h1>Notes</h1>
      <div className="notes-container">

        {notes.map((note) => (

          <div className="note-card" key={note.id}>

            <p>{note.text}</p>

            <div className="button-container">

              <button
                className="delete-btn"
                onClick={() => handleDelete(note.id)}
              >
                delete
              </button>

              <button
                className="edit-btn"
                onClick={() => handleEdit(note)}
              >
                edit
              </button>

            </div>

          </div>

        ))}

        <div className="note-card input-card">

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type...."
            maxLength="100"
          />

          <div className="input-bottom">

            <span>
              {100 - text.length} left
            </span>

            <div>

              {editId !== null && (
                <button
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;