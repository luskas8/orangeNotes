import { Note, Task } from "@contexts";
import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import moment from "moment";

const tasksConverter = {
    toFirestore: (task: Task) => {
        return {
            completed: task.completed,
            content: task.content,
            timestamp: task.timestamp,
            owner: task.owner,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Task => {
        const data = snapshot.data(options);
        data.timestamp = moment(data.timestamp.toMillis()).format("L");
        return { completed: data.completed, content: data.content, id: snapshot.id, timestamp: data.timestamp, owner: data.owner, };
    }
}

export default tasksConverter;
