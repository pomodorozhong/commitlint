import { IView } from "../interface/view/view.interface";
import { IPresenter } from "../interface/presenter/presenter.interface";
import { Presenter } from "../presenter/presenter";

export class View implements IView {
    DOM: Document;
    presenter: IPresenter;
    constructor(DOM: Document, presenter: Presenter) {
        this.presenter = presenter;
        this.DOM = DOM;
        this.DOM.getElementById("ddl_type").addEventListener("change", userInputed);
        this.DOM.getElementById("txt_scope").addEventListener("input", userInputed);
        this.DOM.getElementById("txt_subject").addEventListener("input", userInputed);
        this.DOM.getElementById("txa_body").addEventListener("input", userInputed);
        this.DOM.getElementById("txa_footer").addEventListener("input", userInputed);

        let self = this;
        this.DOM.getElementById("btn_copy").addEventListener("click", btnClicked);

        // Event Handler
        function userInputed() {
            self.presenter.toFormat();
            self.presenter.toCheckRule();
            self.autoSetClearButtonVisibility();
        }
        function btnClicked() {
            self.presenter.toFormatWithoutBr();
        }

        this.setPlaceholder();
        this.setTypes();
        this.setClearButton(userInputed);
        this.setupAutoExpandedTextarea();
    }

    setTypes(): void {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("ddl_type");

        const types = this.presenter.getTypes();

        types.forEach((t) => {
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(t));
            input.appendChild(opt);
        });
    }

    setPlaceholder(): void {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("ddl_type");
        var opt = document.createElement("option");
        opt.disabled = true;
        opt.selected = true;
        opt.appendChild(document.createTextNode("<type>"));
        input.appendChild(opt);

        input = <HTMLInputElement>this.DOM.getElementById("txt_scope");
        input.placeholder = "<scope>";

        input = <HTMLInputElement>this.DOM.getElementById("txt_subject");
        input.placeholder = "<subject>";

        input = <HTMLInputElement>this.DOM.getElementById("txa_body");
        input.placeholder = "<body>";

        input = <HTMLInputElement>this.DOM.getElementById("txa_footer");
        input.placeholder = "<footer>";
    }

    setClearButton(userInputed: Function): void {
        let targetIds: Array<string> = ["txt_scope", "txt_subject", "txa_body", "txa_footer"];
        let ids: Array<string> = [
            "btn_clearScope",
            "btn_clearSubject",
            "btn_clearBody",
            "btn_clearFooter",
        ];
        let containers: Array<string> = ["container2", "container3", "container4", "container5"];
        let clears: Array<EventListener> = [clearScope, clearSubject, clearBody, clearFooter];

        var xmlns = "http://www.w3.org/2000/svg";
        let btn = document.createElement("button");
        let svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute("viewBox", "0 0 40 40");
        let path = document.createElementNS(xmlns, "path");
        path.setAttribute("class", "close-x");
        let coords = `M 7,7 L 33,33 M 33,7 L 7,33`;
        path.setAttributeNS(null, "d", coords);
        svg.appendChild(path);
        btn.appendChild(svg);
        btn.style.visibility = "hidden";

        let self = this;

        let btnClone1 = <HTMLInputElement>btn.cloneNode(true);
        btnClone1.id = ids[0];
        btnClone1.addEventListener("click", clears[0]);
        let container1 = this.DOM.getElementById(containers[0]);
        container1?.appendChild(btnClone1);
        function clearScope() {
            let element: HTMLTextAreaElement = self.DOM.getElementById(targetIds[0]);
            element.value = "";

            var event = document.createEvent("Event");
            event.initEvent("input", true, true);
            element.dispatchEvent(event);
        }

        let btnClone2 = <HTMLInputElement>btn.cloneNode(true);
        btnClone2.id = ids[1];
        btnClone2.addEventListener("click", clears[1]);
        let container2 = this.DOM.getElementById(containers[1]);
        container2?.appendChild(btnClone2);
        function clearSubject() {
            let element: HTMLTextAreaElement = self.DOM.getElementById(targetIds[1]);
            element.value = "";

            var event = document.createEvent("Event");
            event.initEvent("input", true, true);
            element.dispatchEvent(event);
        }

        let btnClone3 = <HTMLInputElement>btn.cloneNode(true);
        btnClone3.id = ids[2];
        btnClone3.addEventListener("click", clears[2]);
        let container3 = this.DOM.getElementById(containers[2]);
        container3?.appendChild(btnClone3);
        function clearBody() {
            let element: HTMLTextAreaElement = self.DOM.getElementById(targetIds[2]);
            element.value = "";

            var event = document.createEvent("Event");
            event.initEvent("input", true, true);
            element.dispatchEvent(event);
        }

        let btnClone4 = <HTMLInputElement>btn.cloneNode(true);
        btnClone4.id = ids[3];
        btnClone4.addEventListener("click", clears[3]);
        let container4 = this.DOM.getElementById(containers[3]);
        container4?.appendChild(btnClone4);
        function clearFooter() {
            let element: HTMLTextAreaElement = self.DOM.getElementById(targetIds[3]);
            element.value = "";

            var event = document.createEvent("Event");
            event.initEvent("input", true, true);
            element.dispatchEvent(event);
        }
    }

    setupAutoExpandedTextarea(): void {
        let textarea;

        textarea = document.getElementById("txa_body");
        textarea?.addEventListener("input", autoExpandedTextarea);

        textarea = document.getElementById("txa_footer");
        textarea?.addEventListener("input", autoExpandedTextarea);

        function autoExpandedTextarea(event: Event) {
            let textarea = <HTMLElement>event.target;

            // Reset field height
            textarea.style.height = "inherit";

            // Get the computed styles for the element
            let computed = window.getComputedStyle(textarea);

            // Calculate the height
            let heightCorrection = -10;
            let height =
                parseInt(computed.getPropertyValue("border-top-width"), 10) +
                parseInt(computed.getPropertyValue("padding-top"), 10) +
                textarea.scrollHeight +
                parseInt(computed.getPropertyValue("padding-bottom"), 10) +
                parseInt(computed.getPropertyValue("border-bottom-width"), 10) +
                heightCorrection;

            textarea.style.height = height + "px";
        }
    }

    // DOM Manipulation
    displayFormattedText(text: string): void {
        this.DOM.getElementById("p_formatted").innerHTML = text;
    }

    displayWarning(text: string): void {
        if (text === "") {
            this.toggleWarningVisibility(true);
        } else {
            this.toggleWarningVisibility(false);
            this.DOM.getElementById("p_warning").innerHTML = text;
        }
    }

    toggleWarningVisibility(isHidden: boolean): void {
        let element: HTMLElement = this.DOM.getElementById("p_warning");

        if (isHidden) {
            element.style.display = "none";
            element.style.position = "absolute";
        } else {
            element.style.display = "block";
            element.style.position = "relative";
        }
    }

    autoSetClearButtonVisibility(): void {
        let targetIds: Array<string> = ["txt_scope", "txt_subject", "txa_body", "txa_footer"];
        let buttonIds: Array<string> = [
            "btn_clearScope",
            "btn_clearSubject",
            "btn_clearBody",
            "btn_clearFooter",
        ];

        for (let i = 0; i < targetIds.length; i++) {
            const value = (<HTMLTextAreaElement>this.DOM.getElementById(targetIds[i])).value;
            let element = <HTMLTextAreaElement>this.DOM.getElementById(buttonIds[i]);
            element.style.visibility = value.length > 0 ? "visible" : "hidden";
        }
    }

    // DOM Accessing
    getType(): string {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("ddl_type");
        return input.value;
    }
    getScope(): string {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("txt_scope");
        return input.value;
    }
    getSubject(): string {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("txt_subject");
        return input.value;
    }
    getBody(): string {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("txa_body");
        return input.value;
    }
    getFooter(): string {
        let input: HTMLInputElement = <HTMLInputElement>this.DOM.getElementById("txa_footer");
        return input.value;
    }

    fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }
    copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    }
}
