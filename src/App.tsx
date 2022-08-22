import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { v4 } from "uuid";
import { FirebaseProvider } from "./contexts/firebase";
import { Platform } from "./layouts/Platform";
import { theme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <Router>
          <Platform key={v4()} />
        </Router>
      </FirebaseProvider>
    </ChakraProvider>
  )
}

export default App
