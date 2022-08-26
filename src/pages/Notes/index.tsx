import { Container, Wrap } from "@chakra-ui/react";
import { NewItem, NoteItem, Search } from "@components";
import { useFirebase } from "@hooks";
import { NavItensProps } from "@types";
import { useTranslation } from "react-i18next";
import { Outlet, useOutlet } from "react-router-dom";

export const Notes = (props: NavItensProps) => {
    const { notes } = useFirebase();
    const { t } = useTranslation();
    const inChildRoute = useOutlet();

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
            <NewItem to="/notes/new"/>
        </Container>
    )
}

export * from "./New";
