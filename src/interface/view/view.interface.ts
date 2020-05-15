export interface IView {
    displayFormattedText(text: string): void;
    displayWarning(text: string): void;

    getType(): string;
    getScope(): string;
    getSubject(): string;
    getBody(): string;
    getFooter(): string;
}