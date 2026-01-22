import React from "react";
import {text} from "~/i18n/text";

interface OrderItemProps {
    name: string;
    price: string;
    taxable: string;
    onSelect?: () => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({ name, price, taxable, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : -1}
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #ccc",
                alignItems: "center",
            }}
        >
            {/* Item name */}
            <div>{name}</div>

            {/* Price + Taxable label */}
            <div style={{ display: "flex", gap: "0.5rem", minWidth: "70px", justifyContent: "flex-end" }}>
                <div>{taxable}</div>
                <div>{price}</div>
            </div>
        </div>
    );
};
