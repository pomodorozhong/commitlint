import { IFormatter } from "../interface/model/formatter.interface";

export class Formatter implements IFormatter {
  constructor() {}

  // stringArr =[type, scope, subject, body, footer]
  baseFormat(
    stringArr: [string, string, string, string, string]
  ): [string, string, string, string, string] {
    let out: [string, string, string, string, string];

    let [type, scope, subject, body, footer] = stringArr;

    // type = type.trim();
    // scope = scope.trim();
    // subject = subject.trim();
    // body = body.trim();
    // footer = footer.trim();
    out = [type, scope, subject, body, footer];

    return out;
  }

  // stringArr =[type, scope, subject, body, footer]
  combinator(
    stringArr: [string, string, string, string, string],
    newLineChar: string
  ): string {
    let out: string = "";
    let [type, scope, subject, body, footer] = stringArr;

    out += type;
    if (scope != "") {
      out += "(" + scope + ")";
    }
    out += ": " + subject;
    out +=
      body == ""
        ? ""
        : newLineChar + newLineChar + body.split("\n").join(newLineChar);
    out +=
      footer == ""
        ? ""
        : newLineChar + newLineChar + footer.split("\n").join(newLineChar);

    return out;
  }

  format(
    type: string,
    scope: string,
    subject: string,
    body: string,
    footer: string
  ): string {
    let out: string = "";

    [type, scope, subject, body, footer] = this.baseFormat([
      type,
      scope,
      subject,
      body,
      footer,
    ]);

    out = this.combinator([type, scope, subject, body, footer], "<br>");

    return out;
  }

  formatWithoutBr(
    type: string,
    scope: string,
    subject: string,
    body: string,
    footer: string
  ): string {
    let out: string = "";

    [type, scope, subject, body, footer] = this.baseFormat([
      type,
      scope,
      subject,
      body,
      footer,
    ]);

    out = this.combinator([type, scope, subject, body, footer], "\n");

    return out;
  }
}
