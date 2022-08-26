import { Box } from "@chakra-ui/react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import { useNavigation } from "@hooks";
import addNote from "@services/firebase/notes/add";
import updateNote from "@services/firebase/notes/update";
import { NavItensProps } from "@types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";

export interface FormProps {
    title: string;
    content: string;
}

export const NewNote = (props: NavItensProps) => {
    const [timeoutID, updateTimeoutID] = useState<NodeJS.Timeout | null>(null);
    const [currentID, setID] = useState<string | null>(null);
    const formRef = useRef<FormHandles>(null)

    function converter(): FormProps | Note {
        let data: any = formRef.current?.getData();

        return currentID ? { id: currentID, title: data.title, content: data.content } : { title: data.title, content: data.content };
    }

    function debounce() {
        if (timeoutID) {
            clearInterval(timeoutID);
        }
        updateTimeoutID(setTimeout(() => saveData(), 1500));
    }

    async function saveData() {
        console.log("CHEGOU")
        const data = converter();

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
                onSubmit={() => {}}
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
