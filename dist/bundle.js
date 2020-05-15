(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter/presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter/presenter":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.prototype.format = function (type, scope, subject, body, footer) {
        var out;
        return out;
    };
    return Formatter;
}());
exports.Formatter = Formatter;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../view/view");
var formatter_1 = require("../model/formatter");
var Presenter = (function () {
    function Presenter() {
        this.view = new view_1.View(document, this);
        this.formatter = new formatter_1.Formatter();
        this.initialize();
    }
    Presenter.prototype.initialize = function () {
    };
    Presenter.prototype.toFormat = function () {
        console.log("2020/05/14 test");
    };
    Presenter.prototype.toCheckRule = function () { };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"../model/formatter":2,"../view/view":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(DOM, presenter) {
        this.presenter = presenter;
        this.DOM = DOM;
        this.DOM
            .getElementById("txt_scope")
            .addEventListener("input", userInputed);
        var self = this;
        function userInputed() {
            self.presenter.toFormat();
        }
    }
    View.prototype.displayFormattedText = function (text) {
    };
    View.prototype.displayWarning = function (text) {
    };
    View.prototype.getType = function () {
        var input = this.DOM.getElementById("ddl_type");
        return input.value;
    };
    View.prototype.getScope = function () {
        var input = this.DOM.getElementById("txt_scope");
        return input.value;
    };
    View.prototype.getSubject = function () {
        var input = this.DOM.getElementById("txt_subject");
        return input.value;
    };
    View.prototype.getBody = function () {
        var input = this.DOM.getElementById("txa_body");
        return input.value;
    };
    View.prototype.getFooter = function () {
        var input = this.DOM.getElementById("txa_footer");
        return input.value;
    };
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbC9mb3JtYXR0ZXIudHMiLCJzcmMvcHJlc2VudGVyL3ByZXNlbnRlci50cyIsInNyYy92aWV3L3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLG1EQUFpRDtBQUVqRCxJQUFJLFNBQVMsR0FBZSxJQUFJLHFCQUFTLEVBQUUsQ0FBQzs7Ozs7QUNENUM7SUFDSTtJQUNBLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQ0ksSUFBWSxFQUNaLEtBQWEsRUFDYixPQUFlLEVBQ2YsSUFBWSxFQUNaLE1BQWM7UUFFZCxJQUFJLEdBQVcsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCxnQkFBQztBQUFELENBZEEsQUFjQyxJQUFBO0FBZFksOEJBQVM7Ozs7O0FDQXRCLHFDQUFtQztBQUVuQyxnREFBK0M7QUFFL0M7SUFJSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHRCw4QkFBVSxHQUFWO0lBRUEsQ0FBQztJQUVELDRCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELCtCQUFXLEdBQVgsY0FBc0IsQ0FBQztJQUMzQixnQkFBQztBQUFELENBckJBLEFBcUJDLElBQUE7QUFyQlksOEJBQVM7Ozs7O0FDRnRCO0lBR0ksY0FBWSxHQUFhLEVBQUUsU0FBb0I7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRzthQUNILGNBQWMsQ0FBQyxXQUFXLENBQUM7YUFDM0IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUdoQixTQUFTLFdBQVc7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUdELG1DQUFvQixHQUFwQixVQUFxQixJQUFZO0lBRWpDLENBQUM7SUFFRCw2QkFBYyxHQUFkLFVBQWUsSUFBWTtJQUUzQixDQUFDO0lBSUQsc0JBQU8sR0FBUDtRQUNJLElBQUksS0FBSyxHQUNhLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsdUJBQVEsR0FBUjtRQUNJLElBQUksS0FBSyxHQUNhLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QseUJBQVUsR0FBVjtRQUNJLElBQUksS0FBSyxHQUNhLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0Qsc0JBQU8sR0FBUDtRQUNJLElBQUksS0FBSyxHQUNhLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0Qsd0JBQVMsR0FBVDtRQUNJLElBQUksS0FBSyxHQUNhLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0wsV0FBQztBQUFELENBdERBLEFBc0RDLElBQUE7QUF0RFksb0JBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBJUHJlc2VudGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXIvcHJlc2VudGVyXCJcblxudmFyIHByZXNlbnRlcjogSVByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoKTsiLCJpbXBvcnQgeyBJRm9ybWF0dGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9mb3JtYXR0ZXIuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBGb3JtYXR0ZXIgaW1wbGVtZW50cyBJRm9ybWF0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBmb3JtYXQoXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgICAgc2NvcGU6IHN0cmluZyxcbiAgICAgICAgc3ViamVjdDogc3RyaW5nLFxuICAgICAgICBib2R5OiBzdHJpbmcsXG4gICAgICAgIGZvb3Rlcjogc3RyaW5nXG4gICAgKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG91dDogc3RyaW5nO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBJUHJlc2VudGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9wcmVzZW50ZXIvcHJlc2VudGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgSVZpZXcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ZpZXcvdmlldy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vdmlldy92aWV3XCJcbmltcG9ydCB7IElGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL21vZGVsL2Zvcm1hdHRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gXCIuLi9tb2RlbC9mb3JtYXR0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFByZXNlbnRlciBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xuICAgIHByaXZhdGUgdmlldzogSVZpZXc7XG4gICAgcHJpdmF0ZSBmb3JtYXR0ZXI6IElGb3JtYXR0ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoZG9jdW1lbnQsIHRoaXMpO1xuICAgICAgICB0aGlzLmZvcm1hdHRlciA9IG5ldyBGb3JtYXR0ZXIoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICAvLyBTeW5jIFZpZXcgYW5kIE1vZGVsXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHRvRm9ybWF0KCk6IHZvaWQgeyBcbiAgICAgICAgY29uc29sZS5sb2coXCIyMDIwLzA1LzE0IHRlc3RcIik7XG4gICAgfVxuXG4gICAgdG9DaGVja1J1bGUoKTogdm9pZCB7IH1cbn0iLCJpbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9pbnRlcmZhY2Uvdmlldy92aWV3LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgSVByZXNlbnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2UvcHJlc2VudGVyL3ByZXNlbnRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuLi9wcmVzZW50ZXIvcHJlc2VudGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3IGltcGxlbWVudHMgSVZpZXcge1xuICAgIERPTTogRG9jdW1lbnQ7XG4gICAgcHJlc2VudGVyOiBJUHJlc2VudGVyO1xuICAgIGNvbnN0cnVjdG9yKERPTTogRG9jdW1lbnQsIHByZXNlbnRlcjogUHJlc2VudGVyKSB7XG4gICAgICAgIHRoaXMucHJlc2VudGVyID0gcHJlc2VudGVyO1xuICAgICAgICB0aGlzLkRPTSA9IERPTTtcbiAgICAgICAgdGhpcy5ET01cbiAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZChcInR4dF9zY29wZVwiKVxuICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1c2VySW5wdXRlZCk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICAgICAgZnVuY3Rpb24gdXNlcklucHV0ZWQoKSB7XG4gICAgICAgICAgICBzZWxmLnByZXNlbnRlci50b0Zvcm1hdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRE9NIE1hbmlwdWxhdGlvblxuICAgIGRpc3BsYXlGb3JtYXR0ZWRUZXh0KHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNwbGF5V2FybmluZyh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIH1cblxuXG4gICAgLy8gRE9NIEFjY2Vzc2luZ1xuICAgIGdldFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID1cbiAgICAgICAgICAgIDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiZGRsX3R5cGVcIik7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG4gICAgZ2V0U2NvcGUoKTogc3RyaW5ne1xuICAgICAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgICAgICAgICAgPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eHRfc2NvcGVcIik7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG4gICAgZ2V0U3ViamVjdCgpOiBzdHJpbmd7XG4gICAgICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9XG4gICAgICAgICAgICA8SFRNTElucHV0RWxlbWVudD50aGlzLkRPTS5nZXRFbGVtZW50QnlJZChcInR4dF9zdWJqZWN0XCIpO1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxuICAgIGdldEJvZHkoKTogc3RyaW5ne1xuICAgICAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgICAgICAgICAgPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfYm9keVwiKTtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgIH1cbiAgICBnZXRGb290ZXIoKTogc3RyaW5ne1xuICAgICAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPVxuICAgICAgICAgICAgPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5ET00uZ2V0RWxlbWVudEJ5SWQoXCJ0eGFfZm9vdGVyXCIpO1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufSJdfQ==
