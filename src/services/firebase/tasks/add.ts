import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "..";
import tasksConverter from "./converter";

interface NewTask {
    content: string;
    completed: boolean;
}

export default async function addTask(task: NewTask) {
    const taskRef = collection(firestore, 'tasks');

    const addedTask = (await addDoc(taskRef, { ...task, timestamp: serverTimestamp() })).withConverter(tasksConverter);

    return addedTask.id;
}
