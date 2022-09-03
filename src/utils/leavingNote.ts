import { Note } from "@contexts";
import addNote from "@services/firebase/notes/add";
import deleteNote from "@services/firebase/notes/delete";
import updateNote from "@services/firebase/notes/update";

export default async function levingNote() {
    const timeoutID = localStorage.getItem("orange-notes_timeout-id");

    if (timeoutID) {
        clearTimeout(timeoutID)
    }

    /** Note data from local storage */
    const data: Note = {
        title: localStorage.getItem("orange-note_local-note-title") || "",
        content: localStorage.getItem("orange-note_local-note-content") || "",
        id: localStorage.getItem("orange-note_local-note-id") || "",
    }
    localStorage.removeItem("orange-note_local-note-title");
    localStorage.removeItem("orange-note_local-note-content");
    localStorage.removeItem("orange-note_local-note-id");

    const needUpdateNote = localStorage.getItem("orange-note_local-note-update");

    // if not needs to update note, just ignore
    if (needUpdateNote === "false") {
        return;
    }

    // Check if the note has an ID
    if (data.id !== "") {
        // If the note is full empty delete it
        if (data.title === "" && data.content === "") {
            await deleteNote(data.id);
        } else { // Otherwise update
            await updateNote(data);
        }
    } else { // if not create the note
        if (data.title === "" && data.content === "") {
            // not create the task if it is empty
            return
        }
        await addNote({ title: data.title,content: data.content });
    }
}
