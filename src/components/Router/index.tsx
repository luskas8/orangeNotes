import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { NavItensProps } from "@types";
import { routes } from "@config/routes.config";

export const Router = () => {
    return (
        <Box width="100%" height="100%">
            <Routes>
                {routes.map(createRoute)}
            </Routes>
        </Box>
    )
}

function createRoute(route: NavItensProps) {
    return (
        <Route key={route.path} path={route.path} element={<route.component {...route} />}>
            {route.routes?.map(createRoute)}
        </Route>
    )
}
