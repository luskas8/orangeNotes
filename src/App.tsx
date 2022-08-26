import { ChakraProvider } from "@chakra-ui/react";
import { BreakpointProvider, FirebaseProvider, LeavingGuardProvider, NavigationProvider } from "@contexts";
import { BrowserRouter as Router } from "react-router-dom";
import { Platform } from "./layouts/Platform";
import './locates';
import { theme } from "./theme";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <LeavingGuardProvider>
                <FirebaseProvider>
                    <BreakpointProvider>
                        <Router>
                            <NavigationProvider>
                                <Platform />
                            </NavigationProvider>
                        </Router>
                    </BreakpointProvider>
                </FirebaseProvider>
            </LeavingGuardProvider>
        </ChakraProvider>
    )
}

export default App
