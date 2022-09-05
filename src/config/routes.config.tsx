import { Home, EditNote, NewNote, NotePage, Pomodoro, TaskPage } from "@pages";
import { NavItensProps } from "@types";
import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";

export const routes: NavItensProps[] = [
    {
        path: "/",
        isExact: true,
        component: () => <Home />,
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
        component: () => <NotePage />,
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
            },
            {
                path: ":noteId",
                component: () => <EditNote />,
                itemLabel: "edit note",
                icon: <FaRegStickyNote />,
                authorization: "user",
                enables: ["nonavigationbar", "leavingguard"],
            }
        ]
    },
    {
        path: "/tasks",
        component: () => <TaskPage />,
        itemLabel: "tasks",
        icon: <CgCheckR />,
        authorization: "user",
    },
]
