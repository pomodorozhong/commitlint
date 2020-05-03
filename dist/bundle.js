(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter/presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter/presenter":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CookieModel = (function () {
    function CookieModel() {
        this.cookieCount = 0;
    }
    CookieModel.prototype.addCookie = function () {
        this.cookieCount++;
    };
    CookieModel.prototype.getCookieCount = function () {
        return this.cookieCount;
    };
    return CookieModel;
}());
exports.CookieModel = CookieModel;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../view/view");
var cookieModel_1 = require("../model/cookieModel");
var Presenter = (function () {
    function Presenter() {
        this.view = new view_1.View(document, this);
        this.cookieModel = new cookieModel_1.CookieModel();
        this.initialize();
    }
    Presenter.prototype.initialize = function () {
        this.view.toSetCookieCount(this.cookieModel.getCookieCount());
    };
    Presenter.prototype.toGrabCookie = function () {
        this.cookieModel.addCookie();
        this.view.toSetCookieCount(this.cookieModel.getCookieCount());
    };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"../model/cookieModel":2,"../view/view":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(DOM, presenter) {
        this.presenter = presenter;
        this.DOM = DOM;
        this.DOM
            .getElementById("grabCookie")
            .addEventListener("click", toGrabCookie);
        var self = this;
        function toGrabCookie() {
            self.presenter.toGrabCookie();
        }
    }
    View.prototype.toSetCookieCount = function (cookieCount) {
        this.DOM.getElementById("cookieCount").innerHTML = cookieCount.toString();
    };
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbC9jb29raWVNb2RlbC50cyIsInNyYy9wcmVzZW50ZXIvcHJlc2VudGVyLnRzIiwic3JjL3ZpZXcvdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EsbURBQWlEO0FBRWpELElBQUksU0FBUyxHQUFlLElBQUkscUJBQVMsRUFBRSxDQUFDOzs7OztBQ0Q1QztJQUdJO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG9DQUFjLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSxrQ0FBVzs7Ozs7QUNDeEIscUNBQW1DO0FBQ25DLG9EQUFtRDtBQUVuRDtJQUlJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELDhCQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUVJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQXZCWSw4QkFBUzs7Ozs7QUNGdEI7SUFHSSxjQUFZLEdBQWEsRUFBRSxTQUFvQjtRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHO2FBQ0gsY0FBYyxDQUFDLFlBQVksQ0FBQzthQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBR2hCLFNBQVMsWUFBWTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBR0QsK0JBQWdCLEdBQWhCLFVBQWlCLFdBQW1CO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQXRCQSxBQXNCQyxJQUFBO0FBdEJZLG9CQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgSVByZXNlbnRlciB9IGZyb20gXCIuL2ludGVyZmFjZS9wcmVzZW50ZXIvcHJlc2VudGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVyL3ByZXNlbnRlclwiXG5cbnZhciBwcmVzZW50ZXI6IElQcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKCk7IiwiaW1wb3J0IHsgSUNvb2tpZU1vZGVsIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9jb29raWVNb2RlbC5pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIENvb2tpZU1vZGVsIGltcGxlbWVudHMgSUNvb2tpZU1vZGVsIHtcbiAgICBwcml2YXRlIGNvb2tpZUNvdW50OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb29raWVDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgYWRkQ29va2llKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvb2tpZUNvdW50Kys7XG4gICAgfVxuXG4gICAgZ2V0Q29va2llQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29va2llQ291bnQ7XG4gICAgfVxufSIsImltcG9ydCB7IElQcmVzZW50ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9pbnRlcmZhY2Uvdmlldy92aWV3LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgSUNvb2tpZU1vZGVsIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9tb2RlbC9jb29raWVNb2RlbC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi4vdmlldy92aWV3XCJcbmltcG9ydCB7IENvb2tpZU1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL2Nvb2tpZU1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBQcmVzZW50ZXIgaW1wbGVtZW50cyBJUHJlc2VudGVyIHtcbiAgICBwcml2YXRlIHZpZXc6IElWaWV3O1xuICAgIHByaXZhdGUgY29va2llTW9kZWw6IElDb29raWVNb2RlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkb2N1bWVudCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29va2llTW9kZWwgPSBuZXcgQ29va2llTW9kZWwoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICAvLyBTeW5jIFZpZXcgYW5kIE1vZGVsXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3LnRvU2V0Q29va2llQ291bnQodGhpcy5jb29raWVNb2RlbC5nZXRDb29raWVDb3VudCgpKTtcbiAgICB9XG5cbiAgICB0b0dyYWJDb29raWUoKTogdm9pZCB7XG4gICAgICAgIC8vIENhbGwgTW9kZWwgZnVuY3Rpb24gdG8gdXBkYXRlIGRhdGEuXG4gICAgICAgIHRoaXMuY29va2llTW9kZWwuYWRkQ29va2llKCk7XG5cbiAgICAgICAgLy8gQ2FsbCBWaWV3IGZ1bmN0aW9uIHRvIHVwZGF0ZSBVSS5cbiAgICAgICAgdGhpcy52aWV3LnRvU2V0Q29va2llQ291bnQodGhpcy5jb29raWVNb2RlbC5nZXRDb29raWVDb3VudCgpKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgSVZpZXcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ZpZXcvdmlldy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IElQcmVzZW50ZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3ByZXNlbnRlci9wcmVzZW50ZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi4vcHJlc2VudGVyL3ByZXNlbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcbiAgICBET006IERvY3VtZW50O1xuICAgIHByZXNlbnRlcjogSVByZXNlbnRlcjtcbiAgICBjb25zdHJ1Y3RvcihET006IERvY3VtZW50LCBwcmVzZW50ZXI6IFByZXNlbnRlcikge1xuICAgICAgICB0aGlzLnByZXNlbnRlciA9IHByZXNlbnRlcjtcbiAgICAgICAgdGhpcy5ET00gPSBET007XG4gICAgICAgIHRoaXMuRE9NXG4gICAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJncmFiQ29va2llXCIpXG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvR3JhYkNvb2tpZSk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICAgICAgZnVuY3Rpb24gdG9HcmFiQ29va2llKCkge1xuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIudG9HcmFiQ29va2llKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBET00gTWFuaXB1bGF0aW9uXG4gICAgdG9TZXRDb29raWVDb3VudChjb29raWVDb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuRE9NLmdldEVsZW1lbnRCeUlkKFwiY29va2llQ291bnRcIikuaW5uZXJIVE1MID0gY29va2llQ291bnQudG9TdHJpbmcoKTtcbiAgICB9XG59Il19
