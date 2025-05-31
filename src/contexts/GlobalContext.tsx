import { createContext, useContext, useState, type ReactNode } from "react";

type GlobalContextType = {
    isLoadingOverlay: boolean;
    setIsLoadingOverlay: (value: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType>({
    isLoadingOverlay: false,
    setIsLoadingOverlay: () => null,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);

    return (
        <GlobalContext.Provider
            value={{ isLoadingOverlay, setIsLoadingOverlay }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
