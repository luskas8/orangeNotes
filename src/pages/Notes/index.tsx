import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { NewItem, NoteItem, Search } from "@components";
import { NoData } from "@components/NoData";
import { Note, NoteProvider } from "@contexts";
import { useAccount, useNote, useTask } from "@hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useOutlet } from "react-router-dom";

const Notes = () => {
    const [filteredNotes, updateFilter] = useState<Note[]>([]);
    const [search, updateSearch] = useState<string>("");
    const { currentID } = useAccount();
    const { myNotes } = useNote();
    const { t } = useTranslation('translation');
    const inChildRoute = useOutlet();
    const { taskUnsubscribers } = useTask();

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        updateSearch(e.target.value);
    }

    useEffect(() => {
        let list: Note[] = [];
        if (search !== "") {
            myNotes.forEach(note => {
                if (note.owner !== currentID) {
                    return;
                }

                let titleLower = note.title ? note.title.toLocaleLowerCase() : ""
                let contentLower = note.content ? note.content.toLocaleLowerCase() : ""
                if (titleLower.includes(search) || contentLower.includes(search)) {
                    list.push(note)
                }
            })
        }
        updateFilter(list);
    }, [search]);

    useEffect(() => {
        if (!!taskUnsubscribers) {
            taskUnsubscribers.forEach(unsubscribe => unsubscribe());
        }
    }, [])

    if (inChildRoute) {
        return <Outlet />;
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
                minChildWidth={{ base: "130px", md: "250px" }}
                spacing="8px"
                padding={{ md: "0.5rem 1rem" }}
                color="white"
                maxH={{ base: "calc(100vh - 56px - 56px - 10px)", md: "calc(100vh - 56px - 16px)" }}
            >
                {!!filteredNotes.length ? filteredNotes.map(note => <NoteItem key={note.id} {...note} />) :
                    !!search.length &&
                    <NoData type="notesType" />
                }
                {!search.length && (!!myNotes.length ? myNotes.filter(note => note.owner == currentID).map(note => <NoteItem key={note.id} {...note} />) : <NoData type="notesType" />)}
            </SimpleGrid>
            <NewItem to="/notes/new" />
        </Container>
    )
}

export const NotePage = () => {
    return (
        <NoteProvider>
            <Notes />
        </NoteProvider>
    )
}

export * from "./Edit";
export * from "./New";

