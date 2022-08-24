import { Box, HStack } from "@chakra-ui/react";
import { useNavigation } from "@hooks";
import { NavMenuProps } from "@types";
import { FiArrowLeft } from "react-icons/fi";
import { v4 } from "uuid";
import { NavItem, NavItemProps } from "../NavItem";

export const Navbar = ({ navItens }: NavMenuProps) => {
    const { disableNavigationBar } = useNavigation();

    if (disableNavigationBar) {
        const fakeItem: NavItemProps = {
            authorization: "guest",
            component: () => {},
            icon: <FiArrowLeft />,
            itemLabel: "back",
            path: "",
        }
        return (
            <Box w="100%" margin={0} padding={["1rem 1.25rem"]}>
                <HStack padding={0} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <NavItem key={v4()} {...fakeItem} />
                </HStack>
            </Box>
        )
    }

    return (
        <Box w="100%" margin={0} padding={["1rem 1.25rem"]}>
            <HStack padding={0} justifyContent={"center"} alignItems={"center"} gap="16">
                {navItens?.map((item) => {
                    return <NavItem key={v4()} {...item} />
                })}
            </HStack>
        </Box>
    )
}
