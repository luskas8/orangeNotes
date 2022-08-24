import getCurrentRoute from "@utils/getCurrentRoute";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";

export interface NavigationContextProps {
    enableNavigationBar: boolean;
    toogleNavigationState: (newState: boolean) => void;
}

interface NavigationProviderProps {
    children: ReactNode;
}

const defaultValues: NavigationContextProps = {
    enableNavigationBar: true,
    toogleNavigationState: (newState: boolean) => { },
}

export const NavigationContext = createContext<NavigationContextProps>(defaultValues);

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const { pathname } = useLocation();
    const [enableNavigationBar, toogleNavState] = useState<boolean>(defaultValues.enableNavigationBar);

    useEffect(() => {
        getCurrentRoute(pathname)
    }, [pathname])

    const toogleNavigationState = (newState: boolean) => {
        toogleNavState(newState);
    }

    return (
        <NavigationContext.Provider
            value={{
                enableNavigationBar,
                toogleNavigationState,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
