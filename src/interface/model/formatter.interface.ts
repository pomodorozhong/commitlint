export interface IFormatter {
    format(
        type: string,
        scope: string,
        subject: string,
        body: string,
        footer: string
    ): string;


    formatWithoutBr(
        type: string,
        scope: string,
        subject: string,
        body: string,
        footer: string
    ): string;
}