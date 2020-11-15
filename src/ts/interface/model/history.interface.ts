export interface IHistory {
    // stringArr =[type, scope, subject, body, footer]
    // return index
    addEntry(stringArr: [string, string, string, string, string]): number;

    getEntry(index: number): [string, string, string, string, string];
}
