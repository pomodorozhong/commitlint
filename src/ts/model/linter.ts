import { ILinter } from "../interface/model/linter.interface";
import { Formatter } from "./formatter";
import { IFormatter } from "../interface/model/formatter.interface";

export class Linter implements ILinter {
    constructor() {}

    // stringArr =[type, scope, subject, body, footer]
    lint(stringArr: [string, string, string, string, string]) {
        let warning: string = "";
        let [type, scope, subject, body, footer] = stringArr;

        let formatter: IFormatter = new Formatter();
        [type, scope, subject, body, footer] = formatter.baseFormat([
            type,
            scope,
            subject,
            body,
            footer,
        ]);

        if (!this.IsTextLowerCaseCheck(subject)) {
            warning += "subject 行首字母不需要大寫。<br>";
        }
        if (!this.IsTextLenLimitCheck(subject, 50)) {
            warning += "subject 太長了，超過 50 個字元。<br>";
        }

        // removing last <br>
        if (warning.length > 0) {
            warning = warning.slice(0, -4);
        }

        return warning;
    }

    IsTextLowerCaseCheck(text: string | undefined): boolean {
        let isValid = false;
        if (text == undefined || text.length == 0) {
            isValid = true;
        } else {
            isValid = text[0] == text[0].toLowerCase();
        }
        return isValid;
    }

    IsTextLenLimitCheck(text: string, LimitLen: number): boolean {
        return text.length < LimitLen;
    }
}
