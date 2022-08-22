import { createContext, ReactNode, useEffect } from "react";
import { initApp } from "../../services/firebase/init";

interface FirebaseProps {
    children: ReactNode;
}

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }: FirebaseProps) => {
    useEffect(() => {
        initApp();
    });

    return (
        <FirebaseContext.Provider
            value={null}
        >
            {children}
        </FirebaseContext.Provider>
    )
}