import { IPresenter } from "../interface/presenter/presenter.interface";
import { IView } from "../interface/view/view.interface";
import { View } from "../view/view"
import { IFormatter } from "../interface/model/formatter.interface";
import { Formatter } from "../model/formatter";

export class Presenter implements IPresenter {
    private view: IView;
    private formatter: IFormatter;

    constructor() {
        this.view = new View(document, this);
        this.formatter = new Formatter();

        this.initialize();
    }

    // Sync View and Model
    initialize(): void {

    }

    toFormat(): void { 
        console.log("2020/05/14 test");
    }

    toCheckRule(): void { }
}