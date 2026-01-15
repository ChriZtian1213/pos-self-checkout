import React from "react";
import {text} from "~/i18n/text";
import {useLanguage} from "~/state/LanguageContext";

interface NumpadProps {
    pluInput: string;
    setPluInput: (plu: string) => void;
}

export const Numpad: React.FC<NumpadProps> = ({pluInput, setPluInput}) => {
    const {language} = useLanguage();
    const handleKey = (key: string) => {
        if (key === "⌫") setPluInput(pluInput.slice(0, -1));
        else if (key === "Enter") return;
        else if (key === "Clear") setPluInput(pluInput.slice(0, 0));
        else setPluInput(pluInput + key);
    };

    const keys = ["7","8","9","4","5","6","1","2","3","⌫","0", text[language].clear];

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
            <div
                style={{
                    height: "60px",
                    border: "2px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "2rem",
                    padding: "0.5rem",
                    textAlign: "right",
                    backgroundColor: "#f8f8f8",
                }}
            >
                {pluInput}
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                    gap: "0.5rem",
                    flex: 1,
                }}
            >
                {keys.map(key => (
                    <button
                        key={key}
                        style={{ fontSize: "1.5rem", cursor: "pointer", minHeight: "10vh",  }}
                        onClick={() => handleKey(key)}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div
                style={{
                    flex: 1
                }}
            >
                <button
                    key="enter"
                    style={{fontSize: "1.5rem", cursor: "pointer", minHeight: "8vh", minWidth: "30vh"}}
                >
                    {text[language].enter}
                </button>
            </div>
        </div>
    );
};