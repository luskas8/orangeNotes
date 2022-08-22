import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Search } from "../../components";

export const Tasks = () => {
    const route = useLocation();
    const { t } = useTranslation();

    return (
        <>
            <Search placeholderText={t('search_tasks')} />
            <h1>{route.pathname}</h1>
        </>
    )
}