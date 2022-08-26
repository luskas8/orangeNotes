import { NavItemProps } from "@components";
import { useLeavingGuard } from "@hooks";
import getCurrentRoute from "@utils/getCurrentRoute";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export interface NavigationContextProps {
    currentRoute: NavItemProps | null;
    disableNavigationBar: boolean;
    toggleNavigationState: (newState: boolean) => void;
}

interface NavigationProviderProps {
    children: ReactNode;
}

const defaultValues: NavigationContextProps = {
    currentRoute: null,
    disableNavigationBar: false,
    toggleNavigationState: (newState: boolean) => { },
}

export const NavigationContext = createContext<NavigationContextProps>(defaultValues);

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const { pathname } = useLocation();
    // const { useLeavingPage } = useLeavingGuard();
    const [currentRoute, updateRoute] = useState<NavItemProps | null>(getCurrentRoute(pathname));
    const [disableNavigationBar, toogleNavState] = useState<boolean>(defaultValues.disableNavigationBar);

    const toggleNavigationState = (newState: boolean) => {
        toogleNavState(newState);
    }

    useMemo(() => {
        updateRoute(getCurrentRoute(pathname))
    }, [pathname])

    useEffect(() => {
        if (currentRoute) {
            const { enables } = currentRoute;
            toogleNavState(enables !== undefined ? enables.includes("nonavigationbar") : false);
            // useLeavingPage(enables !== undefined ? enables.includes("leavingguard") : false)
        }
    }, [currentRoute])

    return (
        <NavigationContext.Provider
            value={{
                currentRoute,
                disableNavigationBar,
                toggleNavigationState,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
