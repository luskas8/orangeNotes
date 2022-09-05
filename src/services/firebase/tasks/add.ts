import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "..";
import tasksConverter from "./converter";

interface NewTask {
    content: string;
    completed: boolean;
}

export default async function addTask(task: NewTask) {
    const taskRef = collection(firestore, 'tasks');
    const accountID = localStorage.getItem("orange-note_local-account-id") || "";

    if (task.content === "" || accountID === "") {
        // not create task if it is empty
        return;
    }


    const addedTask = (await addDoc(taskRef, { ...task, timestamp: serverTimestamp(), owner: accountID })).withConverter(tasksConverter);

    return addedTask.id;
}
