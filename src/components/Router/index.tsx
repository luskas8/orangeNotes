import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../config/routes.config";

export const Router = () => {
    return (
        <Box width="100%" height="100%">
            <Routes>
                {routes.map((route, index) => {
                    return <Route key={route.path} path={route.path} element={<route.component />}>
                        {
                            route.routes?.map((subroute) => {
                                return <Route key={subroute.path} path={subroute.path} element={<subroute.component />} />
                            })
                        }
                    </Route>
                })}
            </Routes>
        </Box>
    )
}
