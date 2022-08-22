import { Box } from "@chakra-ui/react"
import { HTMLProps } from "react"
import { v4 } from "uuid"
import { NavItensProps } from "../../../@types"

interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
}

export const NavItem = ({ itemLabel, icon, authorization }: NavItemProps) => {
    return (
        <Box key={v4()} color={{ base: "orange.600", md: "orange.500" }} width={{ md: "24px", base: "16px" }}>
            {icon}
        </Box>
    )
}