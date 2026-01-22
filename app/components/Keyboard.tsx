import React from "react";
interface QwertyKeyboardProps {
    nameInput: string;
    setNameInput: (name: string) => void;
}

export const QwertyKeyboard: React.FC<QwertyKeyboardProps> = ({nameInput, setNameInput}) => {
    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P","⌫"],
        ["A","S","D","F","G","H","J","K","L", "SPACE"],
        ["Z","X","C","V","B","N","M", "CLEAR"]

    ];
    const handleKey = (key: string) => {
        if (key === "⌫") setNameInput(nameInput.slice(0, -1));
        else if (key === "CLEAR") setNameInput(nameInput.slice(0, 0));
        else if (key === "SPACE") setNameInput(nameInput + " ");
        else if (key === "ENTER") return;
        else setNameInput(nameInput + key);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", maxWidth:"64vh"}}>
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
                {nameInput}
            </div>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
                    {row.map((key) => (
                        <button
                            key={key}
                            style={{
                                flex: key === "Space" ? 3 : 1,
                                padding: "1rem",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                            }}
                            onClick={() => handleKey(key)}
                        >
                            {key === "SPACE" ? "␣" : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}