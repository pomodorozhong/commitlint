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
var formatter_1 = require("./formatter");
var Linter = (function () {
    function Linter() {
    }
    Linter.prototype.lint = function (stringArr) {
        var _a;
        var warning = "";
        var type = stringArr[0], scope = stringArr[1], subject = stringArr[2], body = stringArr[3], footer = stringArr[4];
        var formatter = new formatter_1.Formatter();
        _a = formatter.baseFormat([
            type,
            scope,
            subject,
            body,
            footer,
        ]), type = _a[0], scope = _a[1], subject = _a[2], body = _a[3], footer = _a[4];
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

},{"./formatter":2}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbC9mb3JtYXR0ZXIudHMiLCJzcmMvbW9kZWwvbGludGVyLnRzIiwic3JjL3ByZXNlbnRlci9wcmVzZW50ZXIudHMiLCJzcmMvdmlldy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxtREFBaUQ7QUFFakQsSUFBSSxTQUFTLEdBQWUsSUFBSSxxQkFBUyxFQUFFLENBQUM7Ozs7O0FDRDVDO0lBQ0U7SUFBZSxDQUFDO0lBR2hCLDhCQUFVLEdBQVYsVUFDRSxTQUFtRDtRQUVuRCxJQUFJLEdBQTZDLENBQUM7UUFFN0MsSUFBQSxtQkFBSSxFQUFFLG9CQUFLLEVBQUUsc0JBQU8sRUFBRSxtQkFBSSxFQUFFLHFCQUFNLENBQWM7UUFFckQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUzQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFHRCw4QkFBVSxHQUFWLFVBQ0UsU0FBbUQsRUFDbkQsV0FBbUI7UUFFbkIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLElBQUEsbUJBQUksRUFBRSxvQkFBSyxFQUFFLHNCQUFPLEVBQUUsbUJBQUksRUFBRSxxQkFBTSxDQUFjO1FBRXJELEdBQUcsSUFBSSxJQUFJLENBQUM7UUFDWixJQUFJLEtBQUssSUFBSSxFQUFFLEVB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QUFDLENBQUM7U0FDMUQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsa0NBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE9BQU87U0FDUjtRQUNELFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDdEM7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUNELFVBQVUsR0FBRztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBQ0gsV0FBQztBQUFELENBdE5BLEFBc05DLElBQUE7QUF0Tlksb0JBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBJUHJlc2VudGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXIvcHJlc2VudGVyXCJcblxudmFyIHByZXNlbnRlcjogSVByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoKTsiLCJpbXBvcnQgeyBJRm9ybWF0dGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9mb3JtYXR0ZXIuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBGb3JtYXR0ZXIgaW1wbGVtZW50cyBJRm9ybWF0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8vIHN0cmluZ0FyciA9W3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdXG4gIGJhc2VGb3JtYXQoXG4gICAgc3RyaW5nQXJyOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddXG4gICk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10ge1xuICAgIGxldCBvdXQ6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG5cbiAgICBsZXQgW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdID0gc3RyaW5nQXJyO1xuXG4gICAgdHlwZSA9IHR5cGUudHJpbSgpO1xuICAgIHNjb3BlID0gc2NvcGUudHJpbSgpO1xuICAgIHN1YmplY3QgPSBzdWJqZWN0LnRyaW0oKTtcbiAgICBib2R5ID0gYm9keS50cmltKCk7XG4gICAgZm9vdGVyID0gZm9vdGVyLnRyaW0oKTtcbiAgICBvdXQgPSBbdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl07XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLy8gc3RyaW5nQXJyID1bdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl1cbiAgY29tYmluYXRvcihcbiAgICBzdHJpbmdBcnI6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10sXG4gICAgbmV3TGluZUNoYXI6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIGxldCBvdXQ6IHN0cmluZyA9IFwiXCI7XG4gICAgbGV0IFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSA9IHN0cmluZ0FycjtcblxuICAgIG91dCArPSB0eXBlO1xuICAgIGlmIChzY29wZSAhPSBcIlwiKSB7XG4gICAgICBvdXQgKz0gXCIoXCIgKyBzY29wZSArIFwiKVwiO1xuICAgIH1cbiAgICBvdXQgKz0gXCI6IFwiICsgc3ViamVjdDtcbiAgICBvdXQgKz1cbiAgICAgIGJvZHkgPT0gXCJcIlxuICAgICAgICA/IFwiXCJcbiAgICAgICAgOiBuZXdMaW5lQ2hhciArIG5ld0xpbmVDaGFyICsgYm9keS5zcGxpdChcIlxcblwiKS5qb2luKG5ld0xpbmVDaGFyKTtcbiAgICBvdXQgKz1cbiAgICAgIGZvb3RlciA9PSBcIlwiXG4gICAgICAgID8gXCJcIlxuICAgICAgICA6IG5ld0xpbmVDaGFyICsgbmV3TGluZUNoYXIgKyBmb290ZXIuc3BsaXQoXCJcXG5cIikuam9pbihuZXdMaW5lQ2hhcik7XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZm9ybWF0KFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBzY29wZTogc3RyaW5nLFxuICAgIHN1YmplY3Q6IHN0cmluZyxcbiAgICBib2R5OiBzdHJpbmcsXG4gICAgZm9vdGVyOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgb3V0OiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdID0gdGhpcy5iYXNlRm9ybWF0KFtcbiAgICAgIHR5cGUsXG4gICAgICBzY29wZSxcbiAgICAgIHN1YmplY3QsXG4gICAgICBib2R5LFxuICAgICAgZm9vdGVyLFxuICAgIF0pO1xuXG4gICAgb3V0ID0gdGhpcy5jb21iaW5hdG9yKFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSwgXCI8YnI+XCIpO1xuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRCcihcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgc2NvcGU6IHN0cmluZyxcbiAgICBzdWJqZWN0OiBzdHJpbmcsXG4gICAgYm9keTogc3RyaW5nLFxuICAgIGZvb3Rlcjogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IG91dDogc3RyaW5nID0gXCJcIjtcblxuICAgIFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSA9IHRoaXMuYmFzZUZvcm1hdChbXG4gICAgICB0eXBlLFxuICAgICAgc2NvcGUsXG4gICAgICBzdWJqZWN0LFxuICAgICAgYm9keSxcbiAgICAgIGZvb3RlcixcbiAgICBdKTtcblxuICAgIG91dCA9IHRoaXMuY29tYmluYXRvcihbdHlwZSwgc2NvcGUsIHN1YmplY3QsIGJvZHksIGZvb3Rlcl0sIFwiXFxuXCIpO1xuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUxpbnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvbW9kZWwvbGludGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSBcIi4vZm9ybWF0dGVyXCI7XG5pbXBvcnQgeyBJRm9ybWF0dGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9mb3JtYXR0ZXIuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBMaW50ZXIgaW1wbGVtZW50cyBJTGludGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8vIHN0cmluZ0FyciA9W3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdXG4gIGxpbnQoc3RyaW5nQXJyOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddKSB7XG4gICAgbGV0IHdhcm5pbmc6IHN0cmluZyA9IFwiXCI7XG4gICAgbGV0IFt0eXBlLCBzY29wZSwgc3ViamVjdCwgYm9keSwgZm9vdGVyXSA9IHN0cmluZ0FycjtcblxuICAgIGxldCBmb3JtYXR0ZXI6IElGb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyKCk7XG4gICAgW3R5cGUsIHNjb3BlLCBzdWJqZWN0LCBib2R5LCBmb290ZXJdID0gZm9ybWF0dGVyLmJhc2VGb3JtYXQoW1xuICAgICAgdHlwZSxcbiAgICAgIHNjb3BlLFxuICAgICAgc3ViamVjdCxcbiAgICAgIGJvZHksXG4gICAgICBmb290ZXIsXG4gICAgXSk7XG5cbiAgICBpZiAoIXRoaXMuSXNUZXh0TG93ZXJDYXNlQ2hlY2soc3ViamVjdCkpIHtcbiAgICAgIHdhcm5pbmcgKz0gXCJzdWJqZWN0IOihjOmmluWtl+avjeS4jemcgOimgeWkp+Wvq+OAgjxicj5cIjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLklzVGV4dExlbkxpbWl0Q2hlY2soc3ViamVjdCwgNTApKSB7XG4gICAgICB3YXJuaW5nICs9IFwic3ViamVjdCDlpKrplbfkuobvvIzotoXpgY4gNTAg5YCL5a2X5YWD44CCPGJyPlwiO1xuICAgIH1cblxuICAgIC8vIHJlbW92aW5nIGxhc3QgPGJyPlxuICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHdhcm5pbmcgPSB3YXJuaW5nLnNsaWNlKDAsIC00KTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2FybmluZztcbiAgfVxuXG4gIElzVGV4dExvd2VyQ2FzZUNoZWNrKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0ZXh0WzBdID09IHRleHRbMF0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIElzVGV4dExlbkxpbWl0Q2hlY2sodGV4dDogc3RyaW5nLCBMaW1pdExlbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRleHQubGVuZ3RoIDwgTGltaXRMZW47XG4gIH1cbn1cbiIsImltcG9ydCB7IElQcmVzZW50ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9pbnRlcmZhY2Uvdmlldy92aWV3LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuLi92aWV3L3ZpZXdcIjtcbmltcG9ydCB7IElGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL21vZGVsL2Zvcm1hdHRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gXCIuLi9tb2RlbC9mb3JtYXR0ZXJcIjtcbmltcG9ydCB7IElMaW50ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL21vZGVsL2xpbnRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IExpbnRlciB9IGZyb20gXCIuLi9tb2RlbC9saW50ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFByZXNlbnRlciBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xuICBwcml2YXRlIHZpZXc6IElWaWV3O1xuICBwcml2YXRlIGZvcm1hdHRlcjogSUZvcm1hdHRlcjtcbiAgcHJpdmF0ZSBsaW50ZXI6IElMaW50ZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoZG9jdW1lbnQsIHRoaXMpO1xuICAgIHRoaXMuZm9ybWF0dGVyID0gbmV3IEZvcm1hdHRlcigpO1xuICAgIHRoaXMubGludGVyID0gbmV3IExpbnRlcigpO1xuXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvLyBTeW5jIFZpZXcgYW5kIE1vZGVsXG4gIGluaXRpYWxpemUoKTogdm9pZCB7fVxuXG4gIHRvRm9ybWF0KCk6IHZvaWQge1xuICAgIHRoaXMudmlldy5kaXNwbGF5Rm9ybWF0dGVkVGV4dChcbiAgICAgIHRoaXMuZm9ybWF0dGVyLmZvcm1hdChcbiAgICAgICAgdGhpcy52aWV3LmdldFR5cGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFNjb3BlKCksXG4gICAgICAgIHRoaXMudmlldy5nZXRTdWJqZWN0KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRCb2R5KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRGb290ZXIoKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICB0b0Zvcm1hdFdpdGhvdXRCcigpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcuY29weVRleHRUb0NsaXBib2FyZChcbiAgICAgIHRoaXMuZm9ybWF0dGVyLmZvcm1hdFdpdGhvdXRCcihcbiAgICAgICAgdGhpcy52aWV3LmdldFR5cGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFNjb3BlKCksXG4gICAgICAgIHRoaXMudmlldy5nZXRTdWJqZWN0KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRCb2R5KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRGb290ZXIoKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICB0b0NoZWNrUnVsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcuZGlzcGxheVdhcm5pbmcoXG4gICAgICB0aGlzLmxpbnRlci5saW50KFtcbiAgICAgICAgdGhpcy52aWV3LmdldFR5cGUoKSxcbiAgICAgICAgdGhpcy52aWV3LmdldFNjb3BlKCksXG4gICAgICAgIHRoaXMudmlldy5nZXRTdWJqZWN0KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRCb2R5KCksXG4gICAgICAgIHRoaXMudmlldy5nZXRGb290ZXIoKSxcbiAgICAgIF0pXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVZpZXcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ZpZXcvdmlldy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IElQcmVzZW50ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi4vcHJlc2VudGVyL3ByZXNlbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcbiAgRE9NOiBEb2N1bWVudDtcbiAgcHJlc2VudGVyOiBJUHJlc2VudGVyO1xuICBjb25zdHJ1Y3RvcihET006IERvY3VtZW50LCBwcmVzZW50ZXI6IFByZXNlbnRlcikge1xuICAgIHRoaXMucHJlc2VudGVyID0gcHJlc2VudGVyO1xuICAgIHRoaXMuRE9NID0gRE9NO1xuICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiZGRsX3R5cGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1c2VySW5wdXRlZCk7XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eHRfc2NvcGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVzZXJJbnB1dGVkKTtcbiAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4dF9zdWJqZWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImlucHV0XCIsXG4gICAgICB1c2VySW5wdXRlZFxuICAgICk7XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXNlcklucHV0ZWQpO1xuICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHhhX2Zvb3RlclwiKS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJpbnB1dFwiLFxuICAgICAgdXNlcklucHV0ZWRcbiAgICApO1xuXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiYnRuX2NvcHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkNsaWNrZWQpO1xuXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIGZ1bmN0aW9uIHVzZXJJbnB1dGVkKCkge1xuICAgICAgc2VsZi5wcmVzZW50ZXIudG9Gb3JtYXQoKTtcbiAgICAgIHNlbGYucHJlc2VudGVyLnRvQ2hlY2tSdWxlKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ0bkNsaWNrZWQoKSB7XG4gICAgICBzZWxmLnByZXNlbnRlci50b0Zvcm1hdFdpdGhvdXRCcigpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIoKTtcbiAgICB0aGlzLnNldFR5cGVzKCk7XG4gIH1cblxuICBzZXRUeXBlcygpOiB2b2lkIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcImRkbF90eXBlXCIpXG4gICAgKTtcblxuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImZlYXTinKhcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImZpePCfkJtcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInBlcmbimqHvuI9cIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInRlc3TinIVcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImRvY3Pwn5OdXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJyZWZhY3RvcuKZu++4j1wiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwic3R5bGXwn5KEXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJyZXZlcnTwn5SZXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJidWlsZPCfk6ZcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImNvbmZpZ/CflKdcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImdpdPCfkJlcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcImNob3Jl4pqZ77iPXCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJpbml08J+OiVwiKSk7XG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwicHVibGlzaPCfmoBcIikpO1xuICAgIGlucHV0LmFwcGVuZENoaWxkKG9wdCk7XG4gIH1cblxuICBzZXRQbGFjZWhvbGRlcigpOiB2b2lkIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICB0aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcImRkbF90eXBlXCIpXG4gICAgKTtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIG9wdC5zZWxlY3RlZCA9IHRydWU7XG4gICAgb3B0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiPHR5cGU+XCIpKTtcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4dF9zY29wZVwiKTtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiPHNjb3BlPlwiO1xuXG4gICAgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4dF9zdWJqZWN0XCIpO1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCI8c3ViamVjdD5cIjtcblxuICAgIGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfYm9keVwiKTtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiPGJvZHk+XCI7XG5cbiAgICBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHhhX2Zvb3RlclwiKTtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiPGZvb3Rlcj5cIjtcbiAgfVxuXG4gIC8vIERPTSBNYW5pcHVsYXRpb25cbiAgZGlzcGxheUZvcm1hdHRlZFRleHQodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJwX2Zvcm1hdHRlZFwiKS5pbm5lckhUTUwgPSB0ZXh0O1xuICB9XG5cbiAgZGlzcGxheVdhcm5pbmcodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRleHQgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMudG9nZ2xlV2FybmluZ1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9nZ2xlV2FybmluZ1Zpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJwX3dhcm5pbmdcIikuaW5uZXJIVE1MID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVXYXJuaW5nVmlzaWJpbGl0eShpc0hpZGRlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwicF93YXJuaW5nXCIpO1xuXG4gICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIERPTSBBY2Nlc3NpbmdcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiZGRsX3R5cGVcIilcbiAgICApO1xuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgfVxuICBnZXRTY29wZSgpOiBzdHJpbmcge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHh0X3Njb3BlXCIpXG4gICAgKTtcbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gIH1cbiAgZ2V0U3ViamVjdCgpOiBzdHJpbmcge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHh0X3N1YmplY3RcIilcbiAgICApO1xuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgfVxuICBnZXRCb2R5KCk6IHN0cmluZyB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgdGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfYm9keVwiKVxuICAgICk7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICB9XG4gIGdldEZvb3RlcigpOiBzdHJpbmcge1xuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwidHhhX2Zvb3RlclwiKVxuICAgICk7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICB9XG5cbiAgZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpIHtcbiAgICB2YXIgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuXG4gICAgLy8gQXZvaWQgc2Nyb2xsaW5nIHRvIGJvdHRvbVxuICAgIHRleHRBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgIHRleHRBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICB0ZXh0QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgIHRleHRBcmVhLmZvY3VzKCk7XG4gICAgdGV4dEFyZWEuc2VsZWN0KCk7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG4gICAgICB2YXIgbXNnID0gc3VjY2Vzc2Z1bCA/IFwic3VjY2Vzc2Z1bFwiIDogXCJ1bnN1Y2Nlc3NmdWxcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiRmFsbGJhY2s6IENvcHlpbmcgdGV4dCBjb21tYW5kIHdhcyBcIiArIG1zZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2s6IE9vcHMsIHVuYWJsZSB0byBjb3B5XCIsIGVycik7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XG4gIH1cbiAgY29weVRleHRUb0NsaXBib2FyZCh0ZXh0KSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XG4gICAgICB0aGlzLmZhbGxiYWNrQ29weVRleHRUb0NsaXBib2FyZCh0ZXh0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCkudGhlbihcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBc3luYzogQ29weWluZyB0byBjbGlwYm9hcmQgd2FzIHN1Y2Nlc3NmdWwhXCIpO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkFzeW5jOiBDb3VsZCBub3QgY29weSB0ZXh0OiBcIiwgZXJyKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=
