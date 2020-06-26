import { ILinter } from "../interface/model/linter.interface";

export class Linter implements ILinter {
  constructor() {}

  // stringArr =[type, scope, subject, body, footer]
  lint(stringArr: [string, string, string, string, string]) {
    let warning: string = "";
    let [type, scope, subject, body, footer] = stringArr;

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

  IsTextLowerCaseCheck(text: string): boolean {
    return text[0] == text[0].toLowerCase();
  }

  IsTextLenLimitCheck(text: string, LimitLen: number): boolean {
    return text.length < LimitLen;
  }
}
