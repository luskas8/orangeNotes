import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";
import { NavItensProps } from "../@types";
import { Checks } from "../Pages/Checks";
import { Notes } from "../Pages/Notes";
import { Pomodoro } from "../Pages/Pomodoro";

export const routes: NavItensProps[] = [
    {
        path: "/",
        isExact: true,
        redirect: "/pomodoro",
        component: () => <Pomodoro />,
        itemLabel: "Index",
        icon: <FaGlobeAmericas />,
        authorization: "guest",
    },
    {
        path: "/pomodoro",
        component: () => <Pomodoro />,
        itemLabel: "pomodoro",
        icon: <CgSandClock />,
        authorization: "guest",
    },
    {
        path: "/notes",
        component: () => <Notes />,
        itemLabel: "notes",
        icon: <FaRegStickyNote />,
        authorization: "user",
    },
    {
        path: "/checks",
        component: () => <Checks />,
        itemLabel: "checks",
        icon: <CgCheckR />,
        authorization: "user",
    },

]