export interface IView {
    copyTextToClipboard(text: string): void;

    displayFormattedText(text: string): void;
    displayWarning(text: string): void;

    getType(): string;
    getScope(): string;
    getSubject(): string;
    getBody(): string;
    getFooter(): string;

    setType(text: string): void;
    setScope(text: string): void;
    setSubject(text: string): void;
    setBody(text: string): void;
    setFooter(text: string): void;

    addHistoryEntry(index: number, formatted_text: string): void;
    clearAllHistoryEntry(): void;
}
