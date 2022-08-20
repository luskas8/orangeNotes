import { Box, SimpleGrid } from "@chakra-ui/react"
import { HiHome } from "react-icons/hi"

export const Aside = () => {
    return (
        <Box h="100vh" w={{ lg: "80px", sm: "60px" }} bg="black" margin={0} padding={[10, 8]}>
            <SimpleGrid justifyContent={"center"} alignItems={"center"} gap={8}>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
                <Box padding={"10px"}>
                    <HiHome color="white" size={24} />
                </Box>
            </SimpleGrid>
        </Box>
    )
}