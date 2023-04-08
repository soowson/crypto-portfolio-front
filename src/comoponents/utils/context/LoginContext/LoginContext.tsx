import {createContext} from "react";

interface loginContextType {
    token: string | undefined;
    onLogin: () => void;
}

export const LoginContext = createContext<loginContextType>({
    token: undefined,
    onLogin: () => {
    }
});
