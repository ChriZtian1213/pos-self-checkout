import Popup from "~/components/Popup";

type PopupSetter = (msg: string | null) => void;

export class CashierFunctions {
    private setPopup: PopupSetter;
    constructor(setPopup: PopupSetter) {
        this.setPopup = setPopup;
    }

    callCashier(){
        this.setPopup("Help is on the way!");
    }
}