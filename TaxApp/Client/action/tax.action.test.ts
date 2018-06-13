import { Enum } from "../enum";
import { TaxModel } from "../model";
import { calcualteTaxRequest } from "./tax.action";

describe("tax actions", () => {
    it("init tax calculation request", () => {
        const taxModel = new TaxModel();
        const expectedAction = {
            type: Enum.CALCULATE_TAX_REQUEST,
            Payload: new TaxModel(),
            Error: ""
        };
        expect(calcualteTaxRequest(taxModel)).toEqual(expectedAction);
    });
});
