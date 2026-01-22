import type {CatalogItem} from "~/data/catalogTypes";

export const bakery: Record<string, CatalogItem> = {
    donut: {
        name: {en: "Donut", es: "Dona"},
        plu: "5303",
        price: .50,
        taxable: "F",
        image: "donut.jpg",
        category: "bakery"
    },
    bolillo: {
        name: {en: "Bolillo", es: "Bolillo"},
        plu: "34988",
        price: .25,
        taxable: "F",
        image: "bolillo.jpg",
        category: "bakery"
    },
    mexicanPastry: {
        name: {en: "Mexican Pastry", es: "Pastelería Mexicana"},
        plu: "33826",
        price: 1,
        taxable: "F",
        image: "mexicanPastry.jpg",
        category: "bakery"
    },

}