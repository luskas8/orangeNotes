import { Center, Container, Flex, Grid, SimpleGrid, Wrap } from "@chakra-ui/react";
import { NewItem, NoteItem, Search } from "@components";
import { Note } from "@contexts";
import { useFirebase } from "@hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useOutlet } from "react-router-dom";

export const Notes = () => {
    const [filteredNotes, updateFilter] = useState<Note[]>([]);
    const [search, updateSearch] = useState<string>("");
    const { notes } = useFirebase();
    const { t } = useTranslation('translation');
    const inChildRoute = useOutlet();

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        updateSearch(e.target.value);
    }

    useEffect(() => {
        let list: Note[] = [];
        if (search !== "") {
            notes.forEach(note => {
                if (note.title.toLocaleLowerCase().includes(search) || note.content.toLocaleLowerCase().includes(search)) {
                    list.push(note)
                }
            })
        }
        updateFilter(list);
    }, [search])

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
            <Search placeholderText={t('search_notes')} value={search} handleOnChange={handleOnChange} />
            <SimpleGrid
                overflow="auto"
                minChildWidth={{base: "130px", md: "250px"}}
                spacing="8px"
                padding={{md: "0.5rem 1rem"}}
                color="white"
                maxH={{ base: "calc(100vh - 56px - 56px - 10px)", md: "calc(100vh - 56px - 16px)" }}
            >
                {!!filteredNotes.length ? filteredNotes.map(note => <NoteItem key={note.id} {...note} />) :
                    !!search.length &&
                    <Flex justifyContent="center" boxSize="100%">
                        <Container w="fit-content">No data</Container>
                    </Flex>}
                {!search.length && notes.map(note => <NoteItem key={note.id} {...note} />)}
            </SimpleGrid>
            <NewItem to="/notes/new" />
        </Container>
    )
}

export * from "./New";
export * from "./Edit";
