import { Box, HStack } from "@chakra-ui/react";
import { HiHome } from "react-icons/hi";
import { NavMenuProps } from "../../@types";



export const Navbar = ({ navItens }: NavMenuProps) => {
    return (
        <Box property="" w="100%" bg="black" margin={0} padding={["1rem 1.25rem"]}>
            <HStack padding={0} justifyContent={"center"} alignItems={"center"} gap={8}>
                {navItens?.map((item, index) => {
                    return (
                        <Box>
                            <HiHome color="white" size={24} />
                        </Box>
                    )
                })}
            </HStack>
        </Box>
    )
}