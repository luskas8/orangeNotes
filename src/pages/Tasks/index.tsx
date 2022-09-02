import { Container, Grid } from "@chakra-ui/react";
import { NewItem, Search } from "@components";
import { TaskItem } from "@components/TaskItem";
import { useFirebase } from "@hooks";
import { useTranslation } from "react-i18next";

export const Tasks = () => {
    const { tasks } = useFirebase();
    const { t } = useTranslation('translation');

    return (
        <Container
            position="relative"
            maxWidth="100%"
            width="100%"
            height={{ base: "calc(100vh - 56px)", md: "100vh" }}
        >
            <Search placeholderText={t('search_tasks')} value="" handleOnChange={() => { }} />
            <Grid padding="0 8px" color={"white"}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </Grid>
            <NewItem.Task />
        </Container>
    )
}
