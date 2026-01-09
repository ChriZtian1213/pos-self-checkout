export interface ProduceItem{
    name: {en: string; es: string};
    plu: string
    price: number
    taxable: string
}

export const produce: Record<string, ProduceItem> = {
    apple: {
        name: {en: "Apple", es: "Manzana"},
        plu: "4017",
        price: 1.25,
        taxable: "F"
    },
    banana: {
        name: {en: "Banana", es: "Platano"},
        plu: "4011",
        price: .75,
        taxable: "F"
    },
    grapes: {
        name: {en: "Grapes", es: "Uvas"},
        plu: "4022",
        price: 1.50,
        taxable: "F"
    },
    oranges: {
        name: {en: "Orange", es: "Naranja"},
        plu: "4013",
        price: .75,
        taxable: "F"
    },
    tomato: {
        name: {en: "Tomato", es: "Tomate"},
        plu: "4087",
        price: .80,
        taxable: "F"
    },
    limes: {
        name: {en: "Lime", es: "Lima"},
        plu: "4088",
        price: .75,
        taxable: "F"
    },
    lettuce: {
        name: {en: "Lettuce", es: "Lechuga"},
        plu: "4640",
        price: 1.00,
        taxable: "F"
    },
    pineapple: {
        name: {en: "Pineapple", es: "Piña"},
        plu: "4433",
        price: 1.00,
        taxable: "F"
    },
    addMore: {
        name: {en: "enName", es: "esName"},
        plu: "0",
        price: 0,
        taxable: "Taxable"

    }

}