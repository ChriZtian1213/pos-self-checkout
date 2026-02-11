import React, {useState} from "react";

interface FullKeyboardProps {
    value: string;
    mask?: boolean;
    onKeyPress: (key: string) => void;
}

export const FullKeyboard: React.FC<FullKeyboardProps> = ({value, mask=false, onKeyPress}) => {
    const [shift, setShift] = useState(false);

    const rows = [
        { letters: ["Q","W","E","R","T","Y","U","I","O","P"], numbers: ["7","8","9"],  },
        { letters: ["A","S","D","F","G","H","J","K","L"], numbers: ["4","5","6"],  },
        { letters: ["CLEAR", "Z","X","C","V","B","N","M"], numbers: ["1","2","3"], },
        { letters: ["SHIFT", "SPACE"], numbers: ["0", "ENTER"],}
    ];

    const handleClick = (key: string) => {
        if (key === "SHIFT"){
            setShift(true);
            return;
        }
        const outputKey = shift && key.length === 1 && /[a-zA-Z]/.test(key) ? key.toUpperCase() : key;
        onKeyPress(outputKey);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem" }}>
            {/* Display */}
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
                {mask ? "•".repeat(value.length) : value}
            </div>

            {/* Keyboard rows */}
            {rows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.5rem",
                    }}
                >
                    {/* Letters column (fixed width) */}
                    <div
                        style={{
                            display: "flex",
                            gap: "0.25rem",
                            width: "500px", // 👈 tune this once
                            justifyContent: "flex-end",
                        }}
                    >
                        {row.letters.map((key) => (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                style={{
                                    width:
                                        key === "SPACE"
                                            ? "280px"
                                            : key === "CLEAR" || key === "SHIFT"
                                                ? "120px"
                                                : "56px",
                                    height: "56px",
                                    fontSize: "1.1rem",
                                    cursor: "pointer",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {key === "SPACE" ? "" : key}
                            </button>
                        ))}
                    </div>

                    {/* Numpad column (fixed width) */}
                    <div
                        style={{
                            display: "flex",
                            gap: "0.25rem",
                            width: "180px",
                            justifyContent: "flex-start",
                        }}
                    >
                        {row.numbers.map((key) => (
                            <button
                                key={key}
                                style={{ padding: "1rem", fontSize: "1.2rem" }}
                                onClick={() => handleClick(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};