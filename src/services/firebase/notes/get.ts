import { doc, getDoc } from "firebase/firestore";
import { firestore } from "..";
import notesConverter from "./converter";

export default async function getNote(id: string) {
    const docRef = doc(firestore, "notes", id).withConverter(notesConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null
}
