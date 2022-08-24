import { ChakraProvider } from "@chakra-ui/react";
import { BreakpointProvider, FirebaseProvider, NavigationProvider } from "@contexts";
import { BrowserRouter as Router } from "react-router-dom";
import { v4 } from "uuid";
import { Platform } from "./layouts/Platform";
import './locates';
import { theme } from "./theme";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <FirebaseProvider>
                <BreakpointProvider>
                    <Router>
                        <NavigationProvider>
                            <Platform key={v4()} />
                        </NavigationProvider>
                    </Router>
                </BreakpointProvider>
            </FirebaseProvider>
        </ChakraProvider>
    )
}

export default App
