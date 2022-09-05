import { Box } from "@chakra-ui/react";
import { Router } from "@components";

export const Platform = () => {
    return (
        <Box
            w="100%"
            minH="100vh"
            bgColor="blackAlpha.900"
        >
            <Router />
        </Box>
    )
}
