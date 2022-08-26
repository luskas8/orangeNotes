import { Box, Button } from "@chakra-ui/react"
import { useLeavingGuard } from "@hooks"
import deleteNote from "@services/firebase/notes/delete"
import { NavItensProps } from "@types"
import levingNote from "@utils/leavingNote"
import { HTMLProps, MouseEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 } from "uuid"

export interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
}

export const NavItem = ({ itemLabel, icon, authorization, path, isExact }: NavItemProps) => {
    if (isExact) {
        return null;
    }

    const [isLoading, updateLoadingState] = useState<boolean>(false);
    const { usingLeavingPage, useLeavingPage } = useLeavingGuard();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isActive = path === pathname;

    async function handleItemClick(e: MouseEvent<HTMLButtonElement>) {
        if (itemLabel === "back") {
            if (usingLeavingPage) {
                useLeavingPage(false);
                levingNote();
            }

            navigate(-1);
            return;
        }

        if (itemLabel === "delete") {
            updateLoadingState(true);
            const id = localStorage.getItem("orange-note_local-note-id") || "";
            if (id !== "") {
                await deleteNote(id);
            }
            updateLoadingState(false);
            navigate(path);
            return;
        }


        navigate(path);
    }

    return (
        <Box as="li" role="none" listStyleType="none" key={v4()} color={isActive ? "orange.600" : "gray.600"} boxSize={{ base: "24px", md: "32px" }} minWidth="0px" margin="0px !important">
            <Button isLoading={isLoading} role="menuitem" minWidth="0px" bg="transparent" padding={{ base: "0", md: "5px" }} onClick={handleItemClick} width="100%" height="100%">
                {!isLoading && icon}
            </Button>
        </Box>
    )
}
