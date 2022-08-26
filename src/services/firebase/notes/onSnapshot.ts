import { collection, Firestore, onSnapshot } from "firebase/firestore";
import { Note } from "../../../contexts";
import notesConverter from "./converter";

const snapshot = (store: Firestore, updateState: Function) => {
    const coolRef = collection(store, "notes").withConverter(notesConverter);

    const unsubscribe = onSnapshot(coolRef, (snapshot) => {
        let data: Note[] = []
        snapshot.forEach(doc => {
            data.push(doc.data())
        })
        updateState(data);
    })

    return () => unsubscribe();
}

export default snapshot;
