import { Note } from "@contexts";
import { FieldValue, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import moment from "moment";

const notesConverter = {
    toFirestore: (note: Note) => {
        return {
            title: note.title,
            content: note.content,
            timestamp: note.timestamp,
            owner: note.owner,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note => {
        const data = snapshot.data(options);
        data.timestamp = moment(data.timestamp.toMillis()).format("L");
        return { title: data.title, content: data.content, id: snapshot.id, timestamp: data.timestamp, owner: data.owner };
    }
}

export default notesConverter;
