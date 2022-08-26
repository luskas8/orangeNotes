import { Note } from "@contexts";
import deleteNote from "@services/firebase/notes/delete";
import updateNote from "@services/firebase/notes/update";

export default async function levingNote() {
    const timeoutID = localStorage.getItem("orange-notes_timeout-id");
    if (timeoutID) {
        clearTimeout(timeoutID)
    }
    const data: Note = {
        title: localStorage.getItem("orange-note_local-note-title") || "",
        content: localStorage.getItem("orange-note_local-note-content") || "",
        id: localStorage.getItem("orange-note_local-note-id") || "",
    }

    localStorage.removeItem("orange-note_local-note-title");
    localStorage.removeItem("orange-note_local-note-content");
    localStorage.removeItem("orange-note_local-note-id");

    if (data.id !== "") {
        if (data.title !== "" && data.content !== "") {
            await updateNote(data);
        } else {
            deleteNote(data.id);
        }
    }
}
