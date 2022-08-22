import { Box, useBreakpoint } from "@chakra-ui/react";
import { Aside, Navbar } from "../../components";

export const Platform = () => {
    const breakpoint = useBreakpoint();
    return (
        <Box
            bg="blackAlpha.700"
            w="100%"
            h="100vh"
        >
            {breakpoint === "sm" || breakpoint === "base" ? (
                <Navbar />
            ) : (
                <Aside />
            )}
        </Box>
    )
}