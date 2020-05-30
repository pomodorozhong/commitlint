export interface IFormatter {
  // stringArr =[type, scope, subject, body, footer]
  baseFormat(
    stringArr: [string, string, string, string, string]
  ): [string, string, string, string, string];

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
