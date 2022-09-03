import { Box, Button, Container } from "@chakra-ui/react"
import { Input } from "@components/Input"
import { useAccount } from "@hooks"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();
    const { login, isLogged, currentAccount } = useAccount();
    const formRef = useRef<FormHandles>(null);

    const initialData = {
        username: ""
    }

    const handleSubmit = async () => {
        const { username } = formRef.current!.getData();

        if (await login(username)) {
            navigate('/pomodoro');
        } else {
            formRef.current?.setErrors({ 'username': 'User not find' })
        }
    }

    return (
        <Container padding={{ base: "2rem 1.5rem", md: "2rem 0" }}>
            <Box display={isLogged ? "none" : "inherit"} color="white" as="section">
                <Form ref={formRef} initialData={initialData} onChange={() => formRef.current?.setErrors({})} onSubmit={() => { }}>
                    <Input
                        label="Que tal explorar ainda mais o aplicativo? Coloque como se chama e fazemos a mágica"
                        name="username"
                        _focusVisible={{}}
                        placeholder={"username"}
                    />
                    <Button
                        marginTop="1.25rem"
                        width="100%"
                        background="twitter.700"
                        _hover={{
                            background: "twitter.600"
                        }}
                        isLoading={currentAccount.loading}
                        type="button"
                        onClick={handleSubmit}
                    >
                        {"Pronto"}
                    </Button>
                </Form>
            </Box>
            <Box as="section">
                <h1>how to use</h1>
            </Box>
        </Container>
    )
}
