import { Task } from "@contexts";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "..";
import tasksConverter from "./converter";

export default async function updateTask(task: Task) {
    const taskRef = doc(firestore, 'tasks', task.id).withConverter(tasksConverter);

    const data = {
        completed: task.completed,
        content: task.content,
        timestamp: serverTimestamp(),
    }

    const updatedTimestamp = await updateDoc(taskRef, data);
}
