import { Box, Button, Flex, GridItem } from "@chakra-ui/react";
import { Checkbox } from "@components/Checkbox";
import { Input } from "@components/Input";
import { Task } from "@contexts";
import deleteTask from "@services/firebase/tasks/delete";
import updateTask from "@services/firebase/tasks/update";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { VscClose } from "react-icons/vsc";

interface FormProps {
    id: string;
    completed: boolean;
    content: string;
    timestamp?: number | string;
}

export const TaskItem = (task: Task) => {
    const [isDeleting, updateDeletingState] = useState<boolean>(false);
    const [isSaving, updateSavingState] = useState<boolean>(false);
    const [isEditing, updateEditingState] = useState<boolean>(false);
    const [inicialData, updateData] = useState<Task>(task);
    const [isHidden, updateHiddenState] = useState<boolean>(true);
    const formRef = useRef<FormHandles>(null);

    const handleChange = async (e: any) => {
        if (e.target.type === "checkbox") {
            const data = { ...inicialData, completed: e.target.checked }
            await handleSubmit(data)
        }

        if (formRef.current?.getFieldValue("content") !== inicialData.content) {
            updateEditingState(true);
            updateHiddenState(false);
        } else {
            updateEditingState(false);
            updateHiddenState(true);
        }
    }

    const handleSubmit = async (data: FormProps) => {
        updateSavingState(true);
        await updateTask(data);
        updateHiddenState(true);
        updateData(data);
        updateEditingState(false);
        updateSavingState(false);
    }

    const handleReset = () => {
        formRef.current?.setData(inicialData);
        updateData(inicialData);
        updateHiddenState(true);
        updateEditingState(false);
    }

    const handleDelete = async () => {
        updateDeletingState(true);
        await deleteTask(inicialData.id);
        updateDeletingState(false);
    }

    return (
        <GridItem
            key={task.id}
            _notLast={{
                borderBottom: "1px solid var(--chakra-colors-gray-700)"
            }}
        >
            <Form
                ref={formRef}
                onChange={handleChange}
                onSubmit={handleSubmit}
                initialData={inicialData}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Flex
                    as="article"
                    gap="8px"
                    w="100%"
                    padding="5px 12px"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Input name="id" type="hidden" />
                    <Checkbox
                        color={inicialData.completed ? "gray.600" : "inherit"}
                        isDisabled={isSaving || isDeleting || isEditing}
                        defaultChecked={inicialData.completed}
                        name="completed"
                    />
                    <Input
                        textDecoration={inicialData.completed ? "line-through" : "inherit"}
                        color={inicialData.completed ? "gray.600" : "inherit"}
                        isDisabled={isSaving || isDeleting}
                        name="content"
                        border="none"
                        bgColor="transparent"
                        _focusVisible={{}}
                    />
                </Flex>
                <Box display="flex" gap="6px">
                    <Button
                        boxSize="32px"
                        padding="0.5rem"
                        isDisabled={isDeleting}
                        hidden={!isHidden}
                        onClick={handleDelete}
                        type="button"
                        bg="red.700"
                        _hover={{
                            bg: "var(--chakra-colors-red-600)"
                        }}
                    >
                        <MdOutlineDelete />
                    </Button>
                    <Button
                        boxSize="40px"
                        padding="0.5rem"
                        isDisabled={isSaving}
                        hidden={isHidden}
                        type="submit"
                        bg="whatsapp.700"
                        _hover={{
                            bg: "var(--chakra-colors-whatsapp-600)"
                        }}
                    >
                        <BiCheck />
                    </Button>
                    <Button
                        boxSize="40px"
                        padding="0.5rem"
                        isDisabled={isSaving }
                        onClick={handleReset}
                        hidden={isHidden}
                        type="button"
                        bg="red.700"
                        _hover={{
                            bg: "var(--chakra-colors-red-600)"
                        }}
                    >
                        <VscClose />
                    </Button>
                </Box>
            </Form>
        </GridItem>
    );
};
