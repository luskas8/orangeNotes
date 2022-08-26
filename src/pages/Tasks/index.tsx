import { Box, Button, Container } from "@chakra-ui/react";
import { NewItem, Search } from "@components";
import { NavItensProps } from "@types";
import { useTranslation } from "react-i18next";
import { HiOutlinePlus } from "react-icons/hi";
import { useLocation } from "react-router-dom";

export const Tasks = (props: NavItensProps) => {
    const route = useLocation();
    const { t } = useTranslation();

    return (
        <Container
            position="relative"
            maxWidth="100%"
            width="100%"
            height={{ base: "calc(100vh - 56px)", md: "100vh" }}
        >
            <Search placeholderText={t('search_notes')} />
            {/* TASKS LIST */}
            <NewItem to="/"/>
        </Container>
    )
}
