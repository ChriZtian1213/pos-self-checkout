
interface OrderItemData {
    name: string;
    price: string;
    taxable: string;
    quantity?: number;
}

export class ManageOrder {
    private items: OrderItemData[] = [];

    constructor(initialItems: OrderItemData[] = []){
        this.items = initialItems;
    }

    getItems() {
        return this.items;
    }


    addItem(item: OrderItemData) {
        this.items.push(item);
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }

    updateItem(index: number, updatedItem: Partial<OrderItemData>) {
        this.items[index] = {...this.items[index], ...updatedItem};
    }

    getSubtotal() {
        return this.items.reduce(
            (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0);
    }

}