import { Box } from "@chakra-ui/react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import { useNavigation } from "@hooks";
import getNote from "@services/firebase/notes/get";
import updateNote from "@services/firebase/notes/update";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

interface FormProps {
    id: string;
    title: string;
    content: string;
}

export const EditNote = () => {
    const params = useParams();
    const { setParam, registerNavItens } = useNavigation();
    const currentID = params.noteId!;
    const [timeoutID, updateTimeoutID] = useState<NodeJS.Timeout | null>(null);
    const [isLoading, updateLoading] = useState<boolean>(false);
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
        const tempTimeoutID = setTimeout(async () => {await saveData(data) }, 1500);
        localStorage.setItem("orange-notes_timeout-id", tempTimeoutID.toString());
        updateTimeoutID(tempTimeoutID);
    }

    async function saveData(data: FormProps) {
        updateLoading(true)
        await updateNote(data)
        updateLoading(false)
    }

    const inicialData: FormProps = {
        id: currentID,
        title: "",
        content: "",
    }

    useEffect(() => {
        setParam("noteId");
    }, [params.noteId]);

    useEffect(() => {
        if (currentID) {
            (async function fetchNote() {
                let data = await getNote(currentID);
                formRef.current?.setData({ ...data })
            })();
        }
    }, [currentID])

    useEffect(() => {
        registerNavItens([
            {
                authorization: "guest",
                component: () => { },
                icon: <FiArrowLeft />,
                itemLabel: "back",
                path: "",
                isLoading: isLoading
            },
            {
                authorization: "guest",
                component: () => { },
                icon: <MdOutlineDelete color={"var(--chakra-colors-red-700)"} />,
                itemLabel: "delete",
                path: "/notes",
                isLoading: isLoading
            }
        ])
    }, [isLoading])

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
