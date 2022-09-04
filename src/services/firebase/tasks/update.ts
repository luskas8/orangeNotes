import { Task } from "@contexts";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "..";
import tasksConverter from "./converter";
import deleteTask from "./delete";

export default async function updateTask(task: Task) {
    const taskRef = doc(firestore, 'tasks', task.id).withConverter(tasksConverter);

    const data = {
        completed: task.completed,
        content: task.content,
        timestamp: serverTimestamp(),
    }

    if (data.content === "") {
        await deleteTask(task.id);
        return;
    }

    const updatedTimestamp = await updateDoc(taskRef, data);
}
