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
        component: (props: NavItensProps) => <Pomodoro {...props}/>,
        itemLabel: "Index",
        icon: <FaGlobeAmericas />,
        authorization: "guest",
        enables: ["navigationbar"],
    },
    {
        path: "/pomodoro",
        component: (props: NavItensProps) => <Pomodoro {...props}/>,
        itemLabel: "pomodoro",
        icon: <CgSandClock />,
        authorization: "guest",
        enables: ["navigationbar"],
    },
    {
        path: "/notes",
        component: (props: NavItensProps) => <Notes {...props}/>,
        itemLabel: "notes",
        icon: <FaRegStickyNote />,
        authorization: "user",
        enables: ["navigationbar"],
        routes: [
            {
                path: "new",
                component: (props: NavItensProps) => <NewNote {...props}/>,
                itemLabel: "new note",
                icon: <FaRegStickyNote />,
                authorization: "user",
            }
        ]
    },
    {
        path: "/tasks",
        component: (props: NavItensProps) => <Tasks {...props}/>,
        itemLabel: "tasks",
        icon: <CgCheckR />,
        authorization: "user",
        enables: ["navigationbar"],
    },

]
