import { useContext } from "react";
import { FirebaseContext } from "../contexts/firebase";

export const useFirebase = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        throw "Firebase cannot be used, please try again later!";
    }

    return context;
}