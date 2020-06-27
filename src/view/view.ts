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
    this.DOM.getElementById("txt_subject").addEventListener(
      "input",
      userInputed
    );
    this.DOM.getElementById("txa_body").addEventListener("input", userInputed);
    this.DOM.getElementById("txa_footer").addEventListener(
      "input",
      userInputed
    );

    let self = this;
    this.DOM.getElementById("btn_copy").addEventListener("click", btnClicked);

    // Event Handler
    function userInputed() {
      self.presenter.toFormat();
      self.presenter.toCheckRule();
    }
    function btnClicked() {
      self.presenter.toFormatWithoutBr();
    }

    this.setPlaceholder();
    this.setTypes();
  }

  setTypes(): void {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("ddl_type")
    );

    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode("feat✨"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("fix🐛"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("perf⚡️"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("test✅"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("docs📝"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("refactor♻️"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("style💄"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("revert🔙"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("build📦"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("config🔧"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("git🐙"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("chore⚙️"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("init🎉"));
    input.appendChild(opt);

    opt = document.createElement("option");
    opt.appendChild(document.createTextNode("publish🚀"));
    input.appendChild(opt);
  }

  setPlaceholder(): void {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("ddl_type")
    );
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
      element.style.visibility = "hidden";
      element.style.position = "absolute";
    } else {
      element.style.visibility = "visible";
      element.style.position = "relative";
    }
  }

  // DOM Accessing
  getType(): string {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("ddl_type")
    );
    return input.value;
  }
  getScope(): string {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("txt_scope")
    );
    return input.value;
  }
  getSubject(): string {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("txt_subject")
    );
    return input.value;
  }
  getBody(): string {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("txa_body")
    );
    return input.value;
  }
  getFooter(): string {
    let input: HTMLInputElement = <HTMLInputElement>(
      this.DOM.getElementById("txa_footer")
    );
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
