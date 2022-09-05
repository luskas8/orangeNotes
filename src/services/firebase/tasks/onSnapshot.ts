import { collection, Firestore, onSnapshot, query, where } from "firebase/firestore";
import { Task } from "../../../contexts";
import tasksConverter from "./converter";

const snapshot = (store: Firestore, updateState: Function) => {
    const accountID = localStorage.getItem("orange-note_local-account-id") || "";
    const coolRef = query(collection(store, "tasks").withConverter(tasksConverter), where('owner', "==", accountID));

    const unsubscribe = onSnapshot(coolRef, (snapshot) => {
        let data: Task[] = []
        snapshot.forEach(doc => {
            data.push(doc.data({ serverTimestamps: "estimate" }))
        })
        updateState(data);
    })

    return unsubscribe
}

export default snapshot;
