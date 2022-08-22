import { ReactNode } from "react";
import { CgCheckR, CgSandClock } from "react-icons/cg"
import { FaRegStickyNote } from "react-icons/fa"
import { authorization } from "../@types";

interface NavItensProps {
    label: string;
    icon: ReactNode;
    authorization: authorization,
}
export const itens: Array<NavItensProps> = [
    {
        label: "pomodoro",
        icon: <CgSandClock />,
        authorization: "guest",
    },
    {
        label: "notes",
        icon: <FaRegStickyNote />,
        authorization: "user",
    },
    {
        label: "checklists",
        icon: <CgCheckR />,
        authorization: "user",
    }
]