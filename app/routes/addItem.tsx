import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ItemQuantityPopup } from "~/components/ItemQuantityPopup";
import type { CatalogItem } from "~/data/catalogTypes";
import {Numpad} from "~/components/Numpad";
import {useOrder} from "~/state/OrderContext";
import {text} from "~/i18n/text"
import {useLanguage} from "~/state/LanguageContext";


export function meta() {
    return [{ title: "Add Item" }];
}

export default function AddItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const {language} = useLanguage();
    const manageOrder = useOrder();
    const item = location.state?.item as CatalogItem | undefined;
    if (!item) {
        // Fallback if no item is passed
        return <div>No item selected</div>;
    }

    const [quantityInput, setQuantityInput] = useState("");

    const handleConfirm = () => {
        const qty = Number(quantityInput);
        if (!Number.isInteger(qty) || qty <= 0) return;
        manageOrder.addItem(
            {
                plu: item!.plu,
                name: item!.name,
                price: item!.price,
                taxable: item!.taxable,
                image: item!.image,
                category: item!.category,
            },
            qty
        )
        // Here you would add to order context
        // e.g., manageOrder.addItem(item, qty)
        navigate("/order"); // Go back to order after confirming
    };

    const applyKey =(value: string, key: string) => {
        if (key === "⌫") return value.slice(0, -1);
        if (key === text[language].clear) return "";
        if (key === "SPACE") return value + " ";
        return value + key;
    }

    const handleKeyPress = (key: string) => {
        if (key === text[language].enter){
            handleConfirm();
            return;
        }
        setQuantityInput(prev => applyKey(prev, key));
    }

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
                <Numpad
                        value={quantityInput}
                        onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}
