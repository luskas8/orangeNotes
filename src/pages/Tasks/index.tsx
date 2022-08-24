import { Box, Button, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { HiOutlinePlus } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { Search } from "../../components";

export const Tasks = () => {
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
            <Box
                position="absolute"
                boxSize={"56px"}
                bottom="56px"
                right="24px"
                borderRadius="50px"
            >
                <Button borderRadius="inherit" width="100%" height="100%">
                    <HiOutlinePlus />
                </Button>
            </Box>
        </Container>
    )
}
