import {createContext, type ReactNode, useContext, useState} from "react";

export type Language = "en" | "es";
export type LangText = Record<Language, string>;

const LanguageContext = createContext<{
    language: Language;
    toggleLanguage: () => void;
} | null>(null);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>("en");

    const toggleLanguage = () => {
        setLanguage(prev => (prev === "en" ? "es" : "en"));
    }

    return (
        <LanguageContext.Provider value={{language, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error(
            "useLanguage must be used within the context"
        )
    }
    return ctx;
}

