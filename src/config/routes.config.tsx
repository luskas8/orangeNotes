import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";
import { NavItensProps } from "@types";
import { Tasks } from "@pages/Tasks";
import { NewNote, Notes } from "@pages/Notes";
import { Pomodoro } from "@pages/Pomodoro";

export const routes: NavItensProps[] = [
    {
        path: "/",
        isExact: true,
        component: () => <Pomodoro />,
        itemLabel: "Index",
        icon: <FaGlobeAmericas />,
        authorization: "guest",
        enables: ["navigationbar"],
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
