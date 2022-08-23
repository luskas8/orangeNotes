import { Box, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NoteItem, Search } from "../../components";
import { useFirebase } from "../../hooks";

export const Notes = () => {
    const { notes } = useFirebase();
    const route = useLocation();
    const { t } = useTranslation();
    return (
        <Box width="100%" height="100%" color={"white"}>
            <Search placeholderText={t('search_notes')} />
            <Wrap padding="0 8px">
                {notes.map(note => <NoteItem  key={note.id} {...note}/>)}
            </Wrap>
        </Box>
    )
}

export * from "./New";
