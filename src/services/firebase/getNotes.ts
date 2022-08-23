import { collection, Firestore, getDocs } from "firebase/firestore";
import { Note } from "../../contexts";
import notesConverter from "./notesConverter";



const getNotes = async (store: Firestore) => {
    const data: Note[] = [];
    const notesSnapshot = await getDocs(collection(store, "notes").withConverter(notesConverter));
    notesSnapshot.docs.forEach(doc => {
        data.push(doc.data());
    });
    return data;
}

export default getNotes;
