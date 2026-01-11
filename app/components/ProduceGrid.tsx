import React from "react";
import type {ProduceItem} from "~/data/produce";

interface ProduceGridProps {
    produceItems: ProduceItem[];
    language: "en" | "es";
    onClick?: (item: ProduceItem) => void;
}

export const ProduceGrid: React.FC<ProduceGridProps> = ({produceItems, language, onClick}) => {
    return (
        <div style={{ flex: 2, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", maxHeight: "100px" }}>
            {produceItems.map(item => (
                <button
                    key={item.plu}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                        gap: "0.25rem",
                        fontSize: "1rem",
                    }}
                    onClick={() => onClick?.(item)}
                >
                    <span>{item.plu}</span>
                    <img
                        src={`/produceImages/${item.image}`}
                        alt={item.name[language]}
                        style={{ width: "50px", height: "50px" }}
                    />
                    <span>{item.name[language]}</span>
                </button>
            ))}
        </div>
    );
};