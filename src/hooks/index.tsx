import { useContext } from "react";
import { BreakpointContext } from "../contexts/breakpoint";
import { FirebaseContext } from "../contexts/firebase";

export const useFirebase = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        throw "Firebase cannot be used, please try again later!";
    }

    return context;
}

export const useBreakpoint = () => {
    const context = useContext(BreakpointContext);

    if (!context) {
        throw "Breakpoint cannot be used, please try again later!";
    }

    return context;
}