import { useBreakpoint } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";

interface BreakpointContextProps {
    isMobile: boolean;
}

interface BreakpointProviderProps {
    children: ReactNode;
}

const defaultValues: BreakpointContextProps = {
    isMobile: true,
}

export const BreakpointContext = createContext<BreakpointContextProps>(defaultValues);

export const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === "sm" || breakpoint === "base";
    return (
        <BreakpointContext.Provider
            value={{
                isMobile
            }}
        >
            {children}
        </BreakpointContext.Provider>
    )
}
