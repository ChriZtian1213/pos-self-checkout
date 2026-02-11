import React, { createContext, useContext, useRef, useState} from "react";
import {ManageOrder, type OrderItemData} from "~/services/ManageOrder";
import type {CatalogItem} from "~/data/catalogTypes";

interface OrderContextValue {
    items: ReturnType<ManageOrder["getItems"]>;
    addItem: (item: CatalogItem, quantity: number) => void;
    removeItem: (plu: string) => void;
    decrementItem: (plu: string) => void;
    subtotal: number;
    total: number;
    tax: number;
    snapSubtotal: number;
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

    const addItem = (item: CatalogItem, quantity: number) => {
        order.addItem(
            {
                plu: item.plu,
                name: item.name,
                unitPrice: item.price,
                taxable: item.taxable,
                image: item.image,
                category: item.category,
            },
            quantity,
        );

        sync();
    };

    const removeItem = (plu: string) => {
        order.removeItem(plu);
        sync();
    };

    const subtotal = order.getSubtotal();
    const total = order.getTotal();
    const snapEligibleSubtotal = order.getSnapEligible();

    return(
        <OrderContext.Provider value={{
            items: order.getItems(),
            addItem,
            removeItem,
            decrementItem,
            subtotal: subtotal,
            total: total,
            tax: total - subtotal,
            snapSubtotal: snapEligibleSubtotal
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