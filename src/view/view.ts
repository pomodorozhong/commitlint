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
            .getElementById("ddl_type")
            .addEventListener("change", userInputed);
        this.DOM
            .getElementById("txt_scope")
            .addEventListener("input", userInputed);
        this.DOM
            .getElementById("txt_subject")
            .addEventListener("input", userInputed);
        this.DOM
            .getElementById("txa_body")
            .addEventListener("input", userInputed);
        this.DOM
            .getElementById("txa_footer")
            .addEventListener("input", userInputed);

        var self = this;

        // Event Handler
        function userInputed() {
            self.presenter.toFormat();
        }

        this.setPlaceholder();
        this.setTypes();
    }

    setTypes(): void {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("ddl_type");

        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode('feat✨'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('fix🐛'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('perf⚡️'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('test✅'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('docs📝'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('refactor♻️'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('style💄'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('revert🔙'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('build📦'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('config🔧'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('git🐙'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('chore⚙️'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('init🎉'));
        input.appendChild(opt);
        
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode('publish🚀'));
        input.appendChild(opt);        
    }

    setPlaceholder(): void {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("ddl_type");
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode('<type>'));
        input.appendChild(opt);

        input = <HTMLInputElement>this.DOM.getElementById("txt_scope");
        input.placeholder = "<scope>"

        input = <HTMLInputElement>this.DOM.getElementById("txt_subject");
        input.placeholder = "<subject>"

        input = <HTMLInputElement>this.DOM.getElementById("txa_body");
        input.placeholder = "<body>"

        input = <HTMLInputElement>this.DOM.getElementById("txa_footer");
        input.placeholder = "<footer>"

    }

    // DOM Manipulation
    displayFormattedText(text: string): void {
        this.DOM.getElementById("p_formatted").innerHTML = text;
    }

    displayWarning(text: string): void {

    }


    // DOM Accessing
    getType(): string {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("ddl_type");
        return input.value;
    }
    getScope(): string {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("txt_scope");
        return input.value;
    }
    getSubject(): string {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("txt_subject");
        return input.value;
    }
    getBody(): string {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("txa_body");
        return input.value;
    }
    getFooter(): string {
        let input: HTMLInputElement =
            <HTMLInputElement>this.DOM.getElementById("txa_footer");
        return input.value;
    }
}