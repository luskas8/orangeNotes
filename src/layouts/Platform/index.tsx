import { Box, useBreakpoint, useConst } from "@chakra-ui/react";
import { v4 } from "uuid";
import { Navbar, Sidebar } from "../../components";
import { itens } from "../../config/navItens";

export const Platform = () => {
    const breakpoint = useBreakpoint();
    const navItens = useConst(itens);

    return (
        <Box
            bg="blackAlpha.700"
            w="100%"
            h="100vh"
        >
            {breakpoint === "sm" || breakpoint === "base" ? (
                <Navbar key={v4()} navItens={navItens} />
            ) : (
                <Sidebar key={v4()} navItens={navItens} />
            )}
        </Box>
    )
}