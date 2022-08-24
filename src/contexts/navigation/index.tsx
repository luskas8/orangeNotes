import { NavItemProps } from "@components";
import getCurrentRoute from "@utils/getCurrentRoute";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export interface NavigationContextProps {
    currentRoute: NavItemProps | null;
    disableNavigationBar: boolean;
    toogleNavigationState: (newState: boolean) => void;
}

interface NavigationProviderProps {
    children: ReactNode;
}

const defaultValues: NavigationContextProps = {
    currentRoute: null,
    disableNavigationBar: false,
    toogleNavigationState: (newState: boolean) => { },
}

export const NavigationContext = createContext<NavigationContextProps>(defaultValues);

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const { pathname } = useLocation();
    const [currentRoute, updateRoute] = useState<NavItemProps | null>(getCurrentRoute(pathname));
    const [disableNavigationBar, toogleNavState] = useState<boolean>(defaultValues.disableNavigationBar);

    const toogleNavigationState = (newState: boolean) => {
        toogleNavState(newState);
    }

    useMemo(() => {
        updateRoute(getCurrentRoute(pathname))
    }, [pathname])

    useMemo(() => {
        if (currentRoute) {
            const { enables } = currentRoute;
            toogleNavState(enables !== undefined ? enables.includes("nonavigationbar") : false);
        }
    }, [currentRoute])

    return (
        <NavigationContext.Provider
            value={{
                currentRoute,
                disableNavigationBar,
                toogleNavigationState,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
