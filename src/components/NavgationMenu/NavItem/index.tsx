import { Box, Button } from "@chakra-ui/react"
import { NavItensProps } from "@types"
import { HTMLProps } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { v4 } from "uuid"

export interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
}

export const NavItem = ({ itemLabel, icon, authorization, path, isExact }: NavItemProps) => {
    if (isExact) {
        return null;
    }

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isActive = path === pathname;

    function handleItemClick() {
        if (itemLabel === "back") {
            navigate(-1);
            return;
        }

        navigate(path);
    }

    return (
        <Box key={v4()} color={isActive ? "orange.600" : "gray.600"} width="24px" height="24px">
            <Button onClick={handleItemClick} width="100%" height="100%">
                {icon}
            </Button>
        </Box>
    )
}
