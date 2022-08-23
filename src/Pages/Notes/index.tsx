import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Search } from "../../components";
import { useFirebase } from "../../hooks";

export const Notes = () => {
    const { notes } = useFirebase();
    const route = useLocation();
    const { t } = useTranslation();
    // console.log(notes)
    return (
        <>
            <Search placeholderText={t('search_notes')} />
            {notes.map((note, index) => <h1 key={index}>{note.title}</h1>)}
        </>
    )
}

export * from "./New";
