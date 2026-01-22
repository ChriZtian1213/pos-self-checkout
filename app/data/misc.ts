import type {CatalogItem} from "~/data/catalogTypes";

export const misc: Record<string, CatalogItem> = {
    ice: {
        name: {en: "Ice", es: "Hielo"},
        plu: "9001",
        price: 3,
        taxable: "F",
        image: "ice.jpg",
        category: "misc"
    },

    propaneExchange: {
        name: {en: "Propane Exchange", es: "Cambio de Propano"},
        plu: "9002",
        price: 20,
        taxable: "T",
        image: "propaneExchange.jpg",
        category: "misc"
    },

    propanePurchase: {
        name: {en: "Propane Purchase (New)", es: "Compra de Propano (Nuevo)"},
        plu: "9003",
        price: 40,
        taxable: "T",
        image: "propanePurchase.jpg",
        category: "misc"
    }
}