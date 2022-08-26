import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Note } from "@contexts";

const notesConverter = {
    toFirestore: (note: Note) => {
        return {
            title: note.title,
            content: note.content,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note => {
        const data = snapshot.data(options);
        return { title: data.title, content: data.content, id: snapshot.id };
    }
}

export default notesConverter;
