import { HTMLProps } from "react";

export interface NavMenuProps extends HTMLProps<HTMLDivElement> {
    navItens?: ReactNode[];
}