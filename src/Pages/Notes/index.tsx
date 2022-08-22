import { useLocation } from "react-router-dom";
import { Search } from "../../components";

export const Notes = () => {
    const route = useLocation();

    return (
        <>
            <Search />
            <h1>{route.pathname}</h1>
        </>
    )
}