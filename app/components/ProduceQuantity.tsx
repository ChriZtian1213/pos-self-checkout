import React, {useState} from "react";
import type {ProduceItem} from "~/data/produce";
import {Numpad} from "~/components/Numpad";

interface ProduceQuantityProps {
    item: ProduceItem;
    onConfirm: (quantity: number) => void;
    onCancel: () => void;
    quantity: string;
    onQuantityChange: (value: string) => void;
}

export const ProduceQuantityPopup: React.FC<ProduceQuantityProps> = ({
    item, onConfirm, onCancel, quantity, onQuantityChange
}) => {

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
                <h2>{item.name.en}</h2>
                {item.image && (
                    <img
                        src={`/produceImages/${item.image}`}
                        alt={item.name.en}
                        style={{ width: "100px", height: "100px" }}
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