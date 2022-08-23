import { createContext, ReactNode, useEffect, useState } from "react";
import { firestore } from "../../services/firebase/init";
import snapshot from "../../services/firebase/onSnapshot";
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
    const [notes, updateNotes] = useState<Note[]>([])

    useEffect(() => {
        snapshot(firestore, updateNotes);
    })

    return (
        <FirebaseContext.Provider
            value={{
                notes,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}
