import { collection, Firestore, getDocs, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Note } from "../../contexts";

const notesConverter = {
    toFirestore: (note: Note) => {
        return {
            title: note.title,
            content: note.content,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note => {
        const data = snapshot.data(options);
        return { title: data.title, content: data.content, id: data.id };
    }
}

const getNotes = async (store: Firestore) => {
    const data: Note[] = [];
    const notesSnapshot = await getDocs(collection(store, "notes").withConverter(notesConverter));
    notesSnapshot.docs.forEach(doc => {
        let _doc = doc.data();
        _doc.id = doc.id;
        data.push(_doc);
    });
    return data;
}

export default getNotes;
