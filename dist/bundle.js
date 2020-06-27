(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter/presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter/presenter":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.prototype.baseFormat = function (stringArr) {
        var out;
        var type = stringArr[0], scope = stringArr[1], subject = stringArr[2], body = stringArr[3], footer = stringArr[4];
        type = type.trim();
        scope = scope.trim();
        subject = subject.trim();
        body = body.trim();
        footer = footer.trim();
        out = [type, scope, subject, body, footer];
        return out;
    };
    Formatter.prototype.combinator = function (stringArr, newLineChar) {
        var out = "";
        var type = stringArr[0], scope = stringArr[1], subject = stringArr[2], body = stringArr[3], footer = stringArr[4];
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
    };
    Formatter.prototype.format = function (type, scope, subject, body, footer) {
        var _a;
        var out = "";
        _a = this.baseFormat([
            type,
            scope,
            subject,
            body,
            footer,
        ]), type = _a[0], scope = _a[1], subject = _a[2], body = _a[3], footer = _a[4];
        out = this.combinator([type, scope, subject, body, footer], "<br>");
        return out;
    };
    Formatter.prototype.formatWithoutBr = function (type, scope, subject, body, footer) {
        var _a;
        var out = "";
        _a = this.baseFormat([
            type,
            scope,
            subject,
            body,
            footer,
        ]), type = _a[0], scope = _a[1], subject = _a[2], body = _a[3], footer = _a[4];
        out = this.combinator([type, scope, subject, body, footer], "\n");
        return out;
    };
    return Formatter;
}());
exports.Formatter = Formatter;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Linter = (function () {
    function Linter() {
    }
    Linter.prototype.lint = function (stringArr) {
        var warning = "";
        var type = stringArr[0], scope = stringArr[1], subject = stringArr[2], body = stringArr[3], footer = stringArr[4];
        if (!this.IsTextLowerCaseCheck(subject)) {
            warning += "subject 行首字母不需要大寫。<br>";
        }
        if (!this.IsTextLenLimitCheck(subject, 50)) {
            warning += "subject 太長了，超過 50 個字元。<br>";
        }
        if (warning.length > 0) {
            warning = warning.slice(0, -4);
        }
        return warning;
    };
    Linter.prototype.IsTextLowerCaseCheck = function (text) {
        return text[0] == text[0].toLowerCase();
    };
    Linter.prototype.IsTextLenLimitCheck = function (text, LimitLen) {
        return text.length < LimitLen;
    };
    return Linter;
}());
exports.Linter = Linter;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../view/view");
var formatter_1 = require("../model/formatter");
var linter_1 = require("../model/linter");
var Presenter = (function () {
    function Presenter() {
        this.view = new view_1.View(document, this);
        this.formatter = new formatter_1.Formatter();
        this.linter = new linter_1.Linter();
        this.initialize();
    }
    Presenter.prototype.initialize = function () { };
    Presenter.prototype.toFormat = function () {
        this.view.displayFormattedText(this.formatter.format(this.view.getType(), this.view.getScope(), this.view.getSubject(), this.view.getBody(), this.view.getFooter()));
    };
    Presenter.prototype.toFormatWithoutBr = function () {
        this.view.copyTextToClipboard(this.formatter.formatWithoutBr(this.view.getType(), this.view.getScope(), this.view.getSubject(), this.view.getBody(), this.view.getFooter()));
    };
    Presenter.prototype.toCheckRule = function () {
        this.view.displayWarning(this.linter.lint([
            this.view.getType(),
            this.view.getScope(),
            this.view.getSubject(),
            this.view.getBody(),
            this.view.getFooter(),
        ]));
    };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"../model/formatter":2,"../model/linter":3,"../view/view":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(DOM, presenter) {
        this.presenter = presenter;
        this.DOM = DOM;
        this.DOM.getElementById("ddl_type").addEventListener("change", userInputed);
        this.DOM.getElementById("txt_scope").addEventListener("input", userInputed);
        this.DOM.getElementById("txt_subject").addEventListener("input", userInputed);
        this.DOM.getElementById("txa_body").addEventListener("input", userInputed);
        this.DOM.getElementById("txa_footer").addEventListener("input", userInputed);
        var self = this;
        this.DOM.getElementById("btn_copy").addEventListener("click", btnClicked);
        function userInputed() {
            self.presenter.toFormat();
            self.presenter.toCheckRule();
        }
        function btnClicked() {
            self.presenter.toFormatWithoutBr();
        }
        this.setPlaceholder();
        this.setTypes();
    }
    View.prototype.setTypes = function () {
        var input = (this.DOM.getElementById("ddl_type"));
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("feat✨"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("fix🐛"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("perf⚡️"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("test✅"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("docs📝"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("refactor♻️"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("style💄"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("revert🔙"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("build📦"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("config🔧"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("git🐙"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("chore⚙️"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("init🎉"));
        input.appendChild(opt);
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode("publish🚀"));
        input.appendChild(opt);
    };
    View.prototype.setPlaceholder = function () {
        var input = (this.DOM.getElementById("ddl_type"));
        var opt = document.createElement("option");
        opt.disabled = true;
        opt.selected = true;
        opt.appendChild(document.createTextNode("<type>"));
        input.appendChild(opt);
        input = this.DOM.getElementById("txt_scope");
        input.placeholder = "<scope>";
        input = this.DOM.getElementById("txt_subject");
        input.placeholder = "<subject>";
        input = this.DOM.getElementById("txa_body");
        input.placeholder = "<body>";
        input = this.DOM.getElementById("txa_footer");
        input.placeholder = "<footer>";
    };
    View.prototype.displayFormattedText = function (text) {
        this.DOM.getElementById("p_formatted").innerHTML = text;
    };
    View.prototype.displayWarning = function (text) {
        if (text === "") {
            this.toggleWarningVisibility(true);
        }
        else {
            this.toggleWarningVisibility(false);
            this.DOM.getElementById("p_warning").innerHTML = text;
        }
    };
    View.prototype.toggleWarningVisibility = function (isHidden) {
        var element = this.DOM.getElementById("p_warning");
        if (isHidden) {
            element.style.visibility = "hidden";
            element.style.position = "absolute";
        }
        else {
            element.style.visibility = "visible";
            element.style.position = "relative";
        }
    };
    View.prototype.getType = function () {
        var input = (this.DOM.getElementById("ddl_type"));
        return input.value;
    };
    View.prototype.getScope = function () {
        var input = (this.DOM.getElementById("txt_scope"));
        return input.value;
    };
    View.prototype.getSubject = function () {
        var input = (this.DOM.getElementById("txt_subject"));
        return input.value;
    };
    View.prototype.getBody = function () {
        var input = (this.DOM.getElementById("txa_body"));
        return input.value;
    };
    View.prototype.getFooter = function () {
        var input = (this.DOM.getElementById("txa_footer"));
        return input.value;
    };
    View.prototype.fallbackCopyTextToClipboard = function (text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        }
        catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }
        document.body.removeChild(textArea);
    };
    View.prototype.copyTextToClipboard = function (text) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            console.log("Async: Copying to clipboard was successful!");
        }, function (err) {
            console.error("Async: Could not copy text: ", err);
        });
    };
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbC9mb3JtYXR0ZXIudHMiLCJzcmMvbW9kZWwvbGludGVyLnRzIiwic3JjL3ByZXNlbnRlci9wcmVzZW50ZXIudHMiLCJzcmMvdmlldy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxtREFBaUQ7QUFFakQsSUFBSSxTQUFTLEdBQWUsSUFBSSxxQkFBUyxFQUFFLENBQUM7Ozs7O0FDRDVDO0lBQ0U7SUFBZSxDQUFDO0lBR2hCLDhCQUFVLEdBQVYsVUFDRSxTQUFtRDtRQUVuRCxJQUFJLEdBQTZDLENBQUM7UUFFN0MsSUFBQSxtQkFBSSxFQUFFLG9CQUFLLEVBQUUsc0JBQU8sRUFBRSxtQkFBSSxFQUFFLHFCQUFNLENBQWM7UUFFckQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUzQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFHRCw4QkFBVSxHQUFWLFVBQ0UsU0FBbUQsRUFDbkQsV0FBbUI7UUFFbkIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLElBQUEsbUJBQUksRUFBRSxvQkFBSyxFQUFFLHNCQUFPLEVBQUUsbUJBQUksRUFBRSxxQkFBTSxDQUFjO1FBRXJELEdBQUcsSUFBSSxJQUFJLENBQUM7UUFDWixJQUFJLEtBQUssSUFBSSxFQUFFLEVB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LFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQ0FBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsT0FBTztTQUNSO1FBQ0QsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUN0QztZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQ0QsVUFBVSxHQUFHO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0F0TkEsQUFzTkMsSUFBQTtBQXROWSxvQkFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IElQcmVzZW50ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvcHJlc2VudGVyL3ByZXNlbnRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuL3ByZXNlbnRlci9wcmVzZW50ZXJcIlxuXG52YXIgcHJlc2VudGVyOiBJUHJlc2VudGVyID0gbmV3IFByZXNlbnRlcigpOyIsImltcG9ydCB7IElGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL21vZGVsL2Zvcm1hdHRlci5pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEZvcm1hdHRlciBpbXBsZW1lbnRzIElGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gc3RyaW5nQXJyID1bdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl1cbiAgYmFzZUZvcm1hdChcbiAgICBzdHJpbmdBcnI6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ11cbiAgKTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7XG4gICAgbGV0IG91dDogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXTtcblxuICAgIGxldCBbdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl0gPSBzdHJpbmdBcnI7XG5cbiAgICB0eXBlID0gdHlwZS50cmltKCk7XG4gICAgc2NvcGUgPSBzY29wZS50cmltKCk7XG4gICAgc3ViamVjdCA9IHN1YmplY3QudHJpbSgpO1xuICAgIGJvZHkgPSBib2R5LnRyaW0oKTtcbiAgICBmb290ZXIgPSBmb290ZXIudHJpbSgpO1xuICAgIG91dCA9IFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXTtcblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICAvLyBzdHJpbmdBcnIgPVt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXVxuICBjb21iaW5hdG9yKFxuICAgIHN0cmluZ0FycjogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXSxcbiAgICBuZXdMaW5lQ2hhcjogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IG91dDogc3RyaW5nID0gXCJcIjtcbiAgICBsZXQgW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdID0gc3RyaW5nQXJyO1xuXG4gICAgb3V0ICs9IHR5cGU7XG4gICAgaWYgKHNjb3BlICE9IFwiXCIpIHtcbiAgICAgIG91dCArPSBcIihcIiArIHNjb3BlICsgXCIpXCI7XG4gICAgfVxuICAgIG91dCArPSBcIjogXCIgKyBzdWJqZWN0O1xuICAgIG91dCArPVxuICAgICAgYm9keSA9PSBcIlwiXG4gICAgICAgID8gXCJcIlxuICAgICAgICA6IG5ld0xpbmVDaGFyICsgbmV3TGluZUNoYXIgKyBib2R5LnNwbGl0KFwiXFxuXCIpLmpvaW4obmV3TGluZUNoYXIpO1xuICAgIG91dCArPVxuICAgICAgZm9vdGVyID09IFwiXCJcbiAgICAgICAgPyBcIlwiXG4gICAgICAgIDogbmV3TGluZUNoYXIgKyBuZXdMaW5lQ2hhciArIGZvb3Rlci5zcGxpdChcIlxcblwiKS5qb2luKG5ld0xpbmVDaGFyKTtcblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmb3JtYXQoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHNjb3BlOiBzdHJpbmcsXG4gICAgc3ViamVjdDogc3RyaW5nLFxuICAgIGJvZHk6IHN0cmluZyxcbiAgICBmb290ZXI6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIGxldCBvdXQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBbdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl0gPSB0aGlzLmJhc2VGb3JtYXQoW1xuICAgICAgdHlwZSxcbiAgICAgIHNjb3BlLFxuICAgICAgc3ViamVjdCxcbiAgICAgIGJvZHksXG4gICAgICBmb290ZXIsXG4gICAgXSk7XG5cbiAgICBvdXQgPSB0aGlzLmNvbWJpbmF0b3IoW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdLCBcIjxicj5cIik7XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZm9ybWF0V2l0aG91dEJyKFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBzY29wZTogc3RyaW5nLFxuICAgIHN1YmplY3Q6IHN0cmluZyxcbiAgICBib2R5OiBzdHJpbmcsXG4gICAgZm9vdGVyOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgb3V0OiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdID0gdGhpcy5iYXNlRm9ybWF0KFtcbiAgICAgIHR5cGUsXG4gICAgICBzY29wZSxcbiAgICAgIHN1YmplY3QsXG4gICAgICBib2R5LFxuICAgICAgZm9vdGVyLFxuICAgIF0pO1xuXG4gICAgb3V0ID0gdGhpcy5jb21iaW5hdG9yKFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSwgXCJcXG5cIik7XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJTGludGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9saW50ZXIuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBMaW50ZXIgaW1wbGVtZW50cyBJTGludGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8vIHN0cmluZ0FyciA9W3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdXG4gIGxpbnQoc3RyaW5nQXJyOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddKSB7XG4gICAgbGV0IHdhcm5pbmc6IHN0cmluZyA9IFwiXCI7XG4gICAgbGV0IFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSA9IHN0cmluZ0FycjtcblxuICAgIGlmICghdGhpcy5Jc1RleHRMb3dlckNhc2VDaGVjayhzdWJqZWN0KSkge1xuICAgICAgd2FybmluZyArPSBcInN1YmplY3Qg6KGM6aaW5a2X5q+N5LiN6ZyA6KaB5aSn5a+r44CCPGJyPlwiO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuSXNUZXh0TGVuTGltaXRDaGVjayhzdWJqZWN0LCA1MCkpIHtcbiAgICAgIHdhcm5pbmcgKz0gXCJzdWJqZWN0IOWkqumVt+S6hu+8jOi2hemBjiA1MCDlgIvlrZflhYPjgII8YnI+XCI7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZpbmcgbGFzdCA8YnI+XG4gICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMCkge1xuICAgICAgd2FybmluZyA9IHdhcm5pbmcuc2xpY2UoMCwgLTQpO1xuICAgIH1cblxuICAgIHJldHVybiB3YXJuaW5nO1xuICB9XG5cbiAgSXNUZXh0TG93ZXJDYXNlQ2hlY2sodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRleHRbMF0gPT0gdGV4dFswXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgSXNUZXh0TGVuTGltaXRDaGVjayh0ZXh0OiBzdHJpbmcsIExpbWl0TGVuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGV4dC5sZW5ndGggPCBMaW1pdExlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVByZXNlbnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvcHJlc2VudGVyL3ByZXNlbnRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2ludGVyZmFjZS92aWV3L3ZpZXcuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvdmlld1wiO1xuaW1wb3J0IHsgSUZvcm1hdHRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvbW9kZWwvZm9ybWF0dGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSBcIi4uL21vZGVsL2Zvcm1hdHRlclwiO1xuaW1wb3J0IHsgSUxpbnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvbW9kZWwvbGludGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTGludGVyIH0gZnJvbSBcIi4uL21vZGVsL2xpbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgUHJlc2VudGVyIGltcGxlbWVudHMgSVByZXNlbnRlciB7XG4gIHByaXZhdGUgdmlldzogSVZpZXc7XG4gIHByaXZhdGUgZm9ybWF0dGVyOiBJRm9ybWF0dGVyO1xuICBwcml2YXRlIGxpbnRlcjogSUxpbnRlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkb2N1bWVudCwgdGhpcyk7XG4gICAgdGhpcy5mb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyKCk7XG4gICAgdGhpcy5saW50ZXIgPSBuZXcgTGludGVyKCk7XG5cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8vIFN5bmMgVmlldyBhbmQgTW9kZWxcbiAgaW5pdGlhbGl6ZSgpOiB2b2lkIHt9XG5cbiAgdG9Gb3JtYXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3LmRpc3BsYXlGb3JtYXR0ZWRUZXh0KFxuICAgICAgdGhpcy5mb3JtYXR0ZXIuZm9ybWF0KFxuICAgICAgICB0aGlzLnZpZXcuZ2V0VHlwZSgpLFxuICAgICAgICB0aGlzLnZpZXcuZ2V0U2NvcGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFN1YmplY3QoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEJvZHkoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEZvb3RlcigpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHRvRm9ybWF0V2l0aG91dEJyKCk6IHZvaWQge1xuICAgIHRoaXMudmlldy5jb3B5VGV4dFRvQ2xpcGJvYXJkKFxuICAgICAgdGhpcy5mb3JtYXR0ZXIuZm9ybWF0V2l0aG91dEJyKFxuICAgICAgICB0aGlzLnZpZXcuZ2V0VHlwZSgpLFxuICAgICAgICB0aGlzLnZpZXcuZ2V0U2NvcGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFN1YmplY3QoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEJvZHkoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEZvb3RlcigpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHRvQ2hlY2tSdWxlKCk6IHZvaWQge1xuICAgIHRoaXMudmlldy5kaXNwbGF5V2FybmluZyhcbiAgICAgIHRoaXMubGludGVyLmxpbnQoW1xuICAgICAgICB0aGlzLnZpZXcuZ2V0VHlwZSgpLFxuICAgICAgICB0aGlzLnZpZXcuZ2V0U2NvcGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFN1YmplY3QoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEJvZHkoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldEZvb3RlcigpLFxuICAgICAgXSlcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9pbnRlcmZhY2Uvdmlldy92aWV3LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgSVByZXNlbnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvcHJlc2VudGVyL3ByZXNlbnRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuLi9wcmVzZW50ZXIvcHJlc2VudGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3IGltcGxlbWVudHMgSVZpZXcge1xuICBET006IERvY3VtZW50O1xuICBwcmVzZW50ZXI6IElQcmVzZW50ZXI7XG4gIGNvbnN0cnVjdG9yKERPTTogRG9jdW1lbnQsIHByZXNlbnRlcjogUHJlc2VudGVyKSB7XG4gICAgdGhpcy5wcmVzZW50ZXIgPSBwcmVzZW50ZXI7XG4gICAgdGhpcy5ET00gPSBET007XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJkZGxfdHlwZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVzZXJJbnB1dGVkKTtcbiAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4dF9zY29wZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXNlcklucHV0ZWQpO1xuICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHh0X3N1YmplY3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiaW5wdXRcIixcbiAgICAgIHVzZXJJbnB1dGVkXG4gICAgKTtcbiAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4YV9ib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1c2VySW5wdXRlZCk7XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfZm9vdGVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImlucHV0XCIsXG4gICAgICB1c2VySW5wdXRlZFxuICAgICk7XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJidG5fY29weVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuQ2xpY2tlZCk7XG5cbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgZnVuY3Rpb24gdXNlcklucHV0ZWQoKSB7XG4gICAgICBzZWxmLnByZXNlbnRlci50b0Zvcm1hdCgpO1xuICAgICAgc2VsZi5wcmVzZW50ZXIudG9DaGVja1J1bGUoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnRuQ2xpY2tlZCgpIHtcbiAgICAgIHNlbGYucHJlc2VudGVyLnRvRm9ybWF0V2l0aG91dEJyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRQbGFjZWhvbGRlcigpO1xuICAgIHRoaXMuc2V0VHlwZXMoKTtcbiAgfVxuXG4gIHNldFR5cGVzKCk6IHZvaWQge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiZGRsX3R5cGVcIilcbiAgICApO1xuXG4gICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiZmVhdOKcqFwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiZml48J+Qm1wiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwicGVyZuKaoe+4j1wiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwidGVzdOKchVwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiZG9jc/Cfk51cIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInJlZmFjdG9y4pm777iPXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJzdHlsZfCfkoRcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInJldmVydPCflJlcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImJ1aWxk8J+TplwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiY29uZmln8J+Up1wiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiZ2l08J+QmVwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiY2hvcmXimpnvuI9cIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImluaXTwn46JXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJwdWJsaXNo8J+agFwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcbiAgfVxuXG4gIHNldFBsYWNlaG9sZGVyKCk6IHZvaWQge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiZGRsX3R5cGVcIilcbiAgICApO1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5kaXNhYmxlZCA9IHRydWU7XG4gICAgb3B0LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCI8dHlwZT5cIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHh0X3Njb3BlXCIpO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCI8c2NvcGU+XCI7XG5cbiAgICBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHh0X3N1YmplY3RcIik7XG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBcIjxzdWJqZWN0PlwiO1xuXG4gICAgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4YV9ib2R5XCIpO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCI8Ym9keT5cIjtcblxuICAgIGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfZm9vdGVyXCIpO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCI8Zm9vdGVyPlwiO1xuICB9XG5cbiAgLy8gRE9NIE1hbmlwdWxhdGlvblxuICBkaXNwbGF5Rm9ybWF0dGVkVGV4dCh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInBfZm9ybWF0dGVkXCIpLmlubmVySFRNTCA9IHRleHQ7XG4gIH1cblxuICBkaXNwbGF5V2FybmluZyh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGV4dCA9PT0gXCJcIikge1xuICAgICAgdGhpcy50b2dnbGVXYXJuaW5nVmlzaWJpbGl0eSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b2dnbGVXYXJuaW5nVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInBfd2FybmluZ1wiKS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVdhcm5pbmdWaXNpYmlsaXR5KGlzSGlkZGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJwX3dhcm5pbmdcIik7XG5cbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NIEFjY2Vzc2luZ1xuICBnZXRUeXBlKCk6IHN0cmluZyB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJkZGxfdHlwZVwiKVxuICAgICk7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICB9XG4gIGdldFNjb3BlKCk6IHN0cmluZyB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eHRfc2NvcGVcIilcbiAgICApO1xuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgfVxuICBnZXRTdWJqZWN0KCk6IHN0cmluZyB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eHRfc3ViamVjdFwiKVxuICAgICk7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICB9XG4gIGdldEJvZHkoKTogc3RyaW5nIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4YV9ib2R5XCIpXG4gICAgKTtcbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gIH1cbiAgZ2V0Rm9vdGVyKCk6IHN0cmluZyB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfZm9vdGVyXCIpXG4gICAgKTtcbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gIH1cblxuICBmYWxsYmFja0NvcHlUZXh0VG9DbGlwYm9hcmQodGV4dCkge1xuICAgIHZhciB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0ZXh0QXJlYS52YWx1ZSA9IHRleHQ7XG5cbiAgICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gICAgdGV4dEFyZWEuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgdGV4dEFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgIHRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gICAgdGV4dEFyZWEuZm9jdXMoKTtcbiAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgc3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICAgIHZhciBtc2cgPSBzdWNjZXNzZnVsID8gXCJzdWNjZXNzZnVsXCIgOiBcInVuc3VjY2Vzc2Z1bFwiO1xuICAgICAgY29uc29sZS5sb2coXCJGYWxsYmFjazogQ29weWluZyB0ZXh0IGNvbW1hbmQgd2FzIFwiICsgbXNnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWxsYmFjazogT29wcywgdW5hYmxlIHRvIGNvcHlcIiwgZXJyKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcbiAgfVxuICBjb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICAgIHRoaXMuZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS50aGVuKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFzeW5jOiBDb3B5aW5nIHRvIGNsaXBib2FyZCB3YXMgc3VjY2Vzc2Z1bCFcIik7XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQXN5bmM6IENvdWxkIG5vdCBjb3B5IHRleHQ6IFwiLCBlcnIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==
