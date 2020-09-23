import { IPresenter } from "../interface/presenter/presenter.interface";
import { IView } from "../interface/view/view.interface";
import { View } from "../view/view";
import { IFormatter } from "../interface/model/formatter.interface";
import { Formatter } from "../model/formatter";
import { ILinter } from "../interface/model/linter.interface";
import { Linter } from "../model/linter";
import { getTypesFromConfig } from "../model/getTypesFromConfig";

export class Presenter implements IPresenter {
  private view: IView;
  private formatter: IFormatter;
  private linter: ILinter;

  constructor() {
    this.view = new View(document, this);
    this.formatter = new Formatter();
    this.linter = new Linter();

    this.initialize();
  }

  // Sync View and Model
  initialize(): void {}

  toFormat(): void {
    this.view.displayFormattedText(
      this.formatter.format(
        this.view.getType(),
        this.view.getScope(),
        this.view.getSubject(),
        this.view.getBody(),
        this.view.getFooter()
      )
    );
  }

  toFormatWithoutBr(): void {
    this.view.copyTextToClipboard(
      this.formatter.formatWithoutBr(
        this.view.getType(),
        this.view.getScope(),
        this.view.getSubject(),
        this.view.getBody(),
        this.view.getFooter()
      )
    );
  }

  toCheckRule(): void {
    this.view.displayWarning(
      this.linter.lint([
        this.view.getType(),
        this.view.getScope(),
        this.view.getSubject(),
        this.view.getBody(),
        this.view.getFooter(),
      ])
    );
  }

  getTypes(): Array<string> {
    return getTypesFromConfig();
  }
}
