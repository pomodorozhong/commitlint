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
        this.view.displayFormattedText(
            this.formatter.format(
                this.view.getType(),
                this.view.getScope(),
                this.view.getSubject(),
                this.view.getBody(),
                this.view.getFooter()));
    }

    toCheckRule(): void { }
}