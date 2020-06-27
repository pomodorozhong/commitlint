export interface ILinter {

    // stringArr =[type, scope, subject, body, footer]
    lint(stringArr: [string, string, string, string, string]);
}