import React from "react";
import type {CatalogItem} from "~/data/catalogTypes";
import {text} from "~/i18n/text";
import {useLanguage} from "~/state/LanguageContext";

interface ItemQuantityProps {
    item: CatalogItem;
    onConfirm: (quantity: number) => void;
    onCancel: () => void;
    quantity: string;
    onQuantityChange: (value: string) => void;
}

export const ItemQuantityPopup: React.FC<ItemQuantityProps> = ({
    item, onConfirm, onCancel, quantity, onQuantityChange
}) => {
    const {language} = useLanguage();

    return (
        <div
            style={{
                flex: 2, display: "flex", flexDirection: "column"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                {/* Item display */}
                <h2>{item.name[language]}</h2>
                {item.image && (
                    <img
                        src={`/${item.category}Images/${item.image}`}
                        alt={item.name.en}
                        style={{ width: "200px", height: "200px" }}
                    />
                )}

                {/* Quantity display */}
                <div
                    style={{
                        width: "100%",
                        fontSize: "2rem",
                        padding: "0.5rem",
                        border: "2px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor: "#f8f8f8",
                        textAlign: "center",
                        minHeight: "5vh"
                    }}
                >
                    {quantity}
                </div>


                {/* Cancel button */}
                <button
                    onClick={onCancel}
                    style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#ccc",
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};