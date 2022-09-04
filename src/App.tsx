import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider, BreakpointProvider, FirebaseProvider, LeavingGuardProvider, NavigationProvider } from "@contexts";
import { BrowserRouter as Router } from "react-router-dom";
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

export default App
