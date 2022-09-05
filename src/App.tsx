import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider, BreakpointProvider, LeavingGuardProvider, NavigationProvider } from "@contexts";
import { BrowserRouter as Router } from "react-router-dom";
import { Platform } from "./layouts/Platform";
import './locates';
import { theme } from "./theme";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <LeavingGuardProvider>
                <AccountProvider>
                    <BreakpointProvider>
                        <Router>
                            <NavigationProvider>
                                <Platform />
                            </NavigationProvider>
                        </Router>
                    </BreakpointProvider>
                </AccountProvider>
            </LeavingGuardProvider>
        </ChakraProvider>
    )
}

export default App
