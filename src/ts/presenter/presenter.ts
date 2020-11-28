import { IPresenter } from "../interface/presenter/presenter.interface";
import { IView } from "../interface/view/view.interface";
import { View } from "../view/view";
import { IFormatter } from "../interface/model/formatter.interface";
import { Formatter } from "../model/formatter";
import { ILinter } from "../interface/model/linter.interface";
import { Linter } from "../model/linter";
import { getTypesFromConfig } from "../model/getTypesFromConfig";
import { IHistory } from "../interface/model/history.interface";
import { History } from "../model/history";

export class Presenter implements IPresenter {
    private view: IView;
    private formatter: IFormatter;
    private linter: ILinter;
    private history: IHistory;

    constructor() {
        this.view = new View(document, this);
        this.formatter = new Formatter();
        this.linter = new Linter();
        this.history = new History();

        this.initialize();
    }

    // Sync View and Model
    initialize(): void {
        // Setup history entries
        const history_entry = this.history.getAllEntry();
        for (let i = 0; i < history_entry.length; i++) {
            let entry = history_entry[i];
            this.view.addHistoryEntry(
                i,
                this.formatter.format(
                    entry[0],
                    entry[1],
                    entry[2],
                    entry[3],
                    entry[4]
                )
            );
        }
    }

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

    addCurrentMessageAsOneHistoryEntry(): void {
        let index = this.history.addEntry([
            this.view.getType(),
            this.view.getScope(),
            this.view.getSubject(),
            this.view.getBody(),
            this.view.getFooter(),
        ]);
        if (index == -1) {
            return;
        }

        this.view.addHistoryEntry(
            index,
            this.formatter.format(
                this.view.getType(),
                this.view.getScope(),
                this.view.getSubject(),
                this.view.getBody(),
                this.view.getFooter()
            )
        );
    }

    deleteOneHistoryEntry(index: number): void {
        this.history.deleteEntry(index);
        this.view.clearAllHistoryEntry();
        this.initialize();
    }

    editHistoryEntry(index: number): void {
        let entry: [
            string,
            string,
            string,
            string,
            string
        ] = this.history.getEntry(index);
        this.view.setType(entry[0]);
        this.view.setScope(entry[1]);
        this.view.setSubject(entry[2]);
        this.view.setBody(entry[3]);
        this.view.setFooter(entry[4]);
    }

    toGetFormattedHistoryEntry(index: number): string {
        let entry = this.history.getEntry(index);
        return this.formatter.formatWithoutBr(
            entry[0],
            entry[1],
            entry[2],
            entry[3],
            entry[4]
        );
    }

    getTypes(): Array<string> {
        return getTypesFromConfig();
    }
}
