import { Container, Grid } from "@chakra-ui/react";
import { NewItem, Search } from "@components";
import { NoData } from "@components/NoData";
import { TaskItem } from "@components/TaskItem";
import { Task, TaskProvider } from "@contexts";
import { useNote, useTask } from "@hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Tasks = () => {
    const [filteredNotes, updateFilter] = useState<Task[]>([]);
    const [search, updateSearch] = useState<string>("");
    const { myTasks } = useTask();
    const { noteUnsubscribers } = useNote();
    const { t } = useTranslation('translation');

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        updateSearch(e.target.value);
    }

    useEffect(() => {
        let list: Task[] = [];
        if (search !== "") {
            myTasks.forEach(task => {
                let contentLower = task.content.toLocaleLowerCase();
                if (contentLower.includes(search)) {
                    list.push(task)
                }
            })
        }
        updateFilter(list);
    }, [search]);

    useEffect(() => {
        if (!!noteUnsubscribers) {
            noteUnsubscribers.forEach(unsubscribe => unsubscribe());
        }
    }, [])

    return (
        <Container
            position="relative"
            maxWidth="100%"
            width="100%"
            height={{ base: "calc(100vh - 56px)", md: "100vh" }}
        >
            <Search placeholderText={t('search_tasks')} value={search} handleOnChange={handleOnChange} />
            <Grid padding="0 8px" color={"white"}>
                {!!filteredNotes.length ? filteredNotes.map(note => <TaskItem key={note.id} {...note} />) :
                    !!search.length &&
                    <NoData type="tasksType" />
                }
                {!search.length && (!!myTasks.length ? myTasks.map((task) => <TaskItem key={task.id} {...task} />) : <NoData type="tasksType" />)}
            </Grid>
            <NewItem.Task />
        </Container>
    )
}

export const TaskPage = () => {
    return (
        <TaskProvider>
            <Tasks />
        </TaskProvider>
    )
}
