import { Box, SimpleGrid } from "@chakra-ui/react";
import { v4 } from "uuid";
import { NavMenuProps } from "../../../@types";
import { NavItem } from "../NavItem";

export const Sidebar = ({ navItens }: NavMenuProps) => {
    return (
        <Box h="100vh" margin={0} padding={["2rem 1.25rem"]}>
            <SimpleGrid padding={0} justifyContent={"center"} alignItems={"center"} gap={8}>
                {navItens?.map((item) => {
                    return <NavItem key={v4()} {...item} />
                })}
            </SimpleGrid>
        </Box>
    )
}