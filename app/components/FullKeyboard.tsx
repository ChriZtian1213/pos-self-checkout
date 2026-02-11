import React, {useState} from "react";

interface FullKeyboardProps {
    value: string;
    mask?: boolean;
    onKeyPress: (key: string) => void;
}

export const FullKeyboard: React.FC<FullKeyboardProps> = ({value, mask=false, onKeyPress}) => {
    const [shift, setShift] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const isUppercase = capsLock !== shift;



    const rows = [
        { letters: ["q","w","e","r","t","y","u","i","o","p"], numbers: ["7","8","9"] },
        { letters: ["a","s","d","f","g","h","j","k","l"], numbers: ["4","5","6"] },
        { letters: ["clear","z","x","c","v","b","n","m"], numbers: ["1","2","3"] },
        { letters: ["caps lock","shift","SPACE"], numbers: ["0","enter"] },
    ];

    const CONTROL_KEYS = new Set([
        "clear", "caps lock", "shift", "SPACE", "enter"
    ])

    const handleClick = (key: string) => {
        if (key === "SHIFT"){
            setShift(prev => !prev);
            return;
        }

        if (key === "ENTER"){
            return;
        }
        if (key === "CAPS LOCK"){
            setCapsLock(prev => !prev);
            return;
        }
        const output = isUppercase ? key.toUpperCase() : key.toLowerCase();
        onKeyPress(output);
        if (shift) setShift(prev => !prev);
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
                        {row.letters.map((key) => {
                            const isLetter = key.length === 1 && /[a-z]/.test(key);
                            const displayKey = isLetter ? (isUppercase ? key.toUpperCase() : key.toLowerCase()) : key.toUpperCase();
                            return (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                style={{
                                    width:
                                        key === "SPACE"
                                            ? "280px"
                                            : key === "CLEAR" || key === "SHIFT"
                                                ? "120px"
                                                : "80px",
                                    height: "56px",
                                    fontSize: "1.1rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor:
                                        key === "CAPS LOCK" ? capsLock ? "#949292" : "white" : "white",
                                }}
                            >
                                {key === "SPACE" ? "" : displayKey}
                            </button>
                        );})}
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
                                style={{ padding: "1rem", fontSize: "1.2rem", backgroundColor: "white" }}
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