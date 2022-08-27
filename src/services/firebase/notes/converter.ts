import { Note } from "@contexts";
import { FieldValue, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import moment from "moment";

const notesConverter = {
    toFirestore: (note: Note) => {
        return {
            title: note.title,
            content: note.content,
            timestamp: note.timestamp,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note => {
        const data = snapshot.data(options);
        if (data.timestamp && data.timestamp.seconds) {
            // console.log(new Date(data.timestamp.seconds).getMonth())
            data.timestamp = moment(data.timestamp.seconds).format("L");
        }
        return { title: data.title, content: data.content, id: snapshot.id, timestamp: data.timestamp };
    }
}

export default notesConverter;
