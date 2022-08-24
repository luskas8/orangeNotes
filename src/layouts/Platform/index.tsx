import { Box, Flex, useConst } from "@chakra-ui/react";
import { Navbar, Router, Sidebar } from "@components";
import { routes } from "@config/routes.config";
import { NavigationProvider } from "@contexts";
import { useBreakpoint } from "@hooks";
import { v4 } from "uuid";

export const Platform = () => {
    const navItens = useConst(routes);
    const { isMobile } = useBreakpoint();

    return (
        <Box
            w="100%"
            h="100vh"
            bgColor="blackAlpha.900"
        >
            <NavigationProvider>
                <Flex flex="1" direction={isMobile ? "column" : "row"}>
                    {isMobile ? (
                        <Navbar key={v4()} navItens={navItens} />
                    ) : (
                        <Sidebar key={v4()} navItens={navItens} />
                    )}
                    <Router />
                </Flex>
            </NavigationProvider>
        </Box>
    )
}
