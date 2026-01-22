import type {LangText} from "~/state/LanguageContext";

export interface OrderItemData {
    plu: string;
    name: LangText;
    unitPrice: number;
    quantity: number;
    taxable: "T" | "F" | "TF" | "";
    image?: string;
    category: string;
}

export class ManageOrder {
    private items: OrderItemData[] = [];

    constructor(initialItems: OrderItemData[] = []){
        this.items = initialItems;
    }

    getItems() {
        return this.items;
    }


    addItem(item: Omit<OrderItemData, "quantity">, quantity: number = 1) {
        const existing = this.items.find(i => i.plu === item.plu);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({...item, quantity})
        }
    }

    decrementItem(plu: string) {
        const item = this.items.find(i => i.plu === plu);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) this.removeItem(plu);
        }
    }

    removeItem(plu: string) {
        this.items = this.items.filter(i => i.plu !== plu);
    }


    getSubtotal() {
        return this.items.reduce(
            (acc, item) => acc + item.unitPrice * item.quantity, 0);
    }

    getTotal() {
        return this.items.reduce((acc, item) => {
            const taxMultiplier = item.taxable === "T" || item.taxable === "TF" ? 1.0825 : 1;
            return acc + item.unitPrice * item.quantity * taxMultiplier;
        }, 0);
    }
}