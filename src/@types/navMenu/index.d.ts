import { HTMLProps, ReactNode } from "react";
import { authorization } from "../authorization";

/** if present the route will use navigation bar */
export type NAVIGATION_BAR = "nonavigationbar";
/** if present the route is disabled */
export type DISABLED = "disabled";

export type Enables = NAVIGATION_BAR | DISABLED;
export interface NavItensProps {
    path: string;
    component: Function;
    itemLabel: string;
    icon: ReactNode;
    authorization: authorization;
    isExact?: boolean;
    routes?: NavItensProps[];
    enables?: Enables[];
}

export interface NavMenuProps extends HTMLProps<HTMLDivElement> {
    navItens?: NavItensProps[];
}
