import React, { createContext, useContext, useRef, useState} from "react";
import {ManageOrder} from "~/services/ManageOrder";
import type {ProduceItem} from "~/data/produce";
import {text} from "~/i18n/text";

interface OrderContextValue {
    items: ReturnType<ManageOrder["getItems"]>;
    addProduce: (item: ProduceItem, quantity: number) => void;
    removeItem: (plu: string) => void;
    decrementItem: (plu: string) => void;
    subtotal: number;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: {children: React.ReactNode}) {
    const order = useRef(new ManageOrder()).current;
    const [, forceUpdate] = useState(0);
    const decrementItem = (plu: string) => {
        order.decrementItem(plu);
        sync();
    }

    const sync = () => forceUpdate(v => v+1);

    const addProduce = (item: ProduceItem, quantity: number) => {
        order.addItem(
            {
                plu: item.plu,
                name: item.name.en,
                unitPrice: item.price,
                taxable: item.taxable
            },
            quantity,
        );
        sync();
    };

    const removeItem = (plu: string) => {
        order.removeItem(plu);
        sync();
    };

    return(
        <OrderContext.Provider value={{
            items: order.getItems(),
            addProduce,
            removeItem,
            decrementItem,
            subtotal: order.getSubtotal(),
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("useOrder() must be used within order");
    return ctx;
}