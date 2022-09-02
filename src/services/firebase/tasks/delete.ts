import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "..";

export default async function deleteTask(id: string) {
    const noteRef = doc(firestore, "tasks", id);
    await deleteDoc(noteRef);
    localStorage.removeItem("orange-note_local-note-title");
    localStorage.removeItem("orange-note_local-note-content");
    localStorage.removeItem("orange-note_local-note-id");
    return;
}
