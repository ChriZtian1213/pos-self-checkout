import React from "react";
import {type Language, useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";
import type {ProduceItem} from "~/data/produce";

interface ProduceGridProps {
    produceItems: ProduceItem[];
    language: Language
    onClick?: (item: ProduceItem) => void;
    page: number;
    producePerPage: number;
    totalItems: number;
    onNext: () => void;
    onBack: () => void;
}

export const ProduceGrid: React.FC<ProduceGridProps> = ({
    produceItems, onClick,
    page, producePerPage, totalItems, onNext, onBack
    }) => {
    const {language} = useLanguage();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 2 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.5rem",
                }}
            >
                {produceItems.map((item) => (
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

            {/* Pagination buttons */}
            <div style={{ display: "flex", gap: "0.5rem", minHeight: "3rem" }}>
                <button
                    style={{ flex: 1 }}
                    onClick={onBack}
                    disabled={page === 0}
                >
                    {text[language].back}
                </button>
                <button
                    style={{ flex: 1 }}
                    onClick={onNext}
                    disabled={(page + 1) * producePerPage >= totalItems}
                >
                    {text[language].next}
                </button>
            </div>
        </div>
    );
};