import React, {useState} from "react";
import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";
import type {ProduceItem} from "~/data/produce";

const PRODUCE_PER_PAGE = 8;

interface ProduceGridProps {
    produceItems: ProduceItem[];
    onClick?: (item: ProduceItem) => void;
}

export const ProduceGrid: React.FC<ProduceGridProps> = ({
    produceItems, onClick }) => {
    const {language} = useLanguage();
    const [page, setPage] = useState(0);

    const pageItems = produceItems.slice(
        page * PRODUCE_PER_PAGE,
        (page + 1) * PRODUCE_PER_PAGE
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 2 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.5rem",
                }}
            >
                {pageItems.map((item) => (
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
                    onClick={() => setPage(p => p - 1)}
                    disabled={page === 0}
                >
                    {text[language].back}
                </button>
                <button
                    style={{ flex: 1 }}
                    onClick={() => setPage(p => p + 1)}
                    disabled={(page + 1) * PRODUCE_PER_PAGE >= produceItems.length}
                >
                    {text[language].next}
                </button>
            </div>
        </div>
    );
};