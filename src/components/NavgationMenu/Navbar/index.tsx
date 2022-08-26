import { Box, HStack } from "@chakra-ui/react";
import { useNavigation } from "@hooks";
import { NavMenuProps } from "@types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { v4 } from "uuid";
import { NavItem, NavItemProps } from "../NavItem";

export const Navbar = ({ navItens }: NavMenuProps) => {
    const { disableNavigationBar, currentRoute } = useNavigation();
    const { t } = useTranslation();

    if (disableNavigationBar) {
        const formNavItems: NavItemProps[] = [
            {
                authorization: "guest",
                component: () => { },
                icon: <FiArrowLeft />,
                itemLabel: "back",
                path: "",
            },
            {
                authorization: "guest",
                component: () => { },
                icon: <MdOutlineDelete color={"var(--chakra-colors-red-700)"} />,
                itemLabel: "delete",
                path: "/notes",
            }
        ]
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
