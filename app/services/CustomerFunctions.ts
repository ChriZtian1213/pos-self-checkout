import {text} from "~/i18n/text";
import {type Language, useLanguage} from "~/state/LanguageContext";

type PopupSetter = (msg: string | null) => void;

export class CustomerFunctions {
    protected setPopup: PopupSetter;
    protected language: Language;

    constructor(setPopup: PopupSetter, language: Language) {
        this.setPopup = setPopup;
        this.language = language;
    }

    callCashier(){
        this.setPopup(text[this.language].cashierMessage);
    }

    useBags(){
        this.setPopup(text[this.language].bagsMessage);
    }

    switchLanguage(language: Language) {
        this.language = language
    }

}

export class CashierFunctions extends CustomerFunctions {

}