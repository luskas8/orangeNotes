import { Box, Flex, useConst } from "@chakra-ui/react";
import { Navbar, Sidebar } from "@components/NavgationMenu";
import { routes } from "@config/routes.config";
import { useBreakpoint } from "@hooks";
import { NavItensProps } from "@types";
import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";

export const Router = () => {
    const navItens = useConst(routes);
    const { isMobile } = useBreakpoint();

    return (
        <Box width="100%" height="100%">
            <Flex flex="1" direction={isMobile ? "column" : "row"}>
                {isMobile ? (
                    <Navbar key={v4()} navItens={navItens} />
                ) : (
                    <Sidebar key={v4()} navItens={navItens} />
                )}
                <Routes>
                    {routes.map(createRoute)}
                </Routes>
            </Flex>
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
