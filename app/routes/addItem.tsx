import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ItemQuantityPopup } from "~/components/ItemQuantityPopup";
import type { CatalogItem } from "~/data/catalogTypes";
import {Numpad} from "~/components/Numpad";
import {useOrder} from "~/state/OrderContext";


export function meta() {
    return [{ title: "Add Item" }];
}

export default function AddItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const manageOrder = useOrder()
    const item = location.state?.item as CatalogItem | undefined;
    if (!item) {
        // Fallback if no item is passed
        return <div>No item selected</div>;
    }

    const [quantityInput, setQuantityInput] = useState("");

    const handleConfirm = () => {
        const qty = Number(quantityInput);
        if (!Number.isInteger(qty) || qty <= 0) return;
        // Here you would add to order context
        // e.g., manageOrder.addItem(item, qty)
        navigate("/order"); // Go back to order after confirming
    };

    const handleCancel = () => {
        navigate("/order"); // Go back without adding
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ display: "flex", flex: 1, padding: "1rem", flexDirection: "row" }}>
                <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
                    <ItemQuantityPopup
                        item={item}
                        quantity={quantityInput}
                        onQuantityChange={setQuantityInput}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                </div>
                <Numpad input={quantityInput}
                        setInput={setQuantityInput}
                        onEnter={() => {
                            const qty = Number(quantityInput);
                            if (!Number.isInteger(qty) || qty <= 0) return;
                            manageOrder.addItem(item, qty);
                            navigate("/order");
                        }}
                />
            </div>
        </div>
    );
}
