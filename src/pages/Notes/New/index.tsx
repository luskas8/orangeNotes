import { Box } from "@chakra-ui/react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { NavItensProps } from "@types";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useRef } from "react";

interface FormProps {
    title: string;
    content: string;
}

export const NewNote = (props: NavItensProps) => {
    const formRef = useRef<FormHandles>(null)

    const handleSubmit: SubmitHandler<FormProps> = data => {
        console.log(formRef.current?.getData())
    }

    const inicialData: FormProps = {
        title: "",
        content: "",
    }


    return (
        <Box color={"white"}>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={inicialData}>
                <Input
                    name="title"
                />
                <Textarea
                    name="content"
                />
                <Box onClick={() => formRef.current?.submitForm()}>Click</Box>
            </Form>
        </Box>
    )
}
