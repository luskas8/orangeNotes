import { Container, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Search, TaskItem } from "../../components";
import { useFirebase } from "../../hooks";

export const Tasks = () => {
    const { tasks } = useFirebase();
    const { t } = useTranslation();

    return (
        <Container width="100%" height="100%">
            <Search placeholderText={t("search_notes")} />
            <Grid padding="0 8px" color={"white"}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </Grid>
        </Container>
    );
};