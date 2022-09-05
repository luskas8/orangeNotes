import { Box, Button, Center, Container, Flex, Text } from "@chakra-ui/react"
import { Input } from "@components/Input"
import { useAccount, useNote, useTask } from "@hooks"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { CgCheckR, CgSandClock } from "react-icons/cg";
import { FaGlobeAmericas, FaRegStickyNote } from "react-icons/fa";
import { useTranslation } from "react-i18next"

export const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("translation");
    const { login, logout, isLogged, currentAccount } = useAccount();
    const formRef = useRef<FormHandles>(null);

    const initialData = {
        username: ""
    }

    const handleSubmit = async (data: { username: string }) => {
        const { username } = data;

        if (!username || username === "") {
            formRef.current?.setErrors({ 'username': t('required') })
            return;
        }
        if (await login(username)) {
            navigate('/pomodoro');
        } else {
            formRef.current?.setErrors({ 'username': t('notFound') })
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
                <Form ref={formRef} initialData={initialData} onChange={() => formRef.current?.setErrors({})} onSubmit={handleSubmit}>
                    <Input
                        label={t('home_input_label')}
                        name="username"
                        _focusVisible={{}}
                        placeholder={t('home_input_placeholder')}
                    />
                    <Button
                        marginTop="1.25rem"
                        width="100%"
                        background="twitter.700"
                        _hover={{
                            background: "twitter.600"
                        }}
                        isLoading={currentAccount.loading}
                        type="submit"
                    >
                        {t("ready")}
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
                    {t("logout")}
                </Button>
            </Box>
            <Box marginTop="1.5rem" as="section" color="white">
                <Center as="h1" fontWeight="bold" fontSize="3xl">
                    {t('howToUse')}
                </Center>
                <Box as="div" id="">
                    <main>
                        <Flex padding="6px 0" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><FaGlobeAmericas /></Box>
                                <h2>{t("homepage")}</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">{t("homepage_about")}</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><CgSandClock /></Box>
                                <h2>{t("pomodoro")}</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">{t("pomodoro_about_1")}</Text>
                                <Text align="justify">{t("pomodoro_about_2")}</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><FaRegStickyNote /></Box>
                                <h2>{t("notes")}</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">{t("notes_about")}</Text>
                                <Text marginTop="3px" fontSize="smaller" align="justify" color="gray.600">*{t('need_account')}</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Box boxSize="24px"><CgCheckR /></Box>
                                <h2>{t("tasks")}</h2>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">{t("tasks_about_1")}</Text>
                                <Text align="justify">{t("tasks_about_2.one")} <b>{t("tasks_about_2.two")}</b>{t("tasks_about_2.three")}</Text>
                                <Text align="justify" >{t("tasks_about_3.one")} <b><i>{t("tasks_about_3.two")}</i></b></Text>
                                <Text marginTop="3px" fontSize="smaller" align="justify" color="gray.600">*{t('need_account')}</Text>
                            </Box>
                        </Flex>
                        <Flex marginTop="8px" padding="6px 0" borderTop="2px solid" borderTopColor="gray.500" as="article" gap="6px" alignItems="flex-start" direction={"column"}>
                            <Flex as="header" gap="6px" alignItems="center">
                                <Text as="h2" fontWeight="bold" color="yellow.400">{t("save")}</Text>
                            </Flex>
                            <Box as="main" fontSize="sm" color="whiteAlpha.900">
                                <Text align="justify">{t('save_about')}</Text>
                            </Box>
                        </Flex>
                    </main>
                </Box>
            </Box>
        </Container>
    )
}
