import { NewNote, Notes } from "@pages/Notes";
import { Pomodoro } from "@pages/Pomodoro";
import { Tasks } from "@pages/Tasks";
import { NavItensProps } from "@types";
import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";

export const routes: NavItensProps[] = [
    {
        path: "/",
        isExact: true,
        component: () => <Pomodoro/>,
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
                path: "new",
                component: () => <NewNote />,
                itemLabel: "new note",
                icon: <FaRegStickyNote />,
                authorization: "user",
                enables: ["nonavigationbar", "leavingguard"],
            }
        ]
    },
    {
        path: "/tasks",
        component: () => <Tasks />,
        itemLabel: "tasks",
        icon: <CgCheckR />,
        authorization: "user",
    },

]
