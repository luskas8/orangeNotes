import { HTMLProps } from "react";
export interface NavItensProps {
    itemLabel: string;
    icon: ReactNode;
    authorization: authorization,
}

export interface NavMenuProps extends HTMLProps<HTMLDivElement> {
    navItens?: NavItensProps[];
}