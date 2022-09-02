import { Box, Flex } from "@chakra-ui/react";
import { NavItem } from "@components";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import { useNavigation } from "@hooks";
import addNote from "@services/firebase/notes/add";
import updateNote from "@services/firebase/notes/update";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export interface FormProps {
    title: string;
    content: string;
}

export const NewNote = () => {
    const [isLoading, updateLoading] = useState<boolean>(false);
    const [timeoutID, updateTimeoutID] = useState<NodeJS.Timeout | null>(null);
    const [currentID, setID] = useState<string | null>(null);
    const formRef = useRef<FormHandles>(null);
    const { registerNavItens } = useNavigation();

    function saveLocal(data: Note) {
        localStorage.setItem("orange-note_local-note-title", data.title);
        localStorage.setItem("orange-note_local-note-content", data.content);

        if (data.id !== "") {
            localStorage.setItem("orange-note_local-note-id", data.id);
        }
    }

    function converter(): Note | FormProps {
        let data: any = formRef.current?.getData();

        return currentID ? { id: currentID, title: data.title, content: data.content } : { title: data.title, content: data.content };
    }

    function debounce() {
        const data = converter();
        saveLocal({ id: currentID || "", ...data });

        if (timeoutID) {
            clearTimeout(timeoutID);
            localStorage.removeItem("orange-notes_timeout-id");
        }
        const tempTimeoutID = setTimeout(() => saveData(data), 1500);
        localStorage.setItem("orange-notes_timeout-id", tempTimeoutID.toString());
        updateTimeoutID(tempTimeoutID);
    }

    async function saveData(data: FormProps) {
        updateLoading(true);
        if (currentID) {
            await updateNote({ id: currentID, ...data })
        } else {
            setID(await addNote(data));
        }
        updateLoading(false);
    }

    const inicialData: FormProps = {
        title: "",
        content: "",
    }

    useEffect(() => {
        registerNavItens([
            {
                authorization: "guest",
                component: () => { },
                icon: <FiArrowLeft />,
                itemLabel: "back",
                path: "",
                isLoading: isLoading
            }
        ])
    }, [isLoading])

    return (
        <Box padding={{ md: "1.5rem 0" }} color={"white"} width="100%">
            <Flex display={{ base: "none", md: "inherit" }} height="48px" alignItems="center">
                <NavItem
                    authorization="guest"
                    component={() => { }}
                    icon={<FiArrowLeft />}
                    itemLabel="back"
                    path=""
                    isLoading={isLoading}
                />
            </Flex>
            <Form
                ref={formRef}
                onChange={debounce}
                onSubmit={() => { }}
                initialData={inicialData}
            >
                <Input
                    name="title"
                    _focusVisible={{}}
                />
                <Textarea
                    height="100%"
                    _focusVisible={{}}
                    name="content"
                />
            </Form>
        </Box>
    )
}
