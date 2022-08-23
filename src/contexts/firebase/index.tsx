import { createContext, ReactNode, useEffect, useState } from "react";
import getNotes from "../../services/firebase/getNotes";
import { firestore } from "../../services/firebase/init";
export interface Note {
    id: string;
    title: string;
    content: string;
}

interface FirebaseContextProps {
    notes: Note[];
}
interface FirebaseProps extends FirebaseContextProps {
    children: ReactNode;
}

const defaultValues: FirebaseContextProps = {
    notes: [],
}

export const FirebaseContext = createContext<FirebaseContextProps>(defaultValues);

export const FirebaseProvider = ({ children }: FirebaseProps) => {
    const notes = useNotes();
    return (
        <FirebaseContext.Provider
            value={{
                notes
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}

function useNotes() {
    const [notes, updateNotes] = useState<Note[]>([]);

    useEffect(() => {
        (async function fetchNotes() {
            updateNotes(await getNotes(firestore))
        }())
    })

    return notes;
}
