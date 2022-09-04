import { FormProps } from "@pages/Notes/New";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "..";
import notesConverter from "./converter";

export default async function addNote(note: FormProps) {
    const noteRef = collection(firestore, 'notes');
    const accountID = localStorage.getItem("orange-note_local-account-id") || "";

    if (note.title === "" && note.content === "" || accountID === "") {
        // not create note if it is empty
        return;
    }

    const addedNote = (await addDoc(noteRef, { ...note, timestamp: serverTimestamp(), owner: accountID })).withConverter(notesConverter);
    return addedNote.id;
}
