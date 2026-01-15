import type {LangText} from "~/state/LanguageContext";

export interface ProduceItem{
    name: LangText;
    plu: string
    price: number
    taxable: "T" | "F" | "TF" | ""
    image?: string
}

export const produce: Record<string, ProduceItem> = {
    apple: {
        name: {en: "Apple", es: "Manzana"},
        plu: "4017",
        price: 1.25,
        taxable: "F",
        image: "apple.jpg"
    },
    banana: {
        name: {en: "Banana", es: "Platano"},
        plu: "4011",
        price: .75,
        taxable: "F",
        image: "banana.jpg"
    },
    grapes: {
        name: {en: "Grapes", es: "Uvas"},
        plu: "4022",
        price: 1.50,
        taxable: "F",
        image: "grapes.jpg"
    },
    orange: {
        name: {en: "Orange", es: "Naranja"},
        plu: "4013",
        price: .75,
        taxable: "F",
        image: "orange.jpg"
    },
    tomato: {
        name: {en: "Tomato", es: "Tomate"},
        plu: "4087",
        price: .80,
        taxable: "F",
        image: "tomato.jpg"
    },
    lime: {
        name: {en: "Lime", es: "Lima"},
        plu: "4088",
        price: .75,
        taxable: "F",
        image: "limes.jpg"
    },
    lettuce: {
        name: {en: "Lettuce", es: "Lechuga"},
        plu: "4640",
        price: 1.00,
        taxable: "F",
        image: "lettuce.jpg"
    },
    pineapple: {
        name: {en: "Pineapple", es: "Piña"},
        plu: "4433",
        price: 1.00,
        taxable: "F",
        image: "pineapple.jpg"
    },
    addMore: {
        name: {en: "enName", es: "esName"},
        plu: "0",
        price: 0,
        taxable: "T",
        image: "addMore.jpg"
    },
    avocado: {
        name: {en: "Avocado", es: "Aguacate"},
        plu: "4046",
        price: .50,
        taxable: "F",
        image: "avocado.jpg"
    }

}