import { Box, Checkbox, Flex, GridItem } from "@chakra-ui/react";
import { Task } from "../../contexts";

export const TaskItem = (task: Task) => {
    return (
        <GridItem key={task.id}>
            <Flex
                as="article"
                gap="8px"
                padding="5px 12px"
                // bg={"gray.500"}
                borderBottom="1px solid white"
                _last={{
                    borderBottomColor: "transparent",
                }}
            >
                <Checkbox checked={task.completed} />
                <Box as="p">{task.content}</Box>
            </Flex>
        </GridItem>
    );
};