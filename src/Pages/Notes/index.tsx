import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Search } from "../../components";

export const Notes = () => {
    const route = useLocation();
    const { t } = useTranslation();

    return (
        <>
            <Search placeholderText={t('search_notes')} />
            <h1>{route.pathname}</h1>
        </>
    )
}

export * from "./New";
