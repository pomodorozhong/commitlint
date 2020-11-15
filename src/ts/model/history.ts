import { IHistory } from "../interface/model/history.interface";

export class History implements IHistory {
    history_entries: Array<[string, string, string, string, string]>;
    constructor() {
        this.history_entries = [];
    }
    addEntry(entry: [string, string, string, string, string]): number {
        let index = this.history_entries.length;
        this.history_entries.push(entry);

        return index;
    }

    // stringArr =[type, scope, subject, body, footer]
    getEntry(index: number): [string, string, string, string, string] {
        return this.history_entries[index];
    }
}
