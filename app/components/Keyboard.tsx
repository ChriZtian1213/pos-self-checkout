import React, {use} from "react";
import {useLanguage} from "~/state/LanguageContext";
interface QwertyKeyboardProps {
    value: string;
    onKeyPress: (key: string) => void;
    placeholder?: string;
    mask?: boolean;
}

export const QwertyKeyboard: React.FC<QwertyKeyboardProps> = ({value, onKeyPress, placeholder, mask = false}) => {
    const {language} = useLanguage();
    const rows = language === "en"
        ? [
            ["Q","W","E","R","T","Y","U","I","O","P","⌫"],
            ["A","S","D","F","G","H","J","K","L", "SPACE"],
            ["Z","X","C","V","B","N","M", "CLEAR"]
        ]
        : [
            ["Q","W","E","R","T","Y","U","I","O","P","⌫"],
            ["A","S","D","F","G","H","J","K","L", "Ñ","SPACE"],
            ["Z","X","C","V","B","N","M", "CLEAR"]
        ]
    ;

    return (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "64vh" }}>
            {/* Optional display */}
            {value !== undefined && (
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
                    {value.length === 0
                        ? placeholder
                        : mask
                            ? "•".repeat(value.length)
                            : value}
                </div>
            )}


            {/* Letter Keys */}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
                    {row.map((key) => (
                        <button
                            key={key}
                            style={{
                                flex: key === "SPACE" ? 3 : 1,
                                padding: "1rem",
                                fontSize: "1.5rem",
                            }}
                            onClick={() => onKeyPress(key)}
                        >
                            {key === "SPACE" ? "␣" : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};