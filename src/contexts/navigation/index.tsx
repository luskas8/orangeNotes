import { NavItemProps } from "@components";
import { useLeavingGuard } from "@hooks";
import getCurrentRoute from "@utils/getCurrentRoute";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface NavigationContextProps {
    currentRoute: NavItemProps | null;
    disableNavigationBar: boolean;
    navigationItens: NavItemProps[] | null;
    registerNavItens: (navigationItens: NavItemProps[] | null) => void;
    setParam: (param: string) => void;
    toggleNavigationState: (newState: boolean) => void;
}

interface NavigationProviderProps {
    children: ReactNode;
}

const defaultValues: NavigationContextProps = {
    currentRoute: null,
    disableNavigationBar: false,
    navigationItens: null,
    registerNavItens: (navItens: NavItemProps[] | null) => { },
    setParam: (param: string) => { },
    toggleNavigationState: (newState: boolean) => { },
}

export const NavigationContext = createContext<NavigationContextProps>(defaultValues);

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const { pathname } = useLocation();
    const { useLeavingPage } = useLeavingGuard();
    const [param, setParam] = useState<string>("");
    const [currentRoute, updateRoute] = useState<NavItemProps | null>(getCurrentRoute(pathname, param));
    const [disableNavigationBar, toogleNavState] = useState<boolean>(defaultValues.disableNavigationBar);
    const [navigationItens, updateNavItens] = useState<NavItemProps[] | null>(defaultValues.navigationItens);

    const toggleNavigationState = (newState: boolean) => {
        toogleNavState(newState);
    }

    const registerNavItens = (navItens: NavItemProps[] | null) => {
        if (navItens !== null) {
            updateNavItens(navItens)
        } else {
            updateNavItens(null)
        }
    }

    useEffect(() => {
        updateRoute(getCurrentRoute(pathname, param))
    }, [pathname, param])

    useEffect(() => {
        if (currentRoute) {
            const { enables } = currentRoute;
            toogleNavState(enables !== undefined ? enables.includes("nonavigationbar") : false);
            useLeavingPage(enables !== undefined ? enables.includes("leavingguard") : false)
        }
    }, [currentRoute])

    return (
        <NavigationContext.Provider
            value={{
                currentRoute,
                disableNavigationBar,
                navigationItens,
                registerNavItens,
                setParam,
                toggleNavigationState,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
