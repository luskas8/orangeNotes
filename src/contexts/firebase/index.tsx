import { firestore } from "@services/firebase";
import snapshotNotes from "@services/firebase/notes/onSnapshot";
import snapshotTasks from "@services/firebase/tasks/onSnapshot";
import { createContext, ReactNode, useEffect, useState } from "react";
export interface Note {
    id: string;
    title: string;
    content: string;
    timestamp?: number | string;
}

export interface Task {
    id: string;
    content: string;
    completed: boolean;
    timestamp?: number | string;
}

interface FirebaseContextProps {
    notes: Note[];
    tasks: Task[];
}
interface FirebaseProps {
    children: ReactNode;
}

const defaultValues: FirebaseContextProps = {
    notes: [
        // { content: "sdjsdaksjkd", title: "Test 1", id: "348348394" },
        // { content: "asldakoaoa", title: "Test 2", id: "saskasosaoa" },
        // { content: "apoapoaoskdjdjdj", title: "Test 3", id: "348348394aososo" },
    ],
    tasks: [
        // { content: "sdjsdaksjkd", completed: true, id: "348348394" },
        // { content: "asldakoaoa", completed: false, id: "saskasosaoa" },
        // { content: "apoapoaoskdjdjdj", completed: false, id: "348348394aososo" },
    ],
};

export const FirebaseContext = createContext<FirebaseContextProps>(defaultValues);

export const FirebaseProvider = ({ children }: FirebaseProps) => {
    const [notes, updateNotes] = useState<Note[]>(defaultValues.notes);
    const [tasks, updateTasks] = useState<Task[]>(defaultValues.tasks);

    useEffect(() => {
        snapshotNotes(firestore, updateNotes);
        snapshotTasks(firestore, updateTasks);
    });

    return (
        <FirebaseContext.Provider
            value={{
                notes,
                tasks,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
