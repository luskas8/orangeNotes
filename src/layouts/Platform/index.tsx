import { Box, Flex, useConst } from "@chakra-ui/react";
import { v4 } from "uuid";
import { Navbar, Router, Sidebar } from "../../components";
import { routes } from "../../config/routes.config";
import { useBreakpoint } from "../../hooks";

export const Platform = () => {
    const navItens = useConst(routes);
    const { isMobile } = useBreakpoint();

    return (
        <Box
            w="100%"
            h="100vh"
            bgColor="blackAlpha.900"
        >
            <Flex flex="1" direction={isMobile ? "column" : "row"}>
                {isMobile ? (
                    <Navbar key={v4()} navItens={navItens} />
                ) : (
                    <Sidebar key={v4()} navItens={navItens} />
                )}
                <Router />
            </Flex>
        </Box>
    )
}