import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";

export const LanguageButton = () => {
    const {language, toggleLanguage} = useLanguage();
    return (
        <button
            style={{
                flex: 1,
                fontSize: "1rem",
                border: "none",
                borderRight: "1px solid white",
                cursor: "pointer",
                backgroundColor: "#0071ff",
                color: "white",
            }}
            onClick={toggleLanguage}
        >
            {text[language].language}
        </button>
    )
}