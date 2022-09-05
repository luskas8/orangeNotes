import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import { Input } from "@components/Input"
import { useAccount, useNote, useTask } from "@hooks"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";

export const Home = () => {
    const navigate = useNavigate();
    const { login, logout, isLogged, currentAccount } = useAccount();
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

    const { noteUnsubscribers } = useNote();
    const { taskUnsubscribers } = useTask();

    useEffect(() => {
        if (!!noteUnsubscribers) {
            noteUnsubscribers.forEach(unsubscribe => unsubscribe());
        }
        if (!!taskUnsubscribers) {
            taskUnsubscribers.forEach(unsubscribe => unsubscribe());
        }
    }, [])

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
            <Box display={!isLogged ? "none" : "inherit"} color="white" as="section">
                <Button
                    marginTop="1.25rem"
                    width="100%"
                    background="red.700"
                    _hover={{
                        background: "red.600"
                    }}
                    isLoading={currentAccount.loading}
                    type="button"
                    onClick={logout}
                >
                    {"loggout"}
                </Button>
            </Box>
            <Box as="section" color="white">
                <h1>how to use</h1>
                <Box as="div" id="">
                    <header><h1>Páginas</h1></header>
                    <main>
                        <Flex padding="6px 0" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><FaGlobeAmericas /></Box>
                                <h2>Página inicial</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">Onde você está, aqui pode entender melhor o funcionamento do aplicativo</Text>
                                <Text align="justify">e ter algumas configuraões da conta</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><CgSandClock /></Box>
                                <h2>Relógio de Pomodoro</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">Um relógio para te ajudar a focar em suas atividades do dia a dia</Text>
                                <Text align="justify">Que tal dar uma olhada, e quem sabe não se interesse em ter uma conta conosco</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><FaRegStickyNote /></Box>
                                <h2>Bloco de notas</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">Que tal organizar suas ideias e anotações em bloquinhos para não se esquecer</Text>
                                <Text align="justify">ou então anotar aquela receita</Text>
                                <Text marginTop="3px" fontSize="smaller" align="justify" color="gray.600">*Necessário ter uma conta conosco</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><CgCheckR /></Box>
                                <h2>Lista de tarefas</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">Organização de ideias legal, mas aqui que tal fazer aquela famosa lista de afazeres?</Text>
                                <Text align="justify">Colocar aquelas metas para ter a satisfação de cumprir e marcar como <b>FEITO!</b>; as tarefas da escola, trabalho ou faculdade</Text>
                                <Text align="justify" >então é <b><i>#AquiMesmo!</i></b></Text>
                                <Text marginTop="3px" fontSize="smaller" align="justify" color="gray.600">*Necessário ter uma conta conosco</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Text as="h2" fontWeight="bold" color="yellow.400">Será que está salvo?</Text>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">Salvamos conforme você vai digirando (isso mesmo, em tempo real), então sim está ficando salvo</Text>
                            </Box>
                        </Flex>
                    </main>
                </Box>
            </Box>
        </Container>
    )
}
