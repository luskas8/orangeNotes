import { Box } from "@chakra-ui/react"
import { HTMLProps } from "react"
import { Link } from "react-router-dom"
import { v4 } from "uuid"
import { NavItensProps } from "../../../@types"

interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
}

export const NavItem = ({ itemLabel, icon, authorization, path, isExact }: NavItemProps) => {
    if (isExact) {
        return null;
    }
    return (
        <Box key={v4()} color={{ base: "orange.600", md: "orange.500" }} width={{ md: "24px", base: "16px" }}>
            <Link to={path}>
                {icon}
            </Link>
        </Box>
    )
}