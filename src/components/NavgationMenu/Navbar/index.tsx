import { Box, HStack } from "@chakra-ui/react";
import { v4 } from "uuid";
import { NavMenuProps } from "../../../@types";
import { NavItem } from "../NavItem";

export const Navbar = ({ navItens }: NavMenuProps) => {
    return (
        <Box property="" w="100%" bg="black" margin={0} padding={["1rem 1.25rem"]}>
            <HStack padding={0} justifyContent={"center"} alignItems={"center"} gap={8}>
                {navItens?.map((item) => {
                    return <NavItem key={v4()} {...item} />
                })}
            </HStack>
        </Box>
    )
}