import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { TaxModel } from "../../model";
import { GenericReducerState } from "../../util";
import { TaxContainer } from "./tax.container";

Enzyme.configure({ adapter: new Adapter() });

describe("Tax Container", () => {
    const defaultTaxState = new TaxModel();
    defaultTaxState.FirstName = "Ankit";

    const defaultTaxListState = [defaultTaxState];

    const props = {
        taxState: new GenericReducerState<TaxModel>(defaultTaxState),
        taxListState: new GenericReducerState<TaxModel[]>(defaultTaxListState),
        dispatch: jest.fn()
    };
    const wrapper = Enzyme.mount(<TaxContainer {...props} />);

    it("render Tax Container", () => {
        expect(wrapper.find(TaxContainer).length).toBe(1);
    });

    it("check First Name Value", () => {
        expect(wrapper.find("[name='FirstName']").prop("value")).toBe("Ankit");
    });

    it("check tax list row", () => {
        const table = wrapper.find(".table tr");
        //console.log(table.debug());
        expect(table.length).toBe(2);

    });

    it("submit tax data", () => {
        const submitButton = wrapper.find(".btn");
        //console.log(submitButton.debug());
        submitButton.simulate("click");
        expect(props.dispatch.mock.calls.length).toBe(1);
    });
});