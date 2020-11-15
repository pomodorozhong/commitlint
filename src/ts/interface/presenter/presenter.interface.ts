export interface IPresenter {
    initialize(): void;
    toFormat(): void;
    toFormatWithoutBr(): void;
    toCheckRule(): void;
    getTypes(): Array<string>;
    addCurrentMessageAsOneHistoryEntry(): void;
    toGetFormattedHistoryEntry(index: number): string;
}
