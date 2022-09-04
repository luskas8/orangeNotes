import { Box, Button } from "@chakra-ui/react"
import { useAccount, useLeavingGuard, useNavigation } from "@hooks"
import deleteNote from "@services/firebase/notes/delete"
import { NavItensProps } from "@types"
import levingNote from "@utils/leavingNote"
import { HTMLProps, MouseEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 } from "uuid"

export interface NavItemProps extends HTMLProps<HTMLDivElement>, NavItensProps {
    isLoading?: boolean;
}

export const NavItem = ({ itemLabel, icon, authorization, path, isExact, isLoading }: NavItemProps) => {
    const { isLogged } = useAccount();
    const [itemIsLoading, updateLoadingState] = useState<boolean>(false);
    const { useLeavingPage } = useLeavingGuard();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { setParam } = useNavigation();
    const isActive = path === pathname;

    if (authorization === "user" && !isLogged) {
        return null;
    }

    async function handleItemClick(e: MouseEvent<HTMLButtonElement>) {
        if (isLoading || itemIsLoading) {
            return;
        }
        if (itemLabel === "back") {
            setParam("")
            useLeavingPage(false);
            levingNote();
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
            setParam("")
            navigate("/notes");
            return;
        }

        navigate(path);
    }

    return (
        <Box as="li" role="none" listStyleType="none" key={v4()} color={isActive ? "orange.600" : "gray.600"} boxSize={{ base: "24px", md: "32px" }} minWidth="0px" margin="0px !important">
            <Button isLoading={isLoading || itemIsLoading} role="menuitem" minWidth="0px" bg="transparent" padding={{ base: "0", md: "5px" }} onClick={handleItemClick} width="100%" height="100%">
                {(!isLoading || !itemIsLoading) && icon}
            </Button>
        </Box>
    )
}
