import { IPresenter } from "../interface/presenter/presenter.interface";
import { IView } from "../interface/view/view.interface";
import { ICookieModel } from "../interface/model/cookieModel.interface";
import { View } from "../view/view"
import { CookieModel } from "../model/cookieModel";

export class Presenter implements IPresenter {
    private view: IView;
    private cookieModel: ICookieModel;

    constructor() {
        this.view = new View(document, this);
        this.cookieModel = new CookieModel();

        this.initialize();
    }

    // Sync View and Model
    initialize(): void {
        this.view.toSetCookieCount(this.cookieModel.getCookieCount());
    }

    toGrabCookie(): void {
        // Call Model function to update data.
        this.cookieModel.addCookie();

        // Call View function to update UI.
        this.view.toSetCookieCount(this.cookieModel.getCookieCount());
    }
}