import { Box, Button, Container, Wrap } from "@chakra-ui/react";
import { NoteItem, Search } from "@components";
import { useFirebase } from "@hooks";
import { NavItensProps } from "@types";
import { useTranslation } from "react-i18next";
import { HiOutlinePlus } from "react-icons/hi";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

export const Notes = (props: NavItensProps) => {
    const { notes } = useFirebase();
    const { t } = useTranslation();
    const inChildRoute = useOutlet();
    const navigatate = useNavigate();

    function handleNewNote() {
        navigatate("/notes/new");
    }

    if (inChildRoute) {
        return <Outlet />
    }

    return (
        <Container
            position="relative"
            maxWidth="100%"
            width="100%"
            height={{ base: "calc(100vh - 56px)", md: "100vh" }}
        >
            <Search placeholderText={t('search_notes')} />
            <Wrap color={"white"}>
                {notes.map(note => <NoteItem key={note.id} {...note} />)}
            </Wrap>
            <Box
                position="absolute"
                boxSize={"56px"}
                bottom="56px"
                right="24px"
                borderRadius="50px"
            >
                <Button onClick={handleNewNote} borderRadius="inherit" width="100%" height="100%">
                    <HiOutlinePlus />
                </Button>
            </Box>
        </Container>
    )
}

export * from "./New";
