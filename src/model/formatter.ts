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
        out += ": " + subject + "<br><br>";
        out += body + "<br><br>";
        out += footer;

        return out;
    }
}