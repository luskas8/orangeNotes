import { collection, Firestore, onSnapshot, query, where } from "firebase/firestore";
import { Note } from "../../../contexts";
import notesConverter from "./converter";

const snapshot = (store: Firestore, updateState: Function) => {
    const accountID = localStorage.getItem("orange-note_local-account-id") || "";
    const coolRef = query(collection(store, "notes").withConverter(notesConverter), where("owner", "==", accountID));


    const unsubscribe = onSnapshot(coolRef, (snapshot) => {
        let data: Note[] = []
        snapshot.forEach(doc => {
            data.push(doc.data({ serverTimestamps: "estimate" }))
        })
        updateState(data);
    })
    return unsubscribe
}

export default snapshot;
