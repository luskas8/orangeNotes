import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "..";
import accountConverter from "./converter";

export default async function addAccount(username: string) {
    const noteRef = collection(firestore, 'accounts');

    const data = {
        username: username,
        level: 0,
        xp: 0,
    }

    const addedNote = (await addDoc(noteRef, { ...data, timestamp: serverTimestamp() })).withConverter(accountConverter);
    return addedNote.id;
}
