import { Note } from "@contexts";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "..";
import notesConverter from "./converter";
import deleteNote from "./delete";

export default async function updateNote(note: Note) {
    const noteRef = doc(firestore, 'notes', note.id).withConverter(notesConverter);
    const accountID = localStorage.getItem("orange-note_local-account-id") || "";

    const data = {
        title: note.title,
        content: note.content,
        timestamp: serverTimestamp(),
    }

    if (data.title === "" && data.content === "" || accountID === "") {
        await deleteNote(note.id);
        return;
    }

    const updatedTimestamp = await updateDoc(noteRef, data);
}
