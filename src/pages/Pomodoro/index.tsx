import { NavItensProps } from "@types";
import { useLocation } from "react-router-dom";

export const Pomodoro = (props: NavItensProps) => {
    const route = useLocation();

    return <h1>{route.pathname}</h1>
}
