import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { initApp } from "../../services/firebase/init";

interface Note {
    id: string;
    title: string;
    content: string;
}

interface FirebaseContextProps {
    notes: Note[];
    firestore: Firestore | null;
}
interface FirebaseProps extends FirebaseContextProps {
    children: ReactNode;
}

const defaultValues: FirebaseContextProps = {
    notes: [],
    firestore: null,
}

export const FirebaseContext = createContext<FirebaseContextProps>(defaultValues);

export const FirebaseProvider = ({ children, notes, firestore }: FirebaseProps) => {
    const [firestoreState, setFirestoreState] = useState<Firestore>(firestore!);
    const [notesState, updateNotesState] = useState(notes);
    const [firebase, setFirebase] = useState<FirebaseApp>();

    useEffect(() => {
        const app = initApp();
        setFirebase(app);
        const store = getFirestore(app);
        setFirestoreState(store);
    });

    return (
        <FirebaseContext.Provider
            value={{
                notes: notesState,
                firestore: firestoreState,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}
