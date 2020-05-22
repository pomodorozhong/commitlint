import { IFormatter } from "../interface/model/formatter.interface";

export class Formatter implements IFormatter {
    constructor() {
    }

    format(
        type: string,
        scope: string,
        subject: string,
        body: string,
        footer: string
    ): string {
        let out: string = "";

        out += type;
        if (scope != "") {
            out += "(" + scope + ")";
        }
        out += ": " + subject;
        out += body == "" ? "" : "<br><br>" + body.split("\n").join("<br>");
        out += footer == "" ? "" : "<br><br>" + footer.split("\n").join("<br>");

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

        out += type;
        if (scope != "") {
            out += "(" + scope + ")";
        }
        out += ": " + subject;
        out += body == "" ? "" : "\n\n" + body;
        out += footer == "" ? "" : "\n\n" + footer;

        return out;
    }
}