import { Note } from "@contexts";
import { FormProps } from "@pages/Notes/New";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "..";
import notesConverter from "./converter";

export default async function addNote(note: FormProps) {
    const noteRef = collection(firestore, 'notes');

    const addedNote = (await addDoc(noteRef, { ...note, timestamp: serverTimestamp() })).withConverter(notesConverter);

    return addedNote.id;
}
