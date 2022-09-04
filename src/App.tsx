import { ChakraProvider } from "@chakra-ui/react";
import { routes } from "@config/routes.config";
import { AccountProvider, BreakpointProvider, FirebaseProvider, LeavingGuardProvider, NavigationProvider } from "@contexts";
import { NavItensProps } from "@types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Platform } from "./layouts/Platform";
import './locates';
import { theme } from "./theme";

function App() {
    return (
        <Router>
            <ChakraProvider theme={theme}>
                <LeavingGuardProvider>
                    <AccountProvider>
                        <FirebaseProvider>
                            <BreakpointProvider>
                                <NavigationProvider>
                                    <Routes>
                                        {routes.map(createRoute)}
                                    </Routes>
                                    <Platform />
                                </NavigationProvider>
                            </BreakpointProvider>
                        </FirebaseProvider>
                    </AccountProvider>
                </LeavingGuardProvider>
            </ChakraProvider>
        </Router>
    )
}

function createRoute(route: NavItensProps) {
    return (
        <Route key={route.path} path={route.path} element={<route.component {...route} />}>
            {route.routes?.map(createRoute)}
        </Route>
    )
}

export default App
