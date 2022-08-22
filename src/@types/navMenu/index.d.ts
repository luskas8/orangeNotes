import { HTMLProps, ReactNode } from "react";
import { authorization } from "../authorization";
export interface NavItensProps {
    path: string;
    component: Function;
    itemLabel: string;
    icon: ReactNode;
    authorization: authorization;
    isExact?: boolean,
    routes?: NavItensProps[],
}

export interface NavMenuProps extends HTMLProps<HTMLDivElement> {
    navItens?: NavItensProps[];
}
