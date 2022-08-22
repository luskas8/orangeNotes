import { useLocation } from "react-router-dom"

export const Notes = () => {
    const route = useLocation();

    return <h1>{route.pathname}</h1>
}