import { Container, Grid } from "@chakra-ui/react";
import { NewItem, Search } from "@components";
import { TaskItem } from "@components/TaskItem";
import { useFirebase } from "@hooks";
import { NavItensProps } from "@types";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const Tasks = () => {
    const { tasks } = useFirebase();
    const route = useLocation();
    const { t } = useTranslation();

    return (
        <Container
            position="relative"
            maxWidth="100%"
            width="100%"
            height={{ base: "calc(100vh - 56px)", md: "100vh" }}
        >
            {/* <Search placeholderText={t('search_notes')} value="" handleOnChange={() => {}} /> */}
            <Grid padding="0 8px" color={"white"}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </Grid>
            <NewItem to="/" />
        </Container>
    )
}
