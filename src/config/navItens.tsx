import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaRegStickyNote } from "react-icons/fa";
import { NavItensProps } from "../@types";

export const itens: Array<NavItensProps> = [
    {
        itemLabel: "pomodoro",
        icon: <CgSandClock />,
        authorization: "guest",
    },
    {
        itemLabel: "notes",
        icon: <FaRegStickyNote />,
        authorization: "user",
    },
    {
        itemLabel: "checklists",
        icon: <CgCheckR />,
        authorization: "user",
    }
]