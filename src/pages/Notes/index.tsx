import { Container, Wrap } from "@chakra-ui/react";
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
    const { t } = useTranslation();
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
            <Search placeholderText={t('search_notes')} value={search} handleOnChange={handleOnChange} value={search} handleOnChange={handleOnChange} />
            <Wrap color={"white"}>
                {filteredNotes && filteredNotes.map(note => <NoteItem key={note.id} {...note} />)}
                {!filteredNotes.length && filteredNotes && filteredNotes.map(note => <NoteItem key={note.id} {...note} />)}
                {!filteredNotes.length && notes.map(note => <NoteItem key={note.id} {...note} />)}
            </Wrap>
            <NewItem to="/notes/new"  />
        </Container>
    )
}

export * from "./New";
