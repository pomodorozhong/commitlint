import { IView } from "../interface/view/view.interface";
import { IPresenter } from "../interface/presenter/presenter.interface";
import { Presenter } from "../presenter/presenter";

export class View implements IView {
    DOM: Document;
    presenter: IPresenter;
    constructor(DOM: Document, presenter: Presenter) {
        this.presenter = presenter;
        this.DOM = DOM;
        this.DOM
            .getElementById("grabCookie")
            .addEventListener("click", toGrabCookie);

        var self = this;

        // Event Handler
        function toGrabCookie() {
            self.presenter.toGrabCookie();
        }
    }

    // DOM Manipulation
    toSetCookieCount(cookieCount: number) {
        this.DOM.getElementById("cookieCount").innerHTML = cookieCount.toString();
    }
}