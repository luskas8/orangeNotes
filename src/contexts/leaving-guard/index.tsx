import { useNavigation } from "@hooks";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

interface LeavingGuardContextProps {
    usingLeavingPage: boolean;
    useLeavingPage: Function;
}

interface LeavingGuardProps {
    children: ReactNode;
}

const defaultValues: LeavingGuardContextProps = {
    usingLeavingPage: false,
    useLeavingPage: () => { },
}

export const LeavingGuardContext = createContext<LeavingGuardContextProps>(defaultValues);

export const LeavingGuardProvider = ({ children }: LeavingGuardProps) => {
    const [usingLeavingPage, toggleLevingPageUsage] = useState<boolean>(false);

    const useLeavingPage = useCallback((newState: boolean) => {
        toggleLevingPageUsage(newState);
    }, [usingLeavingPage])

    return (
        <LeavingGuardContext.Provider
            value={{
                usingLeavingPage,
                useLeavingPage,
            }}
        >
            {children}
        </LeavingGuardContext.Provider>
    )
}
