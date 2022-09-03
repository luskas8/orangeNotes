import { firestore } from "@services/firebase";
import { loginAccount, getAccount } from "@services/firebase/account/get";
import snapshotNotes from "@services/firebase/notes/onSnapshot";
import snapshotTasks from "@services/firebase/tasks/onSnapshot";
import { Unsubscribe } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
export interface Task {
    id: string;
    content: string;
    completed: boolean;
    timestamp?: number | string;
}
interface TaskContext {
    tasks: Task[];
}

interface FirebaseContextProps {
    tasks: Task[];
}
interface FirebaseProps {
    children: ReactNode;
}

const defaultValues: FirebaseContextProps = {
    tasks: [
        // { content: "sdjsdaksjkd", completed: true, id: "348348394" },
        // { content: "asldakoaoa", completed: false, id: "saskasosaoa" },
        // { content: "apoapoaoskdjdjdj", completed: false, id: "348348394aososo" },
    ],
};

export const FirebaseContext = createContext<FirebaseContextProps>(defaultValues);

export const FirebaseProvider = ({ children }: FirebaseProps) => {
    const [tasks, updateTasks] = useState<Task[]>(defaultValues.tasks);

    useEffect(() => {
        snapshotTasks(firestore, updateTasks);
    });

    return (
        <FirebaseContext.Provider
            value={{
                tasks,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export interface Note {
    id: string;
    title: string;
    content: string;
    timestamp?: number | string;
    owner?: string;
}
interface NoteContext {
    myNotes: Note[]
    unsubscribe: Unsubscribe;
}

const noteDefaultValue: NoteContext = {
    myNotes: [],
    unsubscribe: () => { },
}

export const NoteContext = createContext<NoteContext>(noteDefaultValue);

export const NoteProvider = ({ children }: FirebaseProps) => {
    const [myNotes, updateState] = useState<Note[]>(noteDefaultValue.myNotes);
    let unsubscribe = () => { };

    useEffect(() => {
        unsubscribe = snapshotNotes(firestore, updateState);
    }, []);

    return <NoteContext.Provider
        value={{
            myNotes,
            unsubscribe,
        }}
    >
        {children}
    </NoteContext.Provider>
}

export interface Account {
    id: string;
    username: string;
    level: number;
    xp: number;
    challengers: number;
}

interface AccountContext {
    currentID: string;
    currentAccount: {
        data: Account,
        loading: boolean
    };
    isLogged: boolean;
    login: (username: string) => Promise<boolean>;
}

const accountDefaultValues: AccountContext = {
    currentID: "",
    currentAccount: {
        data: {
            id: "",
            username: "guest",
            level: 0,
            xp: 0,
            challengers: 0,
        },
        loading: false
    },
    isLogged: false,
    login: async (username: string) => true,
}

export const AccountContext = createContext<AccountContext>(accountDefaultValues);

export const AccountProvider = ({ children }: FirebaseProps) => {
    const [isLogged, updateLogginState] = useState<boolean>(false);
    const [currentAccount, updateAccount] = useState<{ data: Account, loading: boolean }>(accountDefaultValues.currentAccount);

    async function login(username: string) {
        updateAccount(oldState => ({ ...oldState, loading: true }));
        const account = await loginAccount(username)

        if (account) {
            localStorage.setItem("orange-note_local-account-id", account.id)
            updateAccount({ data: account, loading: false });
            updateLogginState(true)
            return true
        }
        updateAccount(oldState => ({ ...oldState, loading: false }));
        return false;
    }

    async function reload() {
        const accountID = localStorage.getItem("orange-note_local-account-id") || "";
        if (accountID !== "") {
            updateAccount(oldState => ({ ...oldState, loading: true }));
            let account = await getAccount(accountID);

            if (account) {
                updateAccount({ data: account, loading: false });
                updateLogginState(true)
                return;
            }

            updateAccount(oldState => ({ ...oldState, loading: false }));
        }
    }

    useEffect(() => {
        reload()
    }, [])
    return <AccountContext.Provider
        value={{
            currentID: currentAccount.data.id,
            currentAccount,
            isLogged,
            login,
        }}
    >
        {children}
    </AccountContext.Provider>
}
