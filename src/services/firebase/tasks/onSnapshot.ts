import { collection, Firestore, onSnapshot } from "firebase/firestore";
import { Task } from "../../../contexts";
import tasksConverter from "./converter";

const snapshot = (store: Firestore, updateState: Function) => {
    const coolRef = collection(store, "tasks").withConverter(tasksConverter);

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
