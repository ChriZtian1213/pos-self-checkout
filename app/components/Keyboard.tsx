import React, {forwardRef} from "react";
interface QwertyKeyboardProps {
    onKeyPress: (key: string) => void;
}

export const QwertyKeyboard: React.FC<QwertyKeyboardProps> = ({onKeyPress}) => {
    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P","⌫"],
        ["A","S","D","F","G","H","J","K","L", "SPACE"],
        ["Z","W","C","V","B","N","M", "CLEAR"]

    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", maxWidth:"64vh"}}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
                    {row.map((key) => (
                        <button
                            key={key}
                            style={{
                                flex: key === "Space" ? 3 : 1,
                                padding: "1rem",
                                fontSize: "1.25rem",
                                cursor: "pointer",
                            }}
                            onClick={() => onKeyPress(key)}
                        >
                            {key === "Space" ? "␣" : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}