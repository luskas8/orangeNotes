import { Box, Flex } from "@chakra-ui/react";
import { NavItem } from "@components";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Note } from "@contexts";
import { useNavigation } from "@hooks";
import getNote from "@services/firebase/notes/get";
import updateNote from "@services/firebase/notes/update";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
    const [inicialData, updateInicialData] = useState<Note | null>(null);
    const formRef = useRef<FormHandles>(null);
    const { t } = useTranslation('translation');

    function saveLocal(data: Note) {
        localStorage.setItem("orange-note_local-note-title", data.title);
        localStorage.setItem("orange-note_local-note-content", data.content);
        localStorage.setItem("orange-note_local-note-id", data.id);
    }

    function converter(): Note | FormProps {
        let data: any = formRef.current?.getData();

        return { id: currentID, title: data.title, content: data.content };
    }

    function needsUpdate(data: Note) {
        if (
            data.title === inicialData!.title &&
            data.content === inicialData!.content
        ) {
            return false;
        }

        return true;
    }

    function debounce() {
        const data = converter();
        saveLocal(data);
        localStorage.setItem("orange-note_local-note-update", needsUpdate(data) ? "true" : "false");

        if (timeoutID) {
            clearTimeout(timeoutID);
            localStorage.removeItem("orange-notes_timeout-id");
        }
        const tempTimeoutID = setTimeout(async () => { await saveData(data) }, 1500);
        localStorage.setItem("orange-notes_timeout-id", tempTimeoutID.toString());
        updateTimeoutID(tempTimeoutID);
    }

    async function saveData(data: FormProps) {
        if (data.title === "" && data.content === "") {
            return;
        }

        // if not needs to update the note, ignore this
        if (!needsUpdate(data)) {
            return;
        }

        updateLoading(true)
        await updateNote(data)
        updateInicialData({...data})
        localStorage.setItem("orange-note_local-note-update", "false");
        updateLoading(false)
    }

    useEffect(() => {
        setParam("noteId");
    }, [params.noteId]);

    useEffect(() => {
        if (currentID) {
            updateLoading(true);
            (async function fetchNote() {
                let data = await getNote(currentID);
                formRef.current?.setData({ ...data })
                updateInicialData({...data!});
                saveLocal(data!)
                localStorage.setItem("orange-note_local-note-update", "false");
            })();
            updateLoading(false);
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
        <Box color={"white"} width="100%">
            <Flex
                display={{ base: "none", md: "flex" }}
                justifyContent="space-between"
                height="48px"
                alignItems="center"
            >
                <NavItem
                    authorization="guest"
                    component={() => { }}
                    icon={<FiArrowLeft />}
                    itemLabel="back"
                    path=""
                    isLoading={isLoading}
                />
                <NavItem
                    authorization="guest"
                    component={() => { }}
                    icon={<MdOutlineDelete color={"var(--chakra-colors-red-700)"} />}
                    itemLabel="delete"
                    path=""
                    isLoading={isLoading}
                />
            </Flex>
            <Form
                ref={formRef}
                onChange={debounce}
                onSubmit={() => { }}
                initialData={inicialData!}
            >
                <Input
                    name="title"
                    placeholder={t('title')}
                />
                <Textarea
                    name="content"
                    placeholder={t('note_typing')}
                />
            </Form>
        </Box>
    )
}
