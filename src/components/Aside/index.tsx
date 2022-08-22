import { Box, SimpleGrid } from "@chakra-ui/react";
import { HiHome } from "react-icons/hi";
import { NavMenuProps } from "../../@types";

export const Aside = ({ navItens }: NavMenuProps) => {
    return (
        <Box h="100vh" w={{ base: "60px", "2xl": "80px", "xl": "80px", lg: "80px", sm: "60px" }} bg="black" margin={0} padding={["2rem 1.25rem"]}>
            <SimpleGrid padding={0} justifyContent={"center"} alignItems={"center"} gap={8}>
                {navItens?.map((item, index) => {
                    return (
                        <Box>
                            <HiHome color="white" size={24} />
                        </Box>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
}