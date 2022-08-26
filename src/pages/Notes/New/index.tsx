import { Box } from "@chakra-ui/react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import addNote from "@services/firebase/notes/add";
import updateNote from "@services/firebase/notes/update";
import { NavItensProps } from "@types";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";

export interface FormProps {
    title: string;
    content: string;
}

export const NewNote = () => {
    const [timeoutID, updateTimeoutID] = useState<NodeJS.Timeout | null>(null);
    const [currentID, setID] = useState<string | null>(null);
    const formRef = useRef<FormHandles>(null);

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
        if (currentID) {
            await updateNote({ id: currentID, ...data })
        } else {
            setID(await addNote(data));
        }
    }

    const inicialData: FormProps = {
        title: "",
        content: "",
    }

    return (
        <Box color={"white"}>
            <Form
                ref={formRef}
                onChange={debounce}
                onSubmit={() => { }}
                initialData={inicialData}
            >
                <Input
                    name="title"
                />
                <Textarea
                    name="content"
                />
            </Form>
        </Box>
    )
}
