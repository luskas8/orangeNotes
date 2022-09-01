import { Box, HStack } from "@chakra-ui/react";
import { useNavigation } from "@hooks";
import { NavMenuProps } from "@types";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";
import { NavItem, NavItemProps } from "../NavItem";

export const Navbar = ({ navItens }: NavMenuProps) => {
    const { disableNavigationBar, navigationItens } = useNavigation();
    const { t } = useTranslation('translation');

    if (disableNavigationBar) {
        const formNavItems: NavItemProps[] = navigationItens!;
        return (
            <Box as="nav" w="100%" margin={0} padding={["1rem 1.25rem"]}>
                <HStack as="ul" role="menubar" padding={0} justifyContent={"space-between"} alignItems={"flex-start"}>
                    {formNavItems?.map((item) => {
                        return <NavItem key={v4()} {...item} />
                    })}
                </HStack>
            </Box>
        )
    }

    return (
        <Box as="nav" w="100%" margin={0} padding={["1rem 1.25rem"]}>
            <HStack as="ul" role="menubar" padding={0} justifyContent={"center"} alignItems={"center"} gap="16">
                {navItens?.map((item) => {
                    return <NavItem key={v4()} {...item} />
                })}
            </HStack>
        </Box>
    )
}
