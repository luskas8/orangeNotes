import { Box } from "@chakra-ui/react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import { useNavigation } from "@hooks";
import addNote from "@services/firebase/notes/add";
import getNote from "@services/firebase/notes/get";
import updateNote from "@services/firebase/notes/update";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface FormProps {
    id: string;
    title: string;
    content: string;
}

export const EditNote = () => {
    const params = useParams();
    const { setParam } = useNavigation();
    const currentID = params.noteId!;
    const [timeoutID, updateTimeoutID] = useState<NodeJS.Timeout | null>(null);
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

        return { id: currentID, title: data.title, content: data.content };
    }

    function debounce() {
        const data = converter();
        saveLocal(data);

        if (timeoutID) {
            clearTimeout(timeoutID);
            localStorage.removeItem("orange-notes_timeout-id");
        }
        const tempTimeoutID = setTimeout(() => saveData(data), 1500);
        localStorage.setItem("orange-notes_timeout-id", tempTimeoutID.toString());
        updateTimeoutID(tempTimeoutID);
    }

    async function saveData(data: FormProps) {
        await updateNote(data)
    }

    const inicialData: FormProps = {
        id: currentID,
        title: "",
        content: "",
    }

    useEffect(() => {
        setParam("noteId");
    }, []);

    useEffect(() => {
        if (currentID) {
            (async function fetchNote() {
                let data = await getNote(currentID);
                console.log(data)
                formRef.current?.setData({...data})
            })();
        }
    }, [])

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
