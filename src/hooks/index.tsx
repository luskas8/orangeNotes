import { useContext } from "react";
import { BreakpointContext } from "@contexts/breakpoint";
import { AccountContext, FirebaseContext, NoteContext, TaskContext } from "@contexts/firebase";
import { NavigationContext } from "@contexts/navigation";
import { LeavingGuardContext } from "@contexts";

export const useFirebase = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        throw "Firebase cannot be used, please try again later!";
    }

    return context;
}

export const useAccount = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw "Account cannot be used, please try again later!";
    }

    return context;
}

export const useNote = () => {
    const context = useContext(NoteContext);

    if (!context) {
        throw "Note cannot be accessed, please try again later!";
    }

    return context;
}

export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw "Task cannot be accessed, please try again later!";
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

export const useNavigation = () => {
    const context = useContext(NavigationContext);

    if (!context) {
        throw "Navgation cannot be used, please try again later!";
    }

    return context;
}
export const useLeavingGuard = () => {
    const context = useContext(LeavingGuardContext);

    if (!context) {
        throw "Leaving Guard cannot be used, please try again later!";
    }

    return context;
}
