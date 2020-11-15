import { IHistory } from "../interface/model/history.interface";
import { getCookie, setCookie, eraseCookie } from "./cookie";

export class History implements IHistory {
    cookie_name: string = "commitlint_history";
    history_entries: Array<[string, string, string, string, string]>;
    constructor() {
        try {
            let cookie = getCookie(this.cookie_name);
            if (cookie === undefined) {
                this.history_entries = [];
                console.log('There is no cookie of "commitlint_history". :(');
            } else {
                this.history_entries = JSON.parse(cookie);
            }
        } catch (error) {
            eraseCookie(this.cookie_name);
            this.history_entries = [];
            console.log("Cookie reseted.");
        }
    }
    addEntry(entry: [string, string, string, string, string]): number {
        if (this.checkDuplicate(entry)) {
            let index = -1;
            return index;
        }

        let index = this.history_entries.length;
        this.history_entries.push(entry);
        setCookie(this.cookie_name, JSON.stringify(this.history_entries));

        return index;
    }

    // stringArr =[type, scope, subject, body, footer]
    getEntry(index: number): [string, string, string, string, string] {
        return this.history_entries[index];
    }

    getAllEntry(): Array<[string, string, string, string, string]> {
        return this.history_entries;
    }

    checkDuplicate(
        new_entry: [string, string, string, string, string]
    ): boolean {
        let isDuplicate = false;

        this.history_entries.forEach((entry) => {
            if (
                entry[0] == new_entry[0] &&
                entry[1] == new_entry[1] &&
                entry[2] == new_entry[2] &&
                entry[3] == new_entry[3] &&
                entry[4] == new_entry[4]
            ) {
                isDuplicate = true;
            }
        });

        return isDuplicate;
    }
}
