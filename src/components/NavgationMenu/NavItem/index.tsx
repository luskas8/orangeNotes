import { Box } from "@chakra-ui/react"
import { NavItensProps } from "@types"
import { HTMLProps } from "react"
import { Link, useLocation } from "react-router-dom"
import { v4 } from "uuid"

interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
}

export const NavItem = ({ itemLabel, icon, authorization, path, isExact }: NavItemProps) => {
    if (isExact) {
        return null;
    }

    const { pathname } = useLocation();
    const isActive = path === pathname;
    return (
        <Box key={v4()} color={isActive ? "orange.600" : "gray.600"} width="24px">
            <Link to={path}>
                {icon}
            </Link>
        </Box>
    )
}
