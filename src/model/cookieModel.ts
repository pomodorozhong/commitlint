import { ICookieModel } from "../interface/model/cookieModel.interface";

export class CookieModel implements ICookieModel {
    private cookieCount: number;

    constructor() {
        this.cookieCount = 0;
    }

    addCookie(): void {
        this.cookieCount++;
    }

    getCookieCount(): number {
        return this.cookieCount;
    }
}