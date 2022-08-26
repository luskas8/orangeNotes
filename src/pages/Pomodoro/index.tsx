import { NavItensProps } from "@types";
import { useLocation } from "react-router-dom";

export const Pomodoro = () => {
    const route = useLocation();

    return <h1>{route.pathname}</h1>
}
