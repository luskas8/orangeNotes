import { HTMLProps, ReactNode } from "react";
export interface NavItensProps {
    path: string;
    component: Function;
    itemLabel: string;
    icon: ReactNode;
    authorization: authorization;
    isExact?: boolean
}

export interface NavMenuProps extends HTMLProps<HTMLDivElement> {
    navItens?: NavItensProps[];
}