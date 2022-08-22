import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";
import { NavItensProps } from "../@types";
import { Tasks } from "../Pages/Tasks";
import { NewNote, Notes } from "../Pages/Notes";
import { Pomodoro } from "../Pages/Pomodoro";

export const routes: NavItensProps[] = [
    {
        path: "/",
        isExact: true,
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
        routes: [
            {
                path: "/notes/new",
                component: () => <NewNote />,
                itemLabel: "new note",
                icon: <FaRegStickyNote />,
                authorization: "user",
            }
        ]
    },
    {
        path: "/checks",
        component: () => <Tasks />,
        itemLabel: "checks",
        icon: <CgCheckR />,
        authorization: "user",
    },

]
