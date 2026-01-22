import type {CatalogItem} from "~/data/catalogTypes";

export const produce: Record<string, CatalogItem> = {
    apple: {
        name: {en: "Apple", es: "Manzana"},
        plu: "4017",
        price: 1.25,
        taxable: "F",
        image: "apple.jpg",
        category: "produce"
    },
    banana: {
        name: {en: "Banana", es: "Platano"},
        plu: "4011",
        price: .75,
        taxable: "F",
        image: "banana.jpg",
        category: "produce"
    },
    grapes: {
        name: {en: "Grapes", es: "Uvas"},
        plu: "4022",
        price: 1.50,
        taxable: "F",
        image: "grapes.jpg",
        category: "produce"
    },
    orange: {
        name: {en: "Orange", es: "Naranja"},
        plu: "4013",
        price: .75,
        taxable: "F",
        image: "orange.jpg",
        category: "produce"
    },
    tomato: {
        name: {en: "Tomato", es: "Tomate"},
        plu: "4087",
        price: .80,
        taxable: "F",
        image: "tomato.jpg",
        category: "produce"
    },
    lime: {
        name: {en: "Lime", es: "Lima"},
        plu: "4088",
        price: .75,
        taxable: "F",
        image: "limes.jpg",
        category: "produce"
    },
    lettuce: {
        name: {en: "Lettuce", es: "Lechuga"},
        plu: "4640",
        price: 1.00,
        taxable: "F",
        image: "lettuce.jpg",
        category: "produce"
    },
    pineapple: {
        name: {en: "Pineapple", es: "Piña"},
        plu: "4433",
        price: 1.00,
        taxable: "F",
        image: "pineapple.jpg",
        category: "produce"
    },
    addMore: {
        name: {en: "enName", es: "esName"},
        plu: "0",
        price: 0,
        taxable: "T",
        image: "addMore.jpg",
        category: "produce"
    },
    avocado: {
        name: {en: "Avocado", es: "Aguacate"},
        plu: "4046",
        price: .50,
        taxable: "F",
        image: "avocado.jpg",
        category: "produce"
    }
}