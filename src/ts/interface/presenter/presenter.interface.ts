export interface IPresenter {
    initialize(): void;
    toFormat(): void;
    toFormatWithoutBr(): void;
    toCheckRule(): void;
    getTypes(): Array<string>;
    addCurrentMessageAsOneHistoryEntry(): void;
    deleteOneHistoryEntry(index: number): void;
    editHistoryEntry(index: number): void;
    toGetFormattedHistoryEntry(index: number): string;
}
